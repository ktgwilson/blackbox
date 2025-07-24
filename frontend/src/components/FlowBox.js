import React, { useState } from 'react';

const FlowBox = ({ visible, onEstimateGenerated }) => {
  const [plumbingScope, setPlumbingScope] = useState('');
  const [projectType, setProjectType] = useState('residential');
  const [fixtureCount, setFixtureCount] = useState(5);
  const [pipeType, setPipeType] = useState('copper');
  const [waterHeaterIncluded, setWaterHeaterIncluded] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePlumbingEstimate = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseRate = projectType === 'commercial' ? 200 : projectType === 'industrial' ? 300 : 150;
      const fixtureCost = fixtureCount * baseRate;
      const pipeMultiplier = pipeType === 'copper' ? 1.5 : pipeType === 'pex' ? 1.0 : 1.2;
      const waterHeaterCost = waterHeaterIncluded ? 2800 : 0;
      
      const mockEstimate = {
        projectType: 'Plumbing Installation',
        scope: plumbingScope,
        specifications: {
          projectType,
          fixtureCount,
          pipeType,
          waterHeaterIncluded,
          licensedPlumberRequired: true,
          permitRequired: true,
          pressureTestRequired: true
        },
        costBreakdown: {
          materials: {
            fixtures: fixtureCost,
            piping: Math.round(fixtureCount * 80 * pipeMultiplier),
            fittings: Math.round(fixtureCount * 45),
            valves: Math.round(fixtureCount * 35),
            waterHeater: waterHeaterCost,
            miscellaneous: Math.round(fixtureCost * 0.12)
          },
          labor: {
            plumberHours: Math.round(fixtureCount * 3.5),
            helperHours: Math.round(fixtureCount * 2),
            plumberRate: 85,
            helperRate: 35,
            totalLaborCost: Math.round((fixtureCount * 3.5 * 85) + (fixtureCount * 2 * 35))
          },
          permits: 325,
          inspection: 175,
          pressureTesting: 150,
          overhead: Math.round((fixtureCost + waterHeaterCost) * 0.16),
          profit: Math.round((fixtureCost + waterHeaterCost) * 0.26)
        },
        timeline: {
          estimatedDays: Math.ceil(fixtureCount / 3) + (waterHeaterIncluded ? 1 : 0),
          permitProcessing: '1-3 weeks',
          inspectionScheduling: '1-2 days after rough-in',
          pressureTestDuration: '24 hours minimum'
        },
        toolRequirements: {
          handToolsPerWorker: [
            'Pipe wrenches (10", 14", 18")',
            'Basin wrench',
            'Adjustable wrenches (set)',
            'Channel lock pliers',
            'Pipe cutter (copper/PVC)',
            'Deburring tool',
            'Torch kit (for copper)',
            'Measuring tape (25ft)'
          ],
          powerTools: [
            'Cordless drill with bits',
            'Reciprocating saw',
            'Right angle drill',
            'Pipe threading machine',
            'Drain snake (electric)'
          ],
          specializedEquipment: [
            'Pressure test pump',
            'Pipe locator',
            'Drain camera (if needed)',
            'Pipe fusion machine (for PEX)',
            'Water meter key',
            'Manometer for gas lines',
            'Core drill (for penetrations)',
            'Hydro-jetter (for cleanouts)'
          ]
        },
        safetyRequirements: [
          'OSHA 10-hour construction safety certification',
          'Confined space entry procedures (if applicable)',
          'Proper ventilation for soldering operations',
          'Eye protection and respiratory equipment',
          'Lockout/Tagout for water and gas systems',
          'Trenching and excavation safety (if applicable)'
        ]
      };
      
      const totalCost = Object.values(mockEstimate.costBreakdown.materials).reduce((a, b) => a + b, 0) +
                       mockEstimate.costBreakdown.labor.totalLaborCost +
                       mockEstimate.costBreakdown.permits +
                       mockEstimate.costBreakdown.inspection +
                       mockEstimate.costBreakdown.pressureTesting +
                       mockEstimate.costBreakdown.overhead +
                       mockEstimate.costBreakdown.profit;
      
      mockEstimate.totalCost = totalCost;
      mockEstimate.costPerFixture = Math.round(totalCost / fixtureCount);
      
      setEstimate(mockEstimate);
      if (onEstimateGenerated) {
        onEstimateGenerated(mockEstimate);
      }
      
    } catch (error) {
      console.error('Error generating plumbing estimate:', error);
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
    border: '2px solid #00ffff',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '14px'
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #00ffff, #0080ff)',
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
      <h2 style={{ margin: '0 0 20px 0', color: '#00ffff', textAlign: 'center' }}>
        🚰 FlowBox - Plumbing Estimator
      </h2>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 15px 0', color: '#00ffff' }}>🔧 Project Specifications</h3>
        
        <textarea
          style={{...inputStyle, height: '100px'}}
          placeholder="Describe the plumbing work scope (new installation, repairs, water heater, etc.)"
          value={plumbingScope}
          onChange={(e) => setPlumbingScope(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#00ffff' }}>Project Type:</label>
            <select style={inputStyle} value={projectType} onChange={(e) => setProjectType(e.target.value)}>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#00ffff' }}>Number of Fixtures:</label>
            <input
              type="number"
              style={inputStyle}
              value={fixtureCount}
              onChange={(e) => setFixtureCount(parseInt(e.target.value) || 1)}
              min="1"
              max="50"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#00ffff' }}>Pipe Material:</label>
            <select style={inputStyle} value={pipeType} onChange={(e) => setPipeType(e.target.value)}>
              <option value="copper">Copper (Premium)</option>
              <option value="pex">PEX (Standard)</option>
              <option value="cpvc">CPVC (Budget)</option>
            </select>
          </div>

          <div style={{ marginTop: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <input
                type="checkbox"
                checked={waterHeaterIncluded}
                onChange={(e) => setWaterHeaterIncluded(e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              Include Water Heater
            </label>
          </div>
        </div>

        <button
          style={buttonStyle}
          onClick={generatePlumbingEstimate}
          disabled={isGenerating || !plumbingScope.trim()}
        >
          {isGenerating ? '🚰 Calculating...' : '🚰 Generate FlowBox Estimate'}
        </button>
      </div>

      {estimate && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#00ffff' }}>📊 Plumbing Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>💰 Cost Breakdown</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Materials:</strong> ${Object.values(estimate.costBreakdown.materials).reduce((a, b) => a + b, 0).toLocaleString()}</p>
                <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.totalLaborCost.toLocaleString()}</p>
                <p><strong>Permits &amp; Inspection:</strong> ${(estimate.costBreakdown.permits + estimate.costBreakdown.inspection).toLocaleString()}</p>
                <p><strong>Testing:</strong> ${estimate.costBreakdown.pressureTesting.toLocaleString()}</p>
                <p><strong>Overhead:</strong> ${estimate.costBreakdown.overhead.toLocaleString()}</p>
                <p><strong>Profit:</strong> ${estimate.costBreakdown.profit.toLocaleString()}</p>
                <hr style={{ border: '1px solid #00ffff', margin: '10px 0' }} />
                <p style={{ fontSize: '18px', color: '#00ffff' }}>
                  <strong>Total: ${estimate.totalCost.toLocaleString()}</strong>
                </p>
                <p style={{ color: '#cccccc' }}>Cost per fixture: ${estimate.costPerFixture.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⏱️ Timeline & Requirements</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Estimated Duration:</strong> {estimate.timeline.estimatedDays} days</p>
                <p><strong>Permit Processing:</strong> {estimate.timeline.permitProcessing}</p>
                <p><strong>Inspection:</strong> {estimate.timeline.inspectionScheduling}</p>
                <p><strong>Pressure Test:</strong> {estimate.timeline.pressureTestDuration}</p>
                <p><strong>Licensed Plumber:</strong> Required</p>
                <p><strong>Pipe Material:</strong> {estimate.specifications.pipeType.toUpperCase()}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>🔧 Required Tools & Materials</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '12px' }}>
              <div>
                <h5 style={{ color: '#00ffff', margin: '0 0 8px 0' }}>Hand Tools (Per Worker)</h5>
                {estimate.toolRequirements.handToolsPerWorker.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#00ffff', margin: '0 0 8px 0' }}>Power Tools</h5>
                {estimate.toolRequirements.powerTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#00ffff', margin: '0 0 8px 0' }}>Specialized Equipment</h5>
                {estimate.toolRequirements.specializedEquipment.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⚠️ Safety & Code Compliance</h4>
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

export default FlowBox;
