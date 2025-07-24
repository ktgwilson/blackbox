import React, { useState } from 'react';

const VoltBox = ({ visible, onEstimateGenerated }) => {
  const [electricalScope, setElectricalScope] = useState('');
  const [voltageType, setVoltageType] = useState('120V');
  const [circuitCount, setCircuitCount] = useState(5);
  const [panelUpgrade, setPanelUpgrade] = useState(false);
  const [permitRequired, setPermitRequired] = useState(true);
  const [estimate, setEstimate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateElectricalEstimate = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseRate = voltageType === '480V' ? 180 : voltageType === '240V' ? 120 : 85;
      const circuitCost = circuitCount * baseRate;
      const panelCost = panelUpgrade ? 2500 : 0;
      const permitCost = permitRequired ? 275 : 0;
      
      const mockEstimate = {
        projectType: 'Electrical Installation',
        scope: electricalScope,
        specifications: {
          voltageType,
          circuitCount,
          panelUpgrade,
          permitRequired,
          licensedElectricianRequired: true,
          codeCompliance: 'NEC 2020'
        },
        costBreakdown: {
          materials: {
            wire: Math.round(circuitCount * 45),
            outlets: circuitCount * 25,
            breakers: circuitCount * 35,
            conduit: Math.round(circuitCount * 28),
            panelUpgrade: panelCost,
            miscellaneous: Math.round(circuitCost * 0.15)
          },
          labor: {
            electricianHours: Math.round(circuitCount * 2.5),
            helperHours: Math.round(circuitCount * 1.5),
            electricianRate: 95,
            helperRate: 35,
            totalLaborCost: Math.round((circuitCount * 2.5 * 95) + (circuitCount * 1.5 * 35))
          },
          permits: permitCost,
          inspection: permitRequired ? 150 : 0,
          overhead: Math.round((circuitCost + panelCost) * 0.18),
          profit: Math.round((circuitCost + panelCost) * 0.28)
        },
        timeline: {
          estimatedDays: Math.ceil(circuitCount / 8) + (panelUpgrade ? 1 : 0),
          permitProcessing: permitRequired ? '1-2 weeks' : 'N/A',
          inspectionScheduling: permitRequired ? '1-2 days after rough-in' : 'N/A'
        },
        toolRequirements: {
          handToolsPerWorker: [
            'Wire strippers (12-20 AWG)',
            'Needle nose pliers',
            'Lineman pliers',
            'Screwdriver set (insulated)',
            'Voltage tester (non-contact)',
            'Multimeter',
            'Wire nuts and connectors',
            'Electrical tape'
          ],
          powerTools: [
            'Cordless drill with bits',
            'Reciprocating saw',
            'Hole saw kit',
            'Fish tape (25ft)',
            'Wire pulling system'
          ],
          specializedEquipment: [
            'Conduit bender (1/2" and 3/4")',
            'Cable puller',
            'Circuit tracer',
            'Insulation tester',
            'Ground fault tester',
            'Load tester',
            'Oscilloscope (for complex troubleshooting)'
          ]
        },
        safetyRequirements: [
          'OSHA electrical safety training required',
          'Lockout/Tagout procedures mandatory',
          'Arc flash protection equipment',
          'Insulated tools and PPE required',
          'Ground fault circuit interrupter testing',
          'Proper grounding and bonding verification'
        ]
      };
      
      const totalCost = Object.values(mockEstimate.costBreakdown.materials).reduce((a, b) => a + b, 0) +
                       mockEstimate.costBreakdown.labor.totalLaborCost +
                       mockEstimate.costBreakdown.permits +
                       mockEstimate.costBreakdown.inspection +
                       mockEstimate.costBreakdown.overhead +
                       mockEstimate.costBreakdown.profit;
      
      mockEstimate.totalCost = totalCost;
      mockEstimate.costPerCircuit = Math.round(totalCost / circuitCount);
      
      setEstimate(mockEstimate);
      if (onEstimateGenerated) {
        onEstimateGenerated(mockEstimate);
      }
      
    } catch (error) {
      console.error('Error generating electrical estimate:', error);
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
    border: '2px solid #ffff00',
    boxShadow: '0 0 20px rgba(255, 255, 0, 0.3)'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 0, 0.3)',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 0, 0.3)',
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '14px'
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #ffff00, #ffd700)',
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
      <h2 style={{ margin: '0 0 20px 0', color: '#ffff00', textAlign: 'center' }}>
        ⚡ VoltBox - Electrical Estimator
      </h2>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 15px 0', color: '#ffff00' }}>🔌 Electrical Specifications</h3>
        
        <textarea
          style={{...inputStyle, height: '100px'}}
          placeholder="Describe the electrical work scope (new circuits, panel upgrade, outlet installation, etc.)"
          value={electricalScope}
          onChange={(e) => setElectricalScope(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#ffff00' }}>Voltage Type:</label>
            <select style={inputStyle} value={voltageType} onChange={(e) => setVoltageType(e.target.value)}>
              <option value="120V">120V (Standard Residential)</option>
              <option value="240V">240V (Heavy Appliances)</option>
              <option value="480V">480V (Commercial/Industrial)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#ffff00' }}>Number of Circuits:</label>
            <input
              type="number"
              style={inputStyle}
              value={circuitCount}
              onChange={(e) => setCircuitCount(parseInt(e.target.value) || 1)}
              min="1"
              max="50"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div style={{ marginTop: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <input
                type="checkbox"
                checked={panelUpgrade}
                onChange={(e) => setPanelUpgrade(e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              Panel Upgrade Required
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <input
                type="checkbox"
                checked={permitRequired}
                onChange={(e) => setPermitRequired(e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              Permit Required
            </label>
          </div>
        </div>

        <button
          style={buttonStyle}
          onClick={generateElectricalEstimate}
          disabled={isGenerating || !electricalScope.trim()}
        >
          {isGenerating ? '⚡ Calculating...' : '⚡ Generate VoltBox Estimate'}
        </button>
      </div>

      {estimate && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#ffff00' }}>📊 Electrical Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>💰 Cost Breakdown</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Materials:</strong> ${Object.values(estimate.costBreakdown.materials).reduce((a, b) => a + b, 0).toLocaleString()}</p>
                <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.totalLaborCost.toLocaleString()}</p>
                <p><strong>Permits &amp; Inspection:</strong> ${(estimate.costBreakdown.permits + estimate.costBreakdown.inspection).toLocaleString()}</p>
                <p><strong>Overhead:</strong> ${estimate.costBreakdown.overhead.toLocaleString()}</p>
                <p><strong>Profit:</strong> ${estimate.costBreakdown.profit.toLocaleString()}</p>
                <hr style={{ border: '1px solid #ffff00', margin: '10px 0' }} />
                <p style={{ fontSize: '18px', color: '#ffff00' }}>
                  <strong>Total: ${estimate.totalCost.toLocaleString()}</strong>
                </p>
                <p style={{ color: '#cccccc' }}>Cost per circuit: ${estimate.costPerCircuit.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⏱️ Timeline &amp; Requirements</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Estimated Duration:</strong> {estimate.timeline.estimatedDays} days</p>
                <p><strong>Permit Processing:</strong> {estimate.timeline.permitProcessing}</p>
                <p><strong>Inspection:</strong> {estimate.timeline.inspectionScheduling}</p>
                <p><strong>Voltage Type:</strong> {estimate.specifications.voltageType}</p>
                <p><strong>Circuit Count:</strong> {estimate.specifications.circuitCount}</p>
                <p><strong>Code Compliance:</strong> {estimate.specifications.codeCompliance}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>🔧 Required Tools &amp; Materials</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '12px' }}>
              <div>
                <h5 style={{ color: '#ffff00', margin: '0 0 8px 0' }}>Hand Tools (Per Worker)</h5>
                {estimate.toolRequirements.handToolsPerWorker.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#ffff00', margin: '0 0 8px 0' }}>Power Tools</h5>
                {estimate.toolRequirements.powerTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#ffff00', margin: '0 0 8px 0' }}>Specialized Equipment</h5>
                {estimate.toolRequirements.specializedEquipment.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⚠️ Safety &amp; Code Compliance</h4>
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

export default VoltBox;
