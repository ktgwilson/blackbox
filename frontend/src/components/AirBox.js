import React, { useState } from 'react';

const AirBox = ({ visible, onEstimateGenerated }) => {
  const [hvacScope, setHvacScope] = useState('');
  const [systemType, setSystemType] = useState('central_air');
  const [squareFootage, setSquareFootage] = useState(1500);
  const [ductworkRequired, setDuctworkRequired] = useState(true);
  const [energyEfficiency, setEnergyEfficiency] = useState('standard');
  const [estimate, setEstimate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateHVACEstimate = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseRate = systemType === 'geothermal' ? 25 : systemType === 'heat_pump' ? 18 : 15;
      const systemCost = squareFootage * baseRate;
      const ductworkCost = ductworkRequired ? squareFootage * 8 : 0;
      const efficiencyMultiplier = energyEfficiency === 'high' ? 1.4 : energyEfficiency === 'premium' ? 1.8 : 1.0;
      
      const mockEstimate = {
        projectType: 'HVAC Installation',
        scope: hvacScope,
        specifications: {
          systemType,
          squareFootage,
          ductworkRequired,
          energyEfficiency,
          tonnage: Math.ceil(squareFootage / 600),
          certificationRequired: true,
          permitRequired: true
        },
        costBreakdown: {
          equipment: {
            hvacUnit: Math.round(systemCost * efficiencyMultiplier),
            ductwork: ductworkCost,
            thermostat: energyEfficiency === 'premium' ? 450 : energyEfficiency === 'high' ? 250 : 150,
            refrigerantLines: squareFootage * 3,
            electrical: 800,
            miscellaneous: Math.round(systemCost * 0.1)
          },
          labor: {
            hvacTechnicianHours: Math.round(squareFootage / 200),
            helperHours: Math.round(squareFootage / 300),
            technicianRate: 75,
            helperRate: 30,
            totalLaborCost: Math.round((squareFootage / 200 * 75) + (squareFootage / 300 * 30))
          },
          permits: 275,
          inspection: 200,
          overhead: Math.round((systemCost + ductworkCost) * 0.18),
          profit: Math.round((systemCost + ductworkCost) * 0.28)
        },
        timeline: {
          estimatedDays: Math.ceil(squareFootage / 1000) + (ductworkRequired ? 2 : 0),
          permitProcessing: '1-2 weeks',
          inspectionScheduling: '2-3 days after completion',
          seasonalConsiderations: 'Peak season: May-September'
        },
        energyEfficiency: {
          seerRating: energyEfficiency === 'premium' ? '20+ SEER' : energyEfficiency === 'high' ? '16-19 SEER' : '13-15 SEER',
          estimatedAnnualSavings: energyEfficiency === 'premium' ? '$800-1200' : energyEfficiency === 'high' ? '$400-600' : '$0-200',
          rebatesAvailable: energyEfficiency !== 'standard' ? 'Federal tax credits and utility rebates may apply' : 'Limited rebates available'
        },
        toolRequirements: {
          handToolsPerWorker: [
            'Adjustable wrenches (set)',
            'Pipe wrenches (10" and 14")',
            'Tubing cutter (1/4" to 1-1/8")',
            'Flaring tool',
            'Hex key set (metric and standard)',
            'Screwdriver set',
            'Tin snips',
            'Measuring tape (25ft)'
          ],
          powerTools: [
            'Cordless drill with bits',
            'Reciprocating saw',
            'Angle grinder (4.5")',
            'Sheet metal shear',
            'Hole saw kit'
          ],
          specializedEquipment: [
            'Refrigerant recovery machine',
            'Vacuum pump (6 CFM minimum)',
            'Manifold gauge set',
            'Digital refrigerant scale',
            'Leak detector (electronic)',
            'Combustion analyzer',
            'Duct blaster (if testing required)',
            'Core drill (for line sets)'
          ]
        },
        materialsList: {
          hvacUnit: `${Math.ceil(squareFootage / 600)} ton ${systemType.replace('_', ' ')} system`,
          ductwork: ductworkRequired ? `${Math.round(squareFootage / 10)}ft supply/return ducts` : 'Existing ductwork',
          refrigerantLines: `${squareFootage * 0.8}ft insulated line set`,
          thermostat: `${energyEfficiency} efficiency programmable thermostat`,
          electrical: '240V disconnect, whip, and electrical connections',
          filters: 'High-efficiency air filters (1 year supply)',
          registers: `${Math.ceil(squareFootage / 150)} supply and return registers`
        },
        warrantyInfo: {
          equipment: '10 years parts, 1 year labor',
          installation: '2 years full coverage',
          extended: 'Extended warranties available'
        }
      };
      
      const totalCost = Object.values(mockEstimate.costBreakdown.equipment).reduce((a, b) => a + b, 0) +
                       mockEstimate.costBreakdown.labor.totalLaborCost +
                       mockEstimate.costBreakdown.permits +
                       mockEstimate.costBreakdown.inspection +
                       mockEstimate.costBreakdown.overhead +
                       mockEstimate.costBreakdown.profit;
      
      mockEstimate.totalCost = totalCost;
      mockEstimate.costPerSquareFoot = Math.round(totalCost / squareFootage);
      
      setEstimate(mockEstimate);
      if (onEstimateGenerated) {
        onEstimateGenerated(mockEstimate);
      }
      
    } catch (error) {
      console.error('Error generating HVAC estimate:', error);
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
    border: '2px solid #00bfff',
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
    background: 'linear-gradient(45deg, #00bfff, #0080ff)',
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
      <h2 style={{ margin: '0 0 20px 0', color: '#00bfff', textAlign: 'center' }}>
        ❄️ AirBox - HVAC Estimator
      </h2>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 15px 0', color: '#00bfff' }}>🌡️ System Specifications</h3>
        
        <textarea
          style={{...inputStyle, height: '100px'}}
          placeholder="Describe the HVAC work scope (installation, replacement, ductwork, etc.)"
          value={hvacScope}
          onChange={(e) => setHvacScope(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#00bfff' }}>System Type:</label>
            <select style={inputStyle} value={systemType} onChange={(e) => setSystemType(e.target.value)}>
              <option value="central_air">Central Air Conditioning</option>
              <option value="heat_pump">Heat Pump System</option>
              <option value="geothermal">Geothermal System</option>
              <option value="mini_split">Mini-Split System</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#00bfff' }}>Square Footage:</label>
            <input
              type="number"
              style={inputStyle}
              value={squareFootage}
              onChange={(e) => setSquareFootage(parseInt(e.target.value) || 1500)}
              min="500"
              max="10000"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#00bfff' }}>Energy Efficiency:</label>
            <select style={inputStyle} value={energyEfficiency} onChange={(e) => setEnergyEfficiency(e.target.value)}>
              <option value="standard">Standard Efficiency</option>
              <option value="high">High Efficiency</option>
              <option value="premium">Premium Efficiency</option>
            </select>
          </div>

          <div style={{ marginTop: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <input
                type="checkbox"
                checked={ductworkRequired}
                onChange={(e) => setDuctworkRequired(e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              New Ductwork Required
            </label>
          </div>
        </div>

        <button
          style={buttonStyle}
          onClick={generateHVACEstimate}
          disabled={isGenerating || !hvacScope.trim()}
        >
          {isGenerating ? '❄️ Calculating...' : '❄️ Generate AirBox Estimate'}
        </button>
      </div>

      {estimate && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#00bfff' }}>📊 HVAC Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>💰 Cost Breakdown</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Equipment:</strong> ${Object.values(estimate.costBreakdown.equipment).reduce((a, b) => a + b, 0).toLocaleString()}</p>
                <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.totalLaborCost.toLocaleString()}</p>
                <p><strong>Permits &amp; Inspection:</strong> ${(estimate.costBreakdown.permits + estimate.costBreakdown.inspection).toLocaleString()}</p>
                <p><strong>Overhead:</strong> ${estimate.costBreakdown.overhead.toLocaleString()}</p>
                <p><strong>Profit:</strong> ${estimate.costBreakdown.profit.toLocaleString()}</p>
                <hr style={{ border: '1px solid #00bfff', margin: '10px 0' }} />
                <p style={{ fontSize: '18px', color: '#00bfff' }}>
                  <strong>Total: ${estimate.totalCost.toLocaleString()}</strong>
                </p>
                <p style={{ color: '#cccccc' }}>Cost per sq ft: ${estimate.costPerSquareFoot.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⏱️ Timeline &amp; Efficiency</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Estimated Duration:</strong> {estimate.timeline.estimatedDays} days</p>
                <p><strong>System Tonnage:</strong> {estimate.specifications.tonnage} tons</p>
                <p><strong>SEER Rating:</strong> {estimate.energyEfficiency.seerRating}</p>
                <p><strong>Annual Savings:</strong> {estimate.energyEfficiency.estimatedAnnualSavings}</p>
                <p><strong>Rebates:</strong> {estimate.energyEfficiency.rebatesAvailable}</p>
                <p><strong>Warranty:</strong> {estimate.warrantyInfo.equipment}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>🔧 Required Tools &amp; Materials</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '12px' }}>
              <div>
                <h5 style={{ color: '#00bfff', margin: '0 0 8px 0' }}>Hand Tools (Per Worker)</h5>
                {estimate.toolRequirements.handToolsPerWorker.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#00bfff', margin: '0 0 8px 0' }}>Power Tools</h5>
                {estimate.toolRequirements.powerTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#00bfff', margin: '0 0 8px 0' }}>Specialized Equipment</h5>
                {estimate.toolRequirements.specializedEquipment.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>📋 Materials List</h4>
            <div style={{ fontSize: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {Object.entries(estimate.materialsList).map(([key, value]) => (
                <p key={key} style={{ margin: '3px 0' }}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirBox;
