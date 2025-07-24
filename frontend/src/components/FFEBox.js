import React, { useState } from 'react';

const FFEBox = ({ visible, onEstimateGenerated }) => {
  const [ffeScope, setFfeScope] = useState('');
  const [projectType, setProjectType] = useState('office');
  const [squareFootage, setSquareFootage] = useState(5000);
  const [qualityLevel, setQualityLevel] = useState('standard');
  const [customWork, setCustomWork] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateFFEEstimate = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseRate = {
        'office': 45,
        'retail': 65,
        'hospitality': 85,
        'healthcare': 95,
        'education': 55
      }[projectType] || 45;
      
      const qualityMultiplier = {
        'budget': 0.7,
        'standard': 1.0,
        'premium': 1.5,
        'luxury': 2.2
      }[qualityLevel] || 1.0;
      
      const baseCost = squareFootage * baseRate * qualityMultiplier;
      const customCost = customWork ? baseCost * 0.4 : 0;
      
      const mockEstimate = {
        projectType: 'Furniture, Fixtures & Equipment (FF&E)',
        scope: ffeScope,
        specifications: {
          projectType,
          squareFootage,
          qualityLevel,
          customWork,
          deliveryMethod: 'Turnkey installation',
          warranty: '5 years manufacturer, 2 years installation'
        },
        costBreakdown: {
          materials: {
            furniture: Math.round(baseCost * 0.45),
            fixtures: Math.round(baseCost * 0.25),
            equipment: Math.round(baseCost * 0.15),
            customItems: customCost,
            accessories: Math.round(baseCost * 0.08),
            miscellaneous: Math.round(baseCost * 0.07)
          },
          labor: {
            designHours: Math.round(squareFootage / 200),
            installationHours: Math.round(squareFootage / 150),
            projectManagementHours: Math.round(squareFootage / 500),
            designRate: 85,
            installationRate: 55,
            pmRate: 95,
            totalLaborCost: Math.round((squareFootage / 200 * 85) + (squareFootage / 150 * 55) + (squareFootage / 500 * 95))
          },
          permits: 0,
          inspection: Math.round(squareFootage * 0.5),
          overhead: Math.round((baseCost + customCost) * 0.15),
          profit: Math.round((baseCost + customCost) * 0.22)
        },
        timeline: {
          estimatedDays: Math.ceil(squareFootage / 1000) * 5 + (customWork ? 14 : 0),
          designPhase: '2-4 weeks',
          procurement: '4-8 weeks',
          installation: '1-3 weeks',
          leadTime: customWork ? '8-12 weeks' : '4-6 weeks'
        },
        safetyRequirements: [
          'Proper lifting techniques for heavy furniture',
          'Tool safety for installation equipment',
          'Electrical safety for equipment installation',
          'Floor protection during installation',
          'Workspace safety and organization'
        ],
        toolRequirements: {
          handTools: [
            'Screwdrivers and hex keys',
            'Measuring tapes and levels',
            'Furniture dollies',
            'Assembly tools',
            'Protective padding',
            'Cleaning supplies',
            'Hardware organizers'
          ],
          powerTools: [
            'Cordless drill/driver',
            'Circular saw',
            'Jigsaw',
            'Router (custom work)',
            'Sanders',
            'Pneumatic nailer'
          ],
          specializedEquipment: [
            'Furniture lifts',
            'Panel installation systems',
            'Carpet installation tools',
            'Electrical testing equipment',
            'Delivery trucks'
          ]
        },
        materialsList: {
          furniture: `${projectType} furniture package for ${squareFootage} sq ft`,
          fixtures: `${qualityLevel} grade fixtures and built-ins`,
          equipment: 'Technology and specialized equipment',
          customWork: customWork ? 'Custom millwork and specialized items' : 'Standard items only'
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
      console.error('Error generating FF&E estimate:', error);
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
    border: '2px solid #DAA520',
    boxShadow: '0 0 20px rgba(218, 165, 32, 0.3)'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(218, 165, 32, 0.3)',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(218, 165, 32, 0.3)',
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '14px'
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #DAA520, #FFD700)',
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
      <h2 style={{ margin: '0 0 20px 0', color: '#DAA520', textAlign: 'center' }}>
        🪑 FFEBox - Furniture, Fixtures & Equipment Estimator
      </h2>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 15px 0', color: '#DAA520' }}>🪑 Project Specifications</h3>
        
        <textarea
          style={{...inputStyle, height: '100px'}}
          placeholder="Describe the FF&E project scope (office furniture, retail fixtures, hospitality equipment, etc.)"
          value={ffeScope}
          onChange={(e) => setFfeScope(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#DAA520' }}>Project Type:</label>
            <select style={inputStyle} value={projectType} onChange={(e) => setProjectType(e.target.value)}>
              <option value="office">Office Space</option>
              <option value="retail">Retail Store</option>
              <option value="hospitality">Hospitality</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#DAA520' }}>Square Footage:</label>
            <input
              type="number"
              style={inputStyle}
              value={squareFootage}
              onChange={(e) => setSquareFootage(parseInt(e.target.value) || 5000)}
              min="500"
              max="100000"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#DAA520' }}>Quality Level:</label>
            <select style={inputStyle} value={qualityLevel} onChange={(e) => setQualityLevel(e.target.value)}>
              <option value="budget">Budget Grade</option>
              <option value="standard">Standard Grade</option>
              <option value="premium">Premium Grade</option>
              <option value="luxury">Luxury Grade</option>
            </select>
          </div>

          <div style={{ marginTop: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <input
                type="checkbox"
                checked={customWork}
                onChange={(e) => setCustomWork(e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              Custom Work Required
            </label>
          </div>
        </div>

        <button
          style={buttonStyle}
          onClick={generateFFEEstimate}
          disabled={isGenerating || !ffeScope.trim()}
        >
          {isGenerating ? '🪑 Calculating...' : '🪑 Generate FFEBox Estimate'}
        </button>
      </div>

      {estimate && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#DAA520' }}>📊 FF&E Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>💰 Cost Breakdown</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Materials:</strong> ${Object.values(estimate.costBreakdown.materials).reduce((a, b) => a + b, 0).toLocaleString()}</p>
                <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.totalLaborCost.toLocaleString()}</p>
                <p><strong>Inspection:</strong> ${estimate.costBreakdown.inspection.toLocaleString()}</p>
                <p><strong>Overhead:</strong> ${estimate.costBreakdown.overhead.toLocaleString()}</p>
                <p><strong>Profit:</strong> ${estimate.costBreakdown.profit.toLocaleString()}</p>
                <hr style={{ border: '1px solid #DAA520', margin: '10px 0' }} />
                <p style={{ fontSize: '18px', color: '#DAA520' }}>
                  <strong>Total: ${estimate.totalCost.toLocaleString()}</strong>
                </p>
                <p style={{ color: '#cccccc' }}>Cost per sq ft: ${estimate.costPerSqFt}</p>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⏱️ Timeline & Specifications</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Total Duration:</strong> {estimate.timeline.estimatedDays} days</p>
                <p><strong>Design Phase:</strong> {estimate.timeline.designPhase}</p>
                <p><strong>Procurement:</strong> {estimate.timeline.procurement}</p>
                <p><strong>Installation:</strong> {estimate.timeline.installation}</p>
                <p><strong>Project Type:</strong> {estimate.specifications.projectType}</p>
                <p><strong>Quality Level:</strong> {estimate.specifications.qualityLevel}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>🔧 Required Tools & Equipment</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '12px' }}>
              <div>
                <h5 style={{ color: '#DAA520', margin: '0 0 8px 0' }}>Hand Tools</h5>
                {estimate.toolRequirements.handTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#DAA520', margin: '0 0 8px 0' }}>Power Tools</h5>
                {estimate.toolRequirements.powerTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#DAA520', margin: '0 0 8px 0' }}>Specialized Equipment</h5>
                {estimate.toolRequirements.specializedEquipment.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⚠️ Safety & Quality Standards</h4>
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

export default FFEBox;
