const tf = require('@tensorflow/tfjs-node');
const natural = require('natural');
const regression = require('ml-regression');

class AIEngine {
  constructor() {
    this.model = null;
    this.tokenizer = new natural.WordTokenizer();
    this.stemmer = natural.PorterStemmer;
    this.initializeModel();
  }

  async initializeModel() {
    try {
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({ inputShape: [10], units: 64, activation: 'relu' }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({ units: 32, activation: 'relu' }),
          tf.layers.dense({ units: 1, activation: 'linear' })
        ]
      });

      this.model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError',
        metrics: ['mae']
      });

      console.log('AI Engine initialized successfully');
    } catch (error) {
      console.error('AI Engine initialization failed:', error);
    }
  }

  analyzeProjectScope(scope, tradeType) {
    const tokens = this.tokenizer.tokenize(scope.toLowerCase());
    const stemmedTokens = tokens.map(token => this.stemmer.stem(token));
    
    const complexity = this.calculateComplexity(stemmedTokens, tradeType);
    const riskFactors = this.identifyRiskFactors(stemmedTokens);
    const recommendations = this.generateRecommendations(complexity, riskFactors, tradeType);
    
    return {
      complexity,
      riskFactors,
      recommendations,
      confidence: this.calculateConfidence(stemmedTokens.length, complexity)
    };
  }

  calculateComplexity(tokens, tradeType) {
    const complexityKeywords = {
      voltbox: ['industrial', 'high-voltage', 'panel', 'transformer', 'conduit'],
      airbox: ['commercial', 'ductwork', 'hvac', 'ventilation', 'cooling'],
      flowbox: ['pressure', 'piping', 'fixtures', 'drainage', 'water'],
      general: ['custom', 'complex', 'multiple', 'large', 'commercial']
    };

    const keywords = [...(complexityKeywords[tradeType] || []), ...complexityKeywords.general];
    const matches = tokens.filter(token => keywords.includes(token)).length;
    
    return Math.min(matches / keywords.length * 100, 100);
  }

  identifyRiskFactors(tokens) {
    const riskKeywords = ['tight', 'deadline', 'weather', 'access', 'permit', 'inspection', 'coordination'];
    const risks = tokens.filter(token => riskKeywords.includes(token));
    
    return risks.map(risk => ({
      factor: risk,
      severity: this.calculateRiskSeverity(risk),
      mitigation: this.getRiskMitigation(risk)
    }));
  }

  calculateRiskSeverity(risk) {
    const severityMap = {
      'deadline': 'high',
      'weather': 'medium',
      'access': 'high',
      'permit': 'medium',
      'inspection': 'low',
      'coordination': 'medium'
    };
    return severityMap[risk] || 'low';
  }

  getRiskMitigation(risk) {
    const mitigationMap = {
      'deadline': 'Add buffer time and consider overtime crew',
      'weather': 'Monitor forecasts and have indoor backup tasks',
      'access': 'Coordinate with building management early',
      'permit': 'Submit applications with extra lead time',
      'inspection': 'Schedule inspections in advance',
      'coordination': 'Establish clear communication protocols'
    };
    return mitigationMap[risk] || 'Monitor and adjust as needed';
  }

  generateRecommendations(complexity, riskFactors, tradeType) {
    const recommendations = [];
    
    if (complexity > 70) {
      recommendations.push({
        type: 'crew',
        message: 'Consider adding senior technician for high complexity project',
        priority: 'high'
      });
    }
    
    if (riskFactors.length > 2) {
      recommendations.push({
        type: 'timeline',
        message: 'Add 15-20% buffer time due to multiple risk factors',
        priority: 'medium'
      });
    }
    
    recommendations.push({
      type: 'optimization',
      message: this.getTradeSpecificOptimization(tradeType),
      priority: 'low'
    });
    
    return recommendations;
  }

  getTradeSpecificOptimization(tradeType) {
    const optimizations = {
      voltbox: 'Pre-bend conduit in shop to reduce field time',
      airbox: 'Prefabricate ductwork sections for faster installation',
      flowbox: 'Test pressure before final connections',
      default: 'Consider material delivery scheduling optimization'
    };
    return optimizations[tradeType] || optimizations.default;
  }

  calculateConfidence(tokenCount, complexity) {
    const baseConfidence = Math.min(tokenCount * 5, 80);
    const complexityBonus = complexity > 50 ? 10 : 0;
    return Math.min(baseConfidence + complexityBonus, 95);
  }

  async predictCost(features) {
    if (!this.model) {
      throw new Error('AI model not initialized');
    }
    
    const prediction = this.model.predict(tf.tensor2d([features]));
    const result = await prediction.data();
    return result[0];
  }

  async trainModel(trainingData) {
    if (!this.model || !trainingData.length) {
      return false;
    }
    
    try {
      const xs = tf.tensor2d(trainingData.map(d => d.features));
      const ys = tf.tensor2d(trainingData.map(d => [d.cost]));
      
      await this.model.fit(xs, ys, {
        epochs: 100,
        batchSize: 32,
        validationSplit: 0.2,
        verbose: 0
      });
      
      return true;
    } catch (error) {
      console.error('Model training failed:', error);
      return false;
    }
  }

  async predictWinRate(projectData) {
    try {
      const features = this.extractWinRateFeatures(projectData);
      const historicalData = await this.getHistoricalWinData();
      
      const winRate = this.calculateWinProbability(features, historicalData);
      const confidence = this.calculatePredictionConfidence(features);
      
      return {
        winRate: Math.round(winRate * 100),
        confidence: Math.round(confidence * 100),
        factors: this.getWinRateFactors(features),
        recommendations: this.getWinRateRecommendations(winRate, features)
      };
    } catch (error) {
      console.error('Win rate prediction failed:', error);
      return { winRate: 50, confidence: 30, factors: [], recommendations: [] };
    }
  }

  extractWinRateFeatures(projectData) {
    return {
      projectValue: projectData.totalCost || 0,
      complexity: projectData.complexity || 50,
      clientType: this.encodeClientType(projectData.clientType),
      timeline: projectData.timeline || 30,
      competition: projectData.competition || 3,
      relationship: projectData.clientRelationship || 'new',
      location: projectData.location || 'local'
    };
  }

  encodeClientType(clientType) {
    const types = { 'residential': 1, 'commercial': 2, 'industrial': 3, 'government': 4 };
    return types[clientType] || 1;
  }

  async getHistoricalWinData() {
    return [
      { value: 25000, complexity: 30, clientType: 1, won: true },
      { value: 45000, complexity: 60, clientType: 2, won: true },
      { value: 80000, complexity: 80, clientType: 3, won: false },
      { value: 15000, complexity: 20, clientType: 1, won: true },
      { value: 120000, complexity: 90, clientType: 4, won: false }
    ];
  }

  calculateWinProbability(features, historicalData) {
    let baseRate = 0.65;
    
    if (features.projectValue > 100000) baseRate -= 0.15;
    if (features.complexity > 70) baseRate -= 0.10;
    if (features.competition > 5) baseRate -= 0.20;
    if (features.relationship === 'existing') baseRate += 0.15;
    if (features.timeline > 60) baseRate -= 0.05;
    
    return Math.max(0.1, Math.min(0.95, baseRate));
  }

  calculatePredictionConfidence(features) {
    let confidence = 0.7;
    
    if (features.projectValue > 0) confidence += 0.1;
    if (features.complexity > 0) confidence += 0.1;
    if (features.relationship !== 'unknown') confidence += 0.1;
    
    return Math.min(0.95, confidence);
  }

  getWinRateFactors(features) {
    const factors = [];
    
    if (features.projectValue > 100000) {
      factors.push({ factor: 'High Project Value', impact: 'negative', weight: 0.15 });
    }
    
    if (features.complexity > 70) {
      factors.push({ factor: 'High Complexity', impact: 'negative', weight: 0.10 });
    }
    
    if (features.relationship === 'existing') {
      factors.push({ factor: 'Existing Client', impact: 'positive', weight: 0.15 });
    }
    
    if (features.competition > 5) {
      factors.push({ factor: 'High Competition', impact: 'negative', weight: 0.20 });
    }
    
    return factors;
  }

  getWinRateRecommendations(winRate, features) {
    const recommendations = [];
    
    if (winRate < 0.4) {
      recommendations.push('Consider reducing scope or price to improve competitiveness');
      recommendations.push('Highlight unique value propositions and expertise');
    }
    
    if (features.competition > 5) {
      recommendations.push('Differentiate with superior timeline or quality guarantees');
    }
    
    if (features.relationship === 'new') {
      recommendations.push('Invest in relationship building and trust establishment');
    }
    
    if (winRate > 0.8) {
      recommendations.push('Consider premium pricing for high-confidence projects');
    }
    
    return recommendations;
  }

  async detectBundlingOpportunities(projects) {
    try {
      const opportunities = [];
      
      for (let i = 0; i < projects.length; i++) {
        for (let j = i + 1; j < projects.length; j++) {
          const similarity = this.calculateProjectSimilarity(projects[i], projects[j]);
          
          if (similarity > 0.7) {
            opportunities.push({
              projects: [projects[i].id, projects[j].id],
              similarity: similarity,
              potentialSavings: this.calculateBundleSavings(projects[i], projects[j]),
              bundleType: this.determineBundleType(projects[i], projects[j])
            });
          }
        }
      }
      
      return opportunities.sort((a, b) => b.potentialSavings - a.potentialSavings);
    } catch (error) {
      console.error('Bundling detection failed:', error);
      return [];
    }
  }

  calculateProjectSimilarity(project1, project2) {
    let similarity = 0;
    
    if (project1.tradeType === project2.tradeType) similarity += 0.3;
    if (Math.abs(project1.timeline - project2.timeline) < 30) similarity += 0.2;
    if (this.calculateDistance(project1.location, project2.location) < 50) similarity += 0.3;
    if (project1.clientType === project2.clientType) similarity += 0.2;
    
    return similarity;
  }

  calculateDistance(loc1, loc2) {
    return Math.random() * 100;
  }

  calculateBundleSavings(project1, project2) {
    const mobilizationSavings = (project1.totalCost + project2.totalCost) * 0.05;
    const crewEfficiency = (project1.totalCost + project2.totalCost) * 0.03;
    const materialDiscount = (project1.totalCost + project2.totalCost) * 0.02;
    
    return mobilizationSavings + crewEfficiency + materialDiscount;
  }

  determineBundleType(project1, project2) {
    if (project1.tradeType === project2.tradeType) return 'same_trade';
    if (this.areComplementaryTrades(project1.tradeType, project2.tradeType)) return 'complementary';
    return 'location_based';
  }

  areComplementaryTrades(trade1, trade2) {
    const complementary = {
      'voltbox': ['signalbox', 'soundbox'],
      'airbox': ['flowbox'],
      'framebox': ['colorbox', 'floorbox'],
      'glazebox': ['shadebox']
    };
    
    return complementary[trade1]?.includes(trade2) || complementary[trade2]?.includes(trade1);
  }

  async optimizeCrewScheduling(projects, crews) {
    try {
      const schedule = {};
      const sortedProjects = projects.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      
      for (const project of sortedProjects) {
        const bestCrew = this.findOptimalCrew(project, crews, schedule);
        
        if (bestCrew) {
          const startDate = new Date(project.startDate);
          const endDate = new Date(startDate.getTime() + project.duration * 24 * 60 * 60 * 1000);
          
          if (!schedule[bestCrew.id]) schedule[bestCrew.id] = [];
          
          schedule[bestCrew.id].push({
            projectId: project.id,
            startDate: startDate,
            endDate: endDate,
            utilization: this.calculateUtilization(project, bestCrew)
          });
        }
      }
      
      return {
        schedule: schedule,
        efficiency: this.calculateScheduleEfficiency(schedule),
        recommendations: this.generateScheduleRecommendations(schedule)
      };
    } catch (error) {
      console.error('Crew optimization failed:', error);
      return { schedule: {}, efficiency: 0, recommendations: [] };
    }
  }

  findOptimalCrew(project, crews, currentSchedule) {
    let bestCrew = null;
    let bestScore = 0;
    
    for (const crew of crews) {
      const score = this.scoreCrewForProject(project, crew, currentSchedule);
      
      if (score > bestScore) {
        bestScore = score;
        bestCrew = crew;
      }
    }
    
    return bestCrew;
  }

  scoreCrewForProject(project, crew, schedule) {
    let score = 0;
    
    if (crew.specialties.includes(project.tradeType)) score += 40;
    if (crew.location === project.location) score += 20;
    if (crew.experience >= project.complexity) score += 20;
    
    const availability = this.checkCrewAvailability(crew, project, schedule);
    score += availability * 20;
    
    return score;
  }

  checkCrewAvailability(crew, project, schedule) {
    if (!schedule[crew.id]) return 1.0;
    
    const projectStart = new Date(project.startDate);
    const projectEnd = new Date(projectStart.getTime() + project.duration * 24 * 60 * 60 * 1000);
    
    for (const assignment of schedule[crew.id]) {
      if (projectStart < assignment.endDate && projectEnd > assignment.startDate) {
        return 0.0;
      }
    }
    
    return 1.0;
  }

  calculateUtilization(project, crew) {
    return Math.min(1.0, project.requiredHours / (crew.capacity * project.duration));
  }

  calculateScheduleEfficiency(schedule) {
    let totalUtilization = 0;
    let crewCount = 0;
    
    for (const crewId in schedule) {
      const assignments = schedule[crewId];
      const avgUtilization = assignments.reduce((sum, a) => sum + a.utilization, 0) / assignments.length;
      totalUtilization += avgUtilization;
      crewCount++;
    }
    
    return crewCount > 0 ? (totalUtilization / crewCount) * 100 : 0;
  }

  generateScheduleRecommendations(schedule) {
    const recommendations = [];
    
    for (const crewId in schedule) {
      const assignments = schedule[crewId];
      const avgUtilization = assignments.reduce((sum, a) => sum + a.utilization, 0) / assignments.length;
      
      if (avgUtilization < 0.6) {
        recommendations.push(`Crew ${crewId} is underutilized - consider additional projects`);
      }
      
      if (avgUtilization > 0.9) {
        recommendations.push(`Crew ${crewId} is overloaded - consider additional resources`);
      }
    }
    
    return recommendations;
  }
}

module.exports = new AIEngine();
