import React, { useState } from 'react';

const PoolBox = ({ visible, onEstimateGenerated }) => {
  const [poolScope, setPoolScope] = useState('');
  const [poolType, setPoolType] = useState('inground');
  const [poolSize, setPoolSize] = useState('medium');
  const [features, setFeatures] = useState([]);
  const [equipment, setEquipment] = useState('standard');
  const [estimate, setEstimate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMarketData, setShowMarketData] = useState(false);
  const [showHotelFinder, setShowHotelFinder] = useState(false);

  const handleFeatureChange = (feature) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const generatePoolEstimate = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseCost = {
        'inground': { 'small': 35000, 'medium': 55000, 'large': 85000 },
        'above_ground': { 'small': 8000, 'medium': 15000, 'large': 25000 },
        'spa': { 'small': 15000, 'medium': 25000, 'large': 40000 }
      }[poolType][poolSize] || 55000;
      
      const featureCosts = {
        'heating': 5000,
        'lighting': 3000,
        'waterfall': 8000,
        'automation': 4000,
        'saltwater': 2500
      };
      
      const equipmentMultiplier = {
        'standard': 1.0,
        'premium': 1.4,
        'luxury': 1.8
      }[equipment] || 1.0;

      const featureCost = features.reduce((sum, feature) => sum + (featureCosts[feature] || 0), 0);
      const totalMaterialCost = (baseCost + featureCost) * equipmentMultiplier;

      const mockEstimate = {
        projectType: 'Pool Construction',
        scope: poolScope,
        specifications: {
          poolType,
          poolSize,
          features: features.join(', '),
          equipment,
          filtrationSystem: 'Sand filter with automatic cleaning',
          warranty: '10 years structural, 2 years equipment'
        },
        costBreakdown: {
          materials: {
            excavation: Math.round(totalMaterialCost * 0.15),
            steel: Math.round(totalMaterialCost * 0.12),
            concrete: Math.round(totalMaterialCost * 0.18),
            plumbing: Math.round(totalMaterialCost * 0.10),
            electrical: Math.round(totalMaterialCost * 0.08),
            equipment: Math.round(totalMaterialCost * 0.20),
            finishing: Math.round(totalMaterialCost * 0.17)
          },
          labor: {
            excavationHours: Math.round(poolSize === 'large' ? 40 : poolSize === 'medium' ? 24 : 16),
            constructionHours: Math.round(poolSize === 'large' ? 120 : poolSize === 'medium' ? 80 : 60),
            finishingHours: Math.round(poolSize === 'large' ? 60 : poolSize === 'medium' ? 40 : 30),
            laborRate: 75,
            totalLaborCost: Math.round((poolSize === 'large' ? 220 : poolSize === 'medium' ? 144 : 106) * 75)
          },
          permits: Math.round(baseCost * 0.02),
          inspection: Math.round(baseCost * 0.01),
          overhead: Math.round(totalMaterialCost * 0.12),
          profit: Math.round(totalMaterialCost * 0.18)
        },
        timeline: {
          estimatedDays: poolSize === 'large' ? 21 : poolSize === 'medium' ? 14 : 10,
          excavationPhase: '2-3 days',
          constructionPhase: poolSize === 'large' ? '10-14 days' : '7-10 days',
          finishingPhase: '3-5 days',
          weatherDependency: 'High - outdoor work'
        },
        safetyRequirements: [
          'Excavation safety and shoring requirements',
          'Electrical safety for pool equipment',
          'Chemical handling safety protocols',
          'Heavy equipment operation safety',
          'Water safety during construction'
        ],
        toolRequirements: {
          handTools: [
            'Pool trowels and floats',
            'Measuring tapes and levels',
            'Hand saws and cutting tools',
            'Plumbing hand tools',
            'Electrical hand tools',
            'Safety equipment',
            'Cleaning supplies'
          ],
          powerTools: [
            'Concrete mixer',
            'Tile saw',
            'Pressure washer',
            'Pneumatic tools',
            'Electrical testing equipment'
          ],
          heavyEquipment: [
            'Excavator',
            'Concrete pump truck',
            'Compaction equipment',
            'Material delivery trucks',
            'Crane (if needed)'
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
      
      setEstimate(mockEstimate);
      if (onEstimateGenerated) {
        onEstimateGenerated(mockEstimate);
      }
      
    } catch (error) {
      console.error('Error generating pool estimate:', error);
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
    border: '2px solid #00BFFF',
    boxShadow: '0 0 20px rgba(0, 191, 255, 0.3)'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(0, 191, 255, 0.3)',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(0, 191, 255, 0.3)',
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '14px'
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #00BFFF, #87CEEB)',
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
      <h2 style={{ margin: '0 0 20px 0', color: '#00BFFF', textAlign: 'center' }}>
        🏊 PoolBox - Pool Construction Estimator
      </h2>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 15px 0', color: '#00BFFF' }}>🏊 Pool Specifications</h3>
        
        <textarea
          style={{...inputStyle, height: '100px'}}
          placeholder="Describe the pool construction project (inground pool, spa, features, equipment, etc.)"
          value={poolScope}
          onChange={(e) => setPoolScope(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#00BFFF' }}>Pool Type:</label>
            <select style={inputStyle} value={poolType} onChange={(e) => setPoolType(e.target.value)}>
              <option value="inground">Inground Pool</option>
              <option value="above_ground">Above Ground Pool</option>
              <option value="spa">Spa/Hot Tub</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#00BFFF' }}>Pool Size:</label>
            <select style={inputStyle} value={poolSize} onChange={(e) => setPoolSize(e.target.value)}>
              <option value="small">Small (12x24)</option>
              <option value="medium">Medium (16x32)</option>
              <option value="large">Large (20x40)</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: '#00BFFF' }}>Features:</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {['heating', 'lighting', 'waterfall', 'automation', 'saltwater'].map(feature => (
              <label key={feature} style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
                <input
                  type="checkbox"
                  checked={features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  style={{ marginRight: '8px' }}
                />
                {feature.charAt(0).toUpperCase() + feature.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#00BFFF' }}>Equipment Level:</label>
          <select style={inputStyle} value={equipment} onChange={(e) => setEquipment(e.target.value)}>
            <option value="standard">Standard Equipment</option>
            <option value="premium">Premium Equipment</option>
            <option value="luxury">Luxury Equipment</option>
          </select>
        </div>

        <button
          style={buttonStyle}
          onClick={generatePoolEstimate}
          disabled={isGenerating || !poolScope.trim()}
        >
          {isGenerating ? '🏊 Calculating...' : '🏊 Generate PoolBox Estimate'}
        </button>
      </div>

      {estimate && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#00BFFF' }}>📊 Pool Construction Estimate</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>💰 Cost Breakdown</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Materials:</strong> ${Object.values(estimate.costBreakdown.materials).reduce((a, b) => a + b, 0).toLocaleString()}</p>
                <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.totalLaborCost.toLocaleString()}</p>
                <p><strong>Permits:</strong> ${estimate.costBreakdown.permits.toLocaleString()}</p>
                <p><strong>Inspection:</strong> ${estimate.costBreakdown.inspection.toLocaleString()}</p>
                <p><strong>Overhead:</strong> ${estimate.costBreakdown.overhead.toLocaleString()}</p>
                <p><strong>Profit:</strong> ${estimate.costBreakdown.profit.toLocaleString()}</p>
                <hr style={{ border: '1px solid #00BFFF', margin: '10px 0' }} />
                <p style={{ fontSize: '18px', color: '#00BFFF' }}>
                  <strong>Total: ${estimate.totalCost.toLocaleString()}</strong>
                </p>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⏱️ Timeline & Specifications</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Estimated Duration:</strong> {estimate.timeline.estimatedDays} days</p>
                <p><strong>Excavation:</strong> {estimate.timeline.excavationPhase}</p>
                <p><strong>Construction:</strong> {estimate.timeline.constructionPhase}</p>
                <p><strong>Finishing:</strong> {estimate.timeline.finishingPhase}</p>
                <p><strong>Weather Dependency:</strong> {estimate.timeline.weatherDependency}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>🔧 Required Tools & Equipment</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '12px' }}>
              <div>
                <h5 style={{ color: '#00BFFF', margin: '0 0 8px 0' }}>Hand Tools</h5>
                {estimate.toolRequirements.handTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#00BFFF', margin: '0 0 8px 0' }}>Power Tools</h5>
                {estimate.toolRequirements.powerTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#00BFFF', margin: '0 0 8px 0' }}>Heavy Equipment</h5>
                {estimate.toolRequirements.heavyEquipment.map((tool, index) => (
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

export default PoolBox;
