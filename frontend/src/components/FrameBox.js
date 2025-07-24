import React, { useState } from 'react';

const FrameBox = ({ visible }) => {
  const [framingScope, setFramingScope] = useState('');
  const [projectType, setProjectType] = useState('commercial');
  const [squareFootage, setSquareFootage] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [framingMaterial, setFramingMaterial] = useState('steel');
  const [estimate, setEstimate] = useState(null);

  const generateFramingEstimate = () => {
    const sqft = parseFloat(squareFootage) || 1000;
    const height = parseFloat(wallHeight) || 10;
    
    let baseRate = 12;
    let complexity = 'Medium';
    let crew = ['3 Framers', '1 Lead Framer', '1 Helper'];
    let timeline = '5-10 days';
    
    if (projectType === 'high_rise') {
      baseRate = 28;
      complexity = 'High (Structural)';
      crew = ['4 Framers', '1 Structural Specialist', '1 Safety Coordinator', '1 Crane Operator'];
      timeline = '15-30 days';
    } else if (projectType === 'residential') {
      baseRate = 8;
      complexity = 'Medium';
      crew = ['2 Framers', '1 Lead Framer'];
      timeline = '3-7 days';
    }

    const materialMultiplier = {
      'wood': 1.0,
      'steel': 1.8,
      'concrete': 2.2,
      'composite': 1.4
    }[framingMaterial] || 1.0;

    const heightMultiplier = height > 12 ? 1.3 : height > 8 ? 1.1 : 1.0;

    const materialCost = sqft * baseRate * materialMultiplier * heightMultiplier;
    const laborCost = sqft * 15 * (projectType === 'high_rise' ? 2.0 : 1.0);
    const equipmentCost = projectType === 'high_rise' ? 2500 : 800;
    const permitCost = 650;
    const totalCost = materialCost + laborCost + equipmentCost + permitCost;
    const markup = totalCost * 0.32;
    const finalPrice = totalCost + markup;

    const tools = [
      'Framing nailers and compressors',
      'Circular saws and miter saws',
      'Levels and squares',
      'Measuring tapes and chalk lines',
      'Hammers and hand tools',
      'Safety equipment',
      projectType === 'high_rise' ? 'Crane and rigging equipment' : 'Scaffolding',
      'Power tools and batteries'
    ];

    const materials = [
      `${framingMaterial.charAt(0).toUpperCase() + framingMaterial.slice(1)} framing members`,
      'Fasteners and connectors',
      'Sheathing materials',
      'Insulation (if specified)',
      'Vapor barriers',
      'Structural hardware',
      'Anchor bolts and ties',
      'Temporary bracing materials'
    ];

    setEstimate({
      scope: framingScope,
      projectType: projectType.replace('_', ' ').toUpperCase(),
      complexity,
      crew,
      tools,
      materials,
      timeline,
      squareFootage: sqft,
      wallHeight: height,
      framingMaterial: framingMaterial.toUpperCase(),
      costBreakdown: {
        materials: Math.round(materialCost),
        labor: Math.round(laborCost),
        equipment: equipmentCost,
        permits: permitCost,
        subtotal: Math.round(totalCost),
        markup: Math.round(markup),
        total: Math.round(finalPrice)
      },
      structuralRequirements: [
        'Structural engineering review required',
        'Building code compliance verification',
        'Load-bearing calculations completed',
        'Foundation attachment specifications',
        'Seismic and wind load considerations'
      ],
      qualityStandards: [
        'Lumber grading standards compliance',
        'Fastener specifications per code',
        'Framing square and plumb tolerances',
        'Moisture content requirements',
        'Fire-rated assembly specifications'
      ]
    });
  };

  if (!visible) return null;

  const containerStyle = {
    background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(160, 82, 45, 0.05))',
    border: '2px solid rgba(139, 69, 19, 0.3)',
    borderRadius: '15px',
    padding: '25px',
    margin: '20px 0',
    color: '#ffffff'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '2px solid rgba(139, 69, 19, 0.3)',
    borderRadius: '8px',
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    marginBottom: '15px'
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #8B4513, #A0522D)',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#D2691E', marginBottom: '20px', textAlign: 'center' }}>
        🏗️ FrameBox - Professional Framing Estimator
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Framing Project Scope:
          </label>
          <textarea
            value={framingScope}
            onChange={(e) => setFramingScope(e.target.value)}
            placeholder="Describe the framing project (commercial build-out, residential addition, warehouse structure...)"
            style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Project Type:
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            style={inputStyle}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
            <option value="high_rise">High-Rise</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Square Footage:
          </label>
          <input
            type="number"
            value={squareFootage}
            onChange={(e) => setSquareFootage(e.target.value)}
            placeholder="Total framing area in sq ft"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Wall Height (feet):
          </label>
          <input
            type="number"
            value={wallHeight}
            onChange={(e) => setWallHeight(e.target.value)}
            placeholder="Average wall height"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Framing Material:
          </label>
          <select
            value={framingMaterial}
            onChange={(e) => setFramingMaterial(e.target.value)}
            style={inputStyle}
          >
            <option value="wood">Wood Frame</option>
            <option value="steel">Steel Frame</option>
            <option value="concrete">Concrete Frame</option>
            <option value="composite">Composite Materials</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateFramingEstimate}
        style={buttonStyle}
        onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.target.style.transform = 'scale(1)'}
      >
        🧮 Generate Framing Estimate
      </button>

      {estimate && (
        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(139, 69, 19, 0.1)', borderRadius: '10px' }}>
          <h3 style={{ color: '#D2691E', marginBottom: '20px' }}>📊 Framing Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Project Details</h4>
              <p><strong>Type:</strong> {estimate.projectType}</p>
              <p><strong>Area:</strong> {estimate.squareFootage} sq ft</p>
              <p><strong>Height:</strong> {estimate.wallHeight} ft</p>
              <p><strong>Material:</strong> {estimate.framingMaterial}</p>
              <p><strong>Complexity:</strong> {estimate.complexity}</p>
              <p><strong>Timeline:</strong> {estimate.timeline}</p>
            </div>

            <div>
              <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Cost Breakdown</h4>
              <p><strong>Materials:</strong> ${estimate.costBreakdown.materials.toLocaleString()}</p>
              <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.toLocaleString()}</p>
              <p><strong>Equipment:</strong> ${estimate.costBreakdown.equipment.toLocaleString()}</p>
              <p><strong>Permits:</strong> ${estimate.costBreakdown.permits.toLocaleString()}</p>
              <p><strong>Subtotal:</strong> ${estimate.costBreakdown.subtotal.toLocaleString()}</p>
              <p><strong>Markup (32%):</strong> ${estimate.costBreakdown.markup.toLocaleString()}</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#D2691E' }}>
                <strong>Total:</strong> ${estimate.costBreakdown.total.toLocaleString()}
              </p>
            </div>

            <div>
              <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Crew Requirements</h4>
              {estimate.crew.map((member, index) => (
                <p key={index}>• {member}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Required Tools & Equipment</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {estimate.tools.map((tool, index) => (
                <p key={index} style={{ margin: '5px 0' }}>• {tool}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Materials List</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {estimate.materials.map((material, index) => (
                <p key={index} style={{ margin: '5px 0' }}>• {material}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Structural Requirements</h4>
            {estimate.structuralRequirements.map((req, index) => (
              <p key={index} style={{ margin: '5px 0' }}>• {req}</p>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Quality Standards</h4>
            {estimate.qualityStandards.map((standard, index) => (
              <p key={index} style={{ margin: '5px 0' }}>• {standard}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FrameBox;
