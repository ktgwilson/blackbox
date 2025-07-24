import React, { useState } from 'react';

const SecurityBox = ({ visible, onEstimateGenerated }) => {
  const [securityScope, setSecurityScope] = useState('');
  const [systemType, setSystemType] = useState('alarm_system');
  const [zoneCount, setZoneCount] = useState(8);
  const [cameraCount, setCameraCount] = useState(4);
  const [accessControl, setAccessControl] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMarketData, setShowMarketData] = useState(false);

  const generateSecurityEstimate = async () => {
    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const baseRate = systemType === 'integrated' ? 300 : systemType === 'cameras' ? 250 : 200;
      const systemMultiplier = {
        'alarm_system': 1.0,
        'cameras': 1.2,
        'access_control': 1.1,
        'integrated': 1.5
      }[systemType] || 1.0;
      
      const equipmentCost = (zoneCount * 50 + cameraCount * baseRate) * systemMultiplier;
      const accessCost = accessControl ? zoneCount * 150 : 0;
      
      const mockEstimate = {
        projectType: 'Security Systems Installation',
        scope: securityScope,
        specifications: {
          systemType,
          zoneCount,
          cameraCount,
          accessControl,
          monitoring: '24/7 monitoring capable',
          connectivity: 'IP-based with cellular backup'
        },
        costBreakdown: {
          materials: {
            controlPanel: Math.round(equipmentCost * 0.25),
            sensors: Math.round(zoneCount * 45),
            cameras: Math.round(cameraCount * 180),
            accessControlHardware: accessCost,
            wiring: Math.round((zoneCount + cameraCount) * 25),
            networkEquipment: Math.round(equipmentCost * 0.15),
            miscellaneous: Math.round(equipmentCost * 0.10)
          },
          labor: {
            installationHours: Math.round((zoneCount * 2) + (cameraCount * 3) + (accessControl ? zoneCount : 0)),
            programmingHours: Math.round(systemType === 'integrated' ? 16 : 8),
            testingHours: Math.round((zoneCount + cameraCount) * 0.5),
            laborRate: 85,
            totalLaborCost: Math.round(((zoneCount * 2) + (cameraCount * 3) + (accessControl ? zoneCount : 0) + (systemType === 'integrated' ? 16 : 8) + ((zoneCount + cameraCount) * 0.5)) * 85)
          },
          permits: Math.round(equipmentCost * 0.03),
          inspection: Math.round(equipmentCost * 0.02),
          overhead: Math.round(equipmentCost * 0.15),
          profit: Math.round(equipmentCost * 0.20)
        },
        timeline: {
          estimatedDays: Math.ceil((zoneCount + cameraCount) / 4) + (systemType === 'integrated' ? 2 : 1),
          installationTime: `${Math.ceil((zoneCount + cameraCount) / 4)} days`,
          programmingTime: systemType === 'integrated' ? '2 days' : '1 day',
          testingTime: '0.5 days'
        },
        safetyRequirements: [
          'Electrical safety protocols for low voltage work',
          'Ladder safety for camera installations',
          'Network security best practices',
          'Proper cable management and fire safety',
          'Testing and commissioning procedures'
        ],
        toolRequirements: {
          handTools: [
            'Wire strippers and crimpers',
            'Network cable tester',
            'Multimeter',
            'Drill bits and drivers',
            'Cable pulling tools',
            'Labeling equipment',
            'Testing devices'
          ],
          powerTools: [
            'Cordless drill/driver',
            'Oscillating multi-tool',
            'Cable pulling system',
            'Network punch-down tool',
            'Voltage tester'
          ],
          specializedEquipment: [
            'Network analyzer',
            'Camera testing monitor',
            'Programming laptop',
            'Ladder or lift equipment',
            'Cable management systems'
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
      console.error('Error generating security estimate:', error);
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
    border: '2px solid #DC143C',
    boxShadow: '0 0 20px rgba(220, 20, 60, 0.3)'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(220, 20, 60, 0.3)',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '15px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(220, 20, 60, 0.3)',
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '14px'
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #DC143C, #FF6347)',
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
      <h2 style={{ margin: '0 0 20px 0', color: '#DC143C', textAlign: 'center' }}>
        🔒 SecurityBox - Security Systems Estimator
      </h2>

      <div style={cardStyle}>
        <h3 style={{ margin: '0 0 15px 0', color: '#DC143C' }}>🔒 Security System Specifications</h3>
        
        <textarea
          style={{...inputStyle, height: '100px'}}
          placeholder="Describe the security system project (alarm system, cameras, access control, monitoring, etc.)"
          value={securityScope}
          onChange={(e) => setSecurityScope(e.target.value)}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#DC143C' }}>System Type:</label>
            <select style={inputStyle} value={systemType} onChange={(e) => setSystemType(e.target.value)}>
              <option value="alarm_system">Alarm System</option>
              <option value="cameras">Camera System</option>
              <option value="access_control">Access Control</option>
              <option value="integrated">Integrated System</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#DC143C' }}>Zone Count:</label>
            <input
              type="number"
              style={inputStyle}
              value={zoneCount}
              onChange={(e) => setZoneCount(parseInt(e.target.value) || 8)}
              min="1"
              max="50"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#DC143C' }}>Camera Count:</label>
            <input
              type="number"
              style={inputStyle}
              value={cameraCount}
              onChange={(e) => setCameraCount(parseInt(e.target.value) || 4)}
              min="0"
              max="32"
            />
          </div>

          <div style={{ marginTop: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
              <input
                type="checkbox"
                checked={accessControl}
                onChange={(e) => setAccessControl(e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              Access Control System
            </label>
          </div>
        </div>

        <button
          style={buttonStyle}
          onClick={generateSecurityEstimate}
          disabled={isGenerating || !securityScope.trim()}
        >
          {isGenerating ? '🔒 Calculating...' : '🔒 Generate SecurityBox Estimate'}
        </button>
      </div>

      {estimate && (
        <div style={cardStyle}>
          <h3 style={{ margin: '0 0 15px 0', color: '#DC143C' }}>📊 Security System Estimate</h3>
          
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
                <hr style={{ border: '1px solid #DC143C', margin: '10px 0' }} />
                <p style={{ fontSize: '18px', color: '#DC143C' }}>
                  <strong>Total: ${estimate.totalCost.toLocaleString()}</strong>
                </p>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⏱️ Timeline & Specifications</h4>
              <div style={{ fontSize: '14px' }}>
                <p><strong>Estimated Duration:</strong> {estimate.timeline.estimatedDays} days</p>
                <p><strong>Installation Time:</strong> {estimate.timeline.installationTime}</p>
                <p><strong>Programming Time:</strong> {estimate.timeline.programmingTime}</p>
                <p><strong>Testing Time:</strong> {estimate.timeline.testingTime}</p>
                <p><strong>System Type:</strong> {estimate.specifications.systemType}</p>
                <p><strong>Monitoring:</strong> {estimate.specifications.monitoring}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>🔧 Required Tools & Equipment</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', fontSize: '12px' }}>
              <div>
                <h5 style={{ color: '#DC143C', margin: '0 0 8px 0' }}>Hand Tools</h5>
                {estimate.toolRequirements.handTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#DC143C', margin: '0 0 8px 0' }}>Power Tools</h5>
                {estimate.toolRequirements.powerTools.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
              <div>
                <h5 style={{ color: '#DC143C', margin: '0 0 8px 0' }}>Specialized Equipment</h5>
                {estimate.toolRequirements.specializedEquipment.map((tool, index) => (
                  <p key={index} style={{ margin: '2px 0' }}>• {tool}</p>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>⚠️ Safety & Security Standards</h4>
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

export default SecurityBox;
