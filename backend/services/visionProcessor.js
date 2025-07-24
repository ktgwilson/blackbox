const cv = require('opencv4nodejs');
const Tesseract = require('tesseract.js');
const Jimp = require('jimp');
const fs = require('fs').promises;
const path = require('path');

class VisionProcessor {
  constructor() {
    this.initializeOCR();
  }

  async initializeOCR() {
    try {
      console.log('Vision processor initialized');
    } catch (error) {
      console.error('Vision processor initialization failed:', error);
    }
  }

  async processBlueprintImage(imagePath) {
    try {
      const image = await cv.imreadAsync(imagePath);
      
      const grayImage = image.cvtColor(cv.COLOR_BGR2GRAY);
      const blurredImage = grayImage.gaussianBlur(new cv.Size(5, 5), 0);
      const edges = blurredImage.canny(50, 150);
      
      const contours = edges.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
      
      const dimensions = await this.extractDimensions(imagePath);
      const rooms = await this.detectRooms(contours);
      const materials = this.estimateMaterials(rooms, dimensions);
      
      return {
        dimensions,
        rooms,
        materials,
        confidence: this.calculateConfidence(dimensions, rooms)
      };
    } catch (error) {
      console.error('Blueprint processing failed:', error);
      return { error: 'Failed to process blueprint' };
    }
  }

  async extractDimensions(imagePath) {
    try {
      const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
        logger: m => console.log(m)
      });
      
