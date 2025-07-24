import React, { useState } from 'react';

const InsulationBox = ({ visible, onEstimateGenerated }) => {
  const [insulationScope, setInsulationScope] = useState('');
  const [insulationType, setInsulationType] = useState('fiberglass');
  const [squareFootage, setSquareFootage] = useState(1000);
  const [rValue, setRValue] = useState('R-13');
  const [estimate, setEstimate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateInsulationEstimate = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseRate = insulationType === 'spray_foam' ? 3.50 : insulationType === 'cellulose' ? 1.80 : 1.20;
      const rValueMultiplier = rValue === 'R-30' ? 1.8 : rValue === 'R-19' ? 1.4 : 1.0;
      const insulationCost = squareFootage * baseRate * rValueMultiplier;
      
      const mockEstimate = {
        projectType: 'Insulation Installation',
        scope: insulationScope,
        specifications: {
          insulationType,
          squareFootage,
          rValue,
          fireRating: 'Class A',
          moistureResistance: true
        },
        costBreakdown: {
          materials: {
            insulation: Math.round(insulationCost * 0.6),
            vaporBarrier: Math.round(squareFootage * 0.25),
            fasteners: Math.round(squareFootage * 0.15),
            sealants: Math.round(squareFootage * 0.10),
            miscellaneous: Math.round(insulationCost * 0.08)
          },
          labor: {
            installerHours: Math.round(squareFootage / 200),
            helperHours: Math.round(squareFootage / 300),
            installerRate: 35,
            helperRate: 25,
            totalLaborCost: Math.round((squareFootage / 200 * 35) + (squareFootage / 300 * 25))
          },
          permits: 0,
          inspection: 150,
          overhead: Math.round(insulationCost * 0.15),
          profit: Math.round(insulationCost * 0.25)
        },
        timeline: {
          estimatedDays: Math.ceil(squareFootage / 800),
          weatherDependency: 'Low',
          seasonalConsiderations: 'Year-round installation possible'
        },
        safetyRequirements: [
          'Respiratory protection mandatory',
          'Eye and skin protection required',
          'Proper ventilation in enclosed spaces',
          'Fire safety protocols for spray foam',
          'Confined space entry procedures'
        ],
        toolRequirements: {
          handTools: [
            'Utility knives',
            'Measuring tapes',
            'Staple guns',
            'Safety equipment',
            'Plastic sheeting'
          ],
          powerTools: [
            'Insulation blower',
            'Spray foam equipment',
            'Reciprocating saw',
            'Cordless drill'
          ],
          specializedEquipment: [
            'Insulation machine',
            'Hose and accessories',
            'Protective suits',
            'Ventilation fans'
          ]
        }
      };
      
      const totalCost = Object.values(mockEstimate.costBreakdown.materials).reduce((a, b) => a + b, 0) +
                       mockEstimate.costBreakdown.labor.totalLaborCost +
                       mockEstimate.costBreakdown.permits +
                       mockEstimate.costBreakdown.inspection +
                       mockEstimate.costBreakdown.overhead +
                       mockEstimate.costBreakdown.profit;
      
      mockEstimate.totalCost = totalCost;
      mockEstimate.costPerSqFt = Math.round((totalCost / squareFootage) * 100) / 100;
      
      setEstimate(mockEstimate);
      if (onEstimateGenerated) {
        onEstimateGenerated(mockEstimate);
      }
      
    } catch (error) {
      console.error('Error generating insulation estimate:', error);
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
    border: '2px solid #87CEEB',
    boxShadow: '0 0 20px rgba(135, 206, 235, 0.3)'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(135, 206, 235, 0.3)',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(135, 206, 235, 0.3)',
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '14px'
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #87CEEB, #4682B4)',
    color: '#000',
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
      <h2 style={{ margin: '0 0 20px 0', color: '#87CEEB', textAlign: 'center' }}>
        🧊 InsulationBox - Insulation Installation Estimator
      </h2>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 15px 0', color: '#87CEEB' }}>🏠 Project Specifications</h3>
        
        <textarea
          style={{...inputStyle, height: '100px'}}
          placeholder="Describe the insulation work scope (attic, walls, basement, crawl space, etc.)"
          value={insulationScope}
          onChange={(e) => setInsulationScope(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#87CEEB' }}>Insulation Type:</label>
            <select style={inputStyle} value={insulationType} onChange={(e) => setInsulationType(e.target.value)}>
              <option value="fiberglass">Fiberglass Batts</option>
              <option value="cellulose">Blown Cellulose</option>
              <option value="spray_foam">Spray Foam</option>
              <option value="rigid_foam">Rigid Foam Board</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#87CEEB' }}>Square Footage:</label>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#87CEEB' }}>R-Value:</label>
            <select style={inputStyle} value={rValue} onChange={(e) => setRValue(e.target.value)}>
              <option value="R-13">R-13 (Standard)</option>
              <option value="R-19">R-19 (High Performance)</option>
              <option value="R-30">R-30 (Premium)</option>
            </select>
          </div>
        </div>

        <button
          style={buttonStyle}
          onClick={generateInsulationEstimate}
          disabled={isGenerating || !insulationScope.trim()}
        >
          {isGenerating ? '🧊 Calculating...' : '🧊 Generate InsulationBox Estimate'}
        </button>
      </div>

      {estimate && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#87CEEB' }}>📊 Insulation Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>💰 Cost Breakdown</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Materials:</strong> ${Object.values(estimate.costBreakdown.materials).reduce((a, b) => a + b, 0).toLocaleString()}</p>
                <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.totalLaborCost.toLocaleString()}</p>
                <p><strong>Inspection:</strong> ${estimate.costBreakdown.inspection.toLocaleString()}</p>
                <p><strong>Overhead:</strong> ${estimate.costBreakdown.overhead.toLocaleString()}</p>
                <p><strong>Profit:</strong> ${estimate.costBreakdown.profit.toLocaleString()}</p>
                <hr style={{ border: '1px solid #87CEEB', margin: '10px 0' }} />
                <p style={{ fontSize: '18px', color: '#87CEEB' }}>
                  <strong>Total: ${estimate.totalCost.toLocaleString()}</strong>
                </p>
                <p style={{ color: '#cccccc' }}>Cost per sq ft: ${estimate.costPerSqFt}</p>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⏱️ Timeline & Specifications</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Estimated Duration:</strong> {estimate.timeline.estimatedDays} days</p>
                <p><strong>Weather Dependency:</strong> {estimate.timeline.weatherDependency}</p>
                <p><strong>Seasonal Considerations:</strong> {estimate.timeline.seasonalConsiderations}</p>
                <p><strong>Insulation Type:</strong> {estimate.specifications.insulationType.replace('_', ' ')}</p>
                <p><strong>R-Value:</strong> {estimate.specifications.rValue}</p>
                <p><strong>Fire Rating:</strong> {estimate.specifications.fireRating}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>🔧 Required Tools & Equipment</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '12px' }}>
              <div>
                <h5 style={{ color: '#87CEEB', margin: '0 0 8px 0' }}>Hand Tools</h5>
                {estimate.toolRequirements.handTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#87CEEB', margin: '0 0 8px 0' }}>Power Tools</h5>
                {estimate.toolRequirements.powerTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#87CEEB', margin: '0 0 8px 0' }}>Specialized Equipment</h5>
                {estimate.toolRequirements.specializedEquipment.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⚠️ Safety Requirements</h4>
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

export default InsulationBox;
