import React, { useState } from 'react';

const PaintBox = ({ visible, onEstimateGenerated }) => {
  const [paintingScope, setPaintingScope] = useState('');
  const [surfaceType, setSurfaceType] = useState('interior_walls');
  const [squareFootage, setSquareFootage] = useState(1000);
  const [coatCount, setCoatCount] = useState(2);
  const [primerRequired, setPrimerRequired] = useState(true);
  const [estimate, setEstimate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePaintingEstimate = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseRate = surfaceType === 'exterior' ? 3.50 : surfaceType === 'ceiling' ? 4.00 : 2.50;
      const paintCost = squareFootage * baseRate * coatCount;
      const primerCost = primerRequired ? squareFootage * 1.25 : 0;
      const surfaceMultiplier = surfaceType === 'textured' ? 1.4 : 1.0;
      
      const mockEstimate = {
        projectType: 'Interior Finishing & Painting',
        scope: paintingScope,
        specifications: {
          surfaceType,
          squareFootage,
          coatCount,
          primerRequired,
          surfacePreparation: true,
          qualityGrade: 'Professional'
        },
        costBreakdown: {
          materials: {
            paint: Math.round(paintCost * surfaceMultiplier),
            primer: primerCost,
            brushesRollers: Math.round(squareFootage * 0.15),
            dropCloths: Math.round(squareFootage * 0.08),
            sandpaper: Math.round(squareFootage * 0.05),
            miscellaneous: Math.round(paintCost * 0.12)
          },
          labor: {
            painterHours: Math.round(squareFootage / 150 * coatCount),
            helperHours: Math.round(squareFootage / 200),
            painterRate: 45,
            helperRate: 25,
            totalLaborCost: Math.round((squareFootage / 150 * coatCount * 45) + (squareFootage / 200 * 25))
          },
          permits: 0,
          inspection: 0,
          overhead: Math.round((paintCost + primerCost) * 0.15),
          profit: Math.round((paintCost + primerCost) * 0.25)
        },
        timeline: {
          estimatedDays: Math.ceil(squareFootage / 800 * coatCount),
          surfacePrep: primerRequired ? '1 day prep + primer' : '0.5 day prep',
          dryingTime: '4-6 hours between coats',
          weatherDependency: surfaceType === 'exterior' ? 'High' : 'Low'
        },
        toolRequirements: {
          handTools: [
            'Paint brushes (various sizes)',
            'Paint rollers and covers',
            'Paint trays and liners',
            'Drop cloths and plastic sheeting',
            'Painter\'s tape',
            'Putty knives and scrapers',
            'Sandpaper (various grits)',
            'Cleaning supplies'
          ],
          powerTools: [
            'Paint sprayer (if applicable)',
            'Orbital sander',
            'Heat gun (for paint removal)',
            'Pressure washer (exterior prep)'
          ],
          specializedEquipment: [
            'Extension poles',
            'Ladder or scaffolding',
            'Paint mixer/shaker',
            'Airless sprayer (large jobs)',
            'Spray booth (if needed)',
            'Ventilation fans'
          ]
        },
        safetyRequirements: [
          'VOC exposure protection and ventilation',
          'Ladder safety and fall protection',
          'Eye protection from paint splash',
          'Respiratory protection for spray applications',
          'Proper disposal of paint materials',
          'Lead paint testing (older buildings)'
        ]
      };
      
      const totalCost = Object.values(mockEstimate.costBreakdown.materials).reduce((a, b) => a + b, 0) +
                       mockEstimate.costBreakdown.labor.totalLaborCost +
                       mockEstimate.costBreakdown.permits +
                       mockEstimate.costBreakdown.inspection +
                       mockEstimate.costBreakdown.overhead +
                       mockEstimate.costBreakdown.profit;
      
      mockEstimate.totalCost = totalCost;
      mockEstimate.costPerSquareFoot = Math.round((totalCost / squareFootage) * 100) / 100;
      
      setEstimate(mockEstimate);
      if (onEstimateGenerated) {
        onEstimateGenerated(mockEstimate);
      }
      
    } catch (error) {
      console.error('Error generating painting estimate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!visible) return null;

  const containerStyle = {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '15px',
    margin: '20px 0',
    border: '2px solid #ff69b4',
    boxShadow: '0 0 20px rgba(255, 105, 180, 0.3)'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 105, 180, 0.3)',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 105, 180, 0.3)',
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '14px'
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #ff69b4, #ff1493)',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 5px'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ margin: '0 0 20px 0', color: '#ff69b4', textAlign: 'center' }}>
        🎨 PaintBox - Interior Finishing Estimator
      </h2>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 15px 0', color: '#ff69b4' }}>🖌️ Painting Specifications</h3>
        
        <textarea
          style={{...inputStyle, height: '100px'}}
          placeholder="Describe the painting work scope (interior walls, exterior, trim work, etc.)"
          value={paintingScope}
          onChange={(e) => setPaintingScope(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#ff69b4' }}>Surface Type:</label>
            <select style={inputStyle} value={surfaceType} onChange={(e) => setSurfaceType(e.target.value)}>
              <option value="interior_walls">Interior Walls</option>
              <option value="exterior">Exterior Surfaces</option>
              <option value="ceiling">Ceilings</option>
              <option value="trim">Trim &amp; Millwork</option>
              <option value="textured">Textured Surfaces</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#ff69b4' }}>Square Footage:</label>
            <input
              type="number"
              style={inputStyle}
              value={squareFootage}
              onChange={(e) => setSquareFootage(parseInt(e.target.value) || 1000)}
              min="100"
              max="10000"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#ff69b4' }}>Number of Coats:</label>
            <select style={inputStyle} value={coatCount} onChange={(e) => setCoatCount(parseInt(e.target.value))}>
              <option value={1}>1 Coat</option>
              <option value={2}>2 Coats (Standard)</option>
              <option value={3}>3 Coats (Premium)</option>
            </select>
          </div>

          <div style={{ marginTop: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <input
                type="checkbox"
                checked={primerRequired}
                onChange={(e) => setPrimerRequired(e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              Primer Required
            </label>
          </div>
        </div>

        <button
          style={buttonStyle}
          onClick={generatePaintingEstimate}
          disabled={isGenerating || !paintingScope.trim()}
        >
          {isGenerating ? '🎨 Calculating...' : '🎨 Generate PaintBox Estimate'}
        </button>
      </div>

      {estimate && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#ff69b4' }}>📊 Painting Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>💰 Cost Breakdown</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Materials:</strong> ${Object.values(estimate.costBreakdown.materials).reduce((a, b) => a + b, 0).toLocaleString()}</p>
                <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.totalLaborCost.toLocaleString()}</p>
                <p><strong>Overhead:</strong> ${estimate.costBreakdown.overhead.toLocaleString()}</p>
                <p><strong>Profit:</strong> ${estimate.costBreakdown.profit.toLocaleString()}</p>
                <hr style={{ border: '1px solid #ff69b4', margin: '10px 0' }} />
                <p style={{ fontSize: '18px', color: '#ff69b4' }}>
                  <strong>Total: ${estimate.totalCost.toLocaleString()}</strong>
                </p>
                <p style={{ color: '#cccccc' }}>Cost per sq ft: ${estimate.costPerSquareFoot}</p>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⏱️ Timeline &amp; Requirements</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Estimated Duration:</strong> {estimate.timeline.estimatedDays} days</p>
                <p><strong>Surface Prep:</strong> {estimate.timeline.surfacePrep}</p>
                <p><strong>Drying Time:</strong> {estimate.timeline.dryingTime}</p>
                <p><strong>Weather Dependency:</strong> {estimate.timeline.weatherDependency}</p>
                <p><strong>Coats:</strong> {estimate.specifications.coatCount}</p>
                <p><strong>Quality Grade:</strong> {estimate.specifications.qualityGrade}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>🔧 Required Tools &amp; Materials</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '12px' }}>
              <div>
                <h5 style={{ color: '#ff69b4', margin: '0 0 8px 0' }}>Hand Tools</h5>
                {estimate.toolRequirements.handTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#ff69b4', margin: '0 0 8px 0' }}>Power Tools</h5>
                {estimate.toolRequirements.powerTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#ff69b4', margin: '0 0 8px 0' }}>Specialized Equipment</h5>
                {estimate.toolRequirements.specializedEquipment.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⚠️ Safety &amp; Quality Requirements</h4>
            <div style={{ fontSize: '12px' }}>
              {estimate.safetyRequirements.map((req, index) => (
                <p key={index} style={{ margin: '3px 0' }}>• {req}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaintBox;