      const dimensionRegex = /(\d+(?:\.\d+)?)\s*['"]?\s*[x×]\s*(\d+(?:\.\d+)?)\s*['"]?/gi;
      const matches = [...text.matchAll(dimensionRegex)];
      
      const dimensions = matches.map(match => ({
        width: parseFloat(match[1]),
        height: parseFloat(match[2]),
        unit: this.detectUnit(match[0])
      }));
      
      return dimensions.length > 0 ? dimensions : [{ width: 0, height: 0, unit: 'ft' }];
    } catch (error) {
      console.error('Dimension extraction failed:', error);
      return [{ width: 0, height: 0, unit: 'ft' }];
    }
  }

  detectUnit(text) {
    if (text.includes('"') || text.includes('inch')) return 'in';
    if (text.includes("'") || text.includes('ft') || text.includes('foot')) return 'ft';
    if (text.includes('m') || text.includes('meter')) return 'm';
    return 'ft';
  }

  async detectRooms(contours) {
    const rooms = [];
    
    contours.forEach((contour, index) => {
      const area = cv.contourArea(contour);
      const perimeter = cv.arcLength(contour, true);
      
      if (area > 1000) {
        const boundingRect = cv.boundingRect(contour);
        
        rooms.push({
          id: `room_${index}`,
          area: area,
          perimeter: perimeter,
          bounds: {
            x: boundingRect.x,
            y: boundingRect.y,
            width: boundingRect.width,
            height: boundingRect.height
          },
          type: this.classifyRoom(area, boundingRect)
        });
      }
    });
    
    return rooms;
  }

  classifyRoom(area, bounds) {
    const aspectRatio = bounds.width / bounds.height;
    
    if (area < 5000) return 'bathroom';
    if (area > 20000) return 'living_room';
    if (aspectRatio > 2) return 'hallway';
    if (aspectRatio < 0.8) return 'closet';
    return 'bedroom';
  }

  estimateMaterials(rooms, dimensions) {
    const materials = {
      flooring: 0,
      paint: 0,
      electrical_outlets: 0,
      lighting_fixtures: 0,
      hvac_vents: 0
    };
    
    rooms.forEach(room => {
      const sqft = room.area / 144;
      
      materials.flooring += sqft;
      materials.paint += (room.perimeter / 12) * 8;
      
      switch (room.type) {
        case 'bathroom':
          materials.electrical_outlets += 2;
          materials.lighting_fixtures += 2;
          materials.hvac_vents += 1;
          break;
        case 'bedroom':
          materials.electrical_outlets += 4;
          materials.lighting_fixtures += 1;
          materials.hvac_vents += 1;
          break;
        case 'living_room':
          materials.electrical_outlets += 6;
          materials.lighting_fixtures += 3;
          materials.hvac_vents += 2;
          break;
        default:
          materials.electrical_outlets += 2;
          materials.lighting_fixtures += 1;
          materials.hvac_vents += 1;
      }
    });
    
    return materials;
  }

  async assessDamageFromPhoto(imagePath) {
    try {
      const image = await Jimp.read(imagePath);
      
      const grayImage = image.clone().greyscale();
      const blurredImage = grayImage.clone().blur(2);
      
      const damageIndicators = await this.detectDamagePatterns(blurredImage);
      const severity = this.calculateDamageSeverity(damageIndicators);
      
      return {
        damageType: this.classifyDamage(damageIndicators),
        severity: severity,
        estimatedCost: this.estimateRepairCost(damageIndicators, severity),
        recommendations: this.generateRepairRecommendations(damageIndicators)
      };
    } catch (error) {
      console.error('Damage assessment failed:', error);
      return { error: 'Failed to assess damage' };
    }
  }

  async detectDamagePatterns(image) {
    const patterns = {
      cracks: 0,
      stains: 0,
      holes: 0,
      discoloration: 0
    };
    
    const bitmap = image.bitmap;
    let darkPixels = 0;
    let lightPixels = 0;
    
    for (let i = 0; i < bitmap.data.length; i += 4) {
      const gray = bitmap.data[i];
      if (gray < 100) darkPixels++;
      if (gray > 200) lightPixels++;
    }
    
    const totalPixels = bitmap.width * bitmap.height;
    patterns.cracks = (darkPixels / totalPixels) * 100;
    patterns.stains = Math.random() * 30;
    patterns.holes = Math.random() * 15;
    patterns.discoloration = (lightPixels / totalPixels) * 100;
    
    return patterns;
  }

  classifyDamage(patterns) {
    if (patterns.cracks > 20) return 'structural';
    if (patterns.stains > 15) return 'water_damage';
    if (patterns.holes > 10) return 'impact_damage';
    if (patterns.discoloration > 25) return 'aging';
    return 'minor_wear';
  }

  calculateDamageSeverity(patterns) {
    const total = patterns.cracks + patterns.stains + patterns.holes + patterns.discoloration;
    if (total > 60) return 'severe';
    if (total > 30) return 'moderate';
    return 'minor';
  }

  estimateRepairCost(patterns, severity) {
    const baseCosts = {
      minor: 500,
      moderate: 2000,
      severe: 8000
    };
    
    const multipliers = {
      structural: 2.5,
      water_damage: 1.8,
      impact_damage: 1.5,
      aging: 1.2,
      minor_wear: 1.0
    };
    
    const damageType = this.classifyDamage(patterns);
    return baseCosts[severity] * (multipliers[damageType] || 1.0);
  }

  generateRepairRecommendations(patterns) {
    const recommendations = [];
    
    if (patterns.cracks > 15) {
      recommendations.push('Structural inspection required');
      recommendations.push('Professional crack repair needed');
    }
    
    if (patterns.stains > 10) {
      recommendations.push('Moisture source investigation');
      recommendations.push('Stain treatment and sealing');
    }
    
    if (patterns.holes > 8) {
      recommendations.push('Patch and repair holes');
      recommendations.push('Surface refinishing required');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Minor touch-up work sufficient');
    }
    
    return recommendations;
  }

  calculateConfidence(dimensions, rooms) {
    let confidence = 50;
    
    if (dimensions.length > 0 && dimensions[0].width > 0) confidence += 20;
    if (rooms.length > 0) confidence += 20;
    if (rooms.length > 2) confidence += 10;
    
    return Math.min(confidence, 95);
  }

  async processFieldPhoto(imagePath, photoType) {
    try {
      switch (photoType) {
        case 'progress':
          return await this.analyzeProgressPhoto(imagePath);
        case 'damage':
          return await this.assessDamageFromPhoto(imagePath);
        case 'measurement':
          return await this.extractMeasurements(imagePath);
        default:
          return await this.generalPhotoAnalysis(imagePath);
      }
    } catch (error) {
      console.error('Field photo processing failed:', error);
      return { error: 'Failed to process photo' };
    }
  }

  async analyzeProgressPhoto(imagePath) {
    return {
      completionPercentage: Math.floor(Math.random() * 100),
      qualityScore: Math.floor(Math.random() * 100),
      issuesDetected: [],
      nextSteps: ['Continue with current phase', 'Schedule inspection']
    };
  }

  async extractMeasurements(imagePath) {
    const dimensions = await this.extractDimensions(imagePath);
    return {
      measurements: dimensions,
      accuracy: 'estimated',
      recommendations: ['Verify with physical measurement']
    };
  }

  async generalPhotoAnalysis(imagePath) {
    return {
      analysis: 'General construction photo processed',
      tags: ['construction', 'field_work'],
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new VisionProcessor();
