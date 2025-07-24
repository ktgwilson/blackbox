import React, { useState } from 'react';

const GlazeBox = ({ visible }) => {
  const [glazingScope, setGlazingScope] = useState('');
  const [glazingType, setGlazingType] = useState('storefront');
  const [squareFootage, setSquareFootage] = useState('');
  const [glassType, setGlassType] = useState('tempered');
  const [frameType, setFrameType] = useState('aluminum');
  const [estimate, setEstimate] = useState(null);

  const generateGlazingEstimate = () => {
    const sqft = parseFloat(squareFootage) || 100;
    
    let baseRate = 45;
    let complexity = 'Medium';
    let crew = ['2 Glaziers', '1 Lead Glazier', '1 Helper'];
    let timeline = '3-5 days';
    
    if (glazingType === 'curtain_wall') {
      baseRate = 85;
      complexity = 'High (Structural)';
      crew = ['3 Glaziers', '1 Structural Specialist', '1 Safety Coordinator'];
      timeline = '7-14 days';
    } else if (glazingType === 'residential') {
      baseRate = 35;
      complexity = 'Medium';
      crew = ['2 Glaziers', '1 Helper'];
      timeline = '2-4 days';
    }

    const glassMultiplier = {
      'tempered': 1.0,
      'laminated': 1.3,
      'insulated': 1.6,
      'low_e': 1.8,
      'security': 2.2
    }[glassType] || 1.0;

    const frameMultiplier = {
      'aluminum': 1.0,
      'steel': 1.4,
      'wood': 1.2,
      'vinyl': 0.8
    }[frameType] || 1.0;

    const materialCost = sqft * baseRate * glassMultiplier * frameMultiplier;
    const laborCost = sqft * 28 * (glazingType === 'curtain_wall' ? 1.8 : 1.0);
    const equipmentCost = 850;
    const permitCost = 450;
    const totalCost = materialCost + laborCost + equipmentCost + permitCost;
    const markup = totalCost * 0.35;
    const finalPrice = totalCost + markup;

    const tools = [
      'Glass handling equipment',
      'Suction cup lifters',
      'Glass cutting tools',
      'Glazing compound applicators',
      'Structural glazing sealants',
      'Measuring and leveling tools',
      'Safety equipment (harnesses, hard hats)',
      'Scaffolding or lift equipment'
    ];

    const materials = [
      `${glassType.charAt(0).toUpperCase() + glassType.slice(1)} glass panels`,
      `${frameType.charAt(0).toUpperCase() + frameType.slice(1)} framing system`,
      'Structural glazing sealant',
      'Weather sealing compounds',
      'Gaskets and seals',
      'Fasteners and anchors',
      'Insulation materials',
      'Flashing and trim pieces'
    ];

    setEstimate({
      scope: glazingScope,
      glazingType: glazingType.replace('_', ' ').toUpperCase(),
      complexity,
      crew,
      tools,
      materials,
      timeline,
      squareFootage: sqft,
      glassType: glassType.toUpperCase(),
      frameType: frameType.toUpperCase(),
      costBreakdown: {
        materials: Math.round(materialCost),
        labor: Math.round(laborCost),
        equipment: equipmentCost,
        permits: permitCost,
        subtotal: Math.round(totalCost),
        markup: Math.round(markup),
        total: Math.round(finalPrice)
      },
      performanceSpecs: [
        'Thermal performance ratings',
        'Sound transmission class (STC)',
        'Impact resistance standards',
        'UV protection specifications',
        'Energy efficiency ratings'
      ],
      installationRequirements: [
        'Structural load calculations required',
        'Weather sealing specifications',
        'Thermal expansion considerations',
        'Safety glass requirements per code',
        'Accessibility compliance verification'
      ]
    });
  };

  if (!visible) return null;

  const containerStyle = {
    background: 'linear-gradient(135deg, rgba(135, 206, 250, 0.1), rgba(70, 130, 180, 0.05))',
    border: '2px solid rgba(135, 206, 250, 0.3)',
    borderRadius: '15px',
    padding: '25px',
    margin: '20px 0',
    color: '#ffffff'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '2px solid rgba(135, 206, 250, 0.3)',
    borderRadius: '8px',
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    marginBottom: '15px'
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #87CEEB, #4682B4)',
    color: '#000000',
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
      <h2 style={{ color: '#87CEEB', marginBottom: '20px', textAlign: 'center' }}>
        🪟 GlazeBox - Professional Glazing Estimator
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#87CEEB' }}>
            Glazing Project Scope:
          </label>
          <textarea
            value={glazingScope}
            onChange={(e) => setGlazingScope(e.target.value)}
            placeholder="Describe the glazing project (storefront, curtain wall, window replacement...)"
            style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#87CEEB' }}>
            Glazing Type:
          </label>
          <select
            value={glazingType}
            onChange={(e) => setGlazingType(e.target.value)}
            style={inputStyle}
          >
            <option value="storefront">Storefront Glazing</option>
            <option value="curtain_wall">Curtain Wall System</option>
            <option value="residential">Residential Windows</option>
            <option value="commercial">Commercial Windows</option>
            <option value="structural">Structural Glazing</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#87CEEB' }}>
            Square Footage:
          </label>
          <input
            type="number"
            value={squareFootage}
            onChange={(e) => setSquareFootage(e.target.value)}
            placeholder="Total glazing area in sq ft"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#87CEEB' }}>
            Glass Type:
          </label>
          <select
            value={glassType}
            onChange={(e) => setGlassType(e.target.value)}
            style={inputStyle}
          >
            <option value="tempered">Tempered Glass</option>
            <option value="laminated">Laminated Glass</option>
            <option value="insulated">Insulated Glass Units</option>
            <option value="low_e">Low-E Coated Glass</option>
            <option value="security">Security Glass</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#87CEEB' }}>
            Frame Material:
          </label>
          <select
            value={frameType}
            onChange={(e) => setFrameType(e.target.value)}
            style={inputStyle}
          >
            <option value="aluminum">Aluminum Frame</option>
            <option value="steel">Steel Frame</option>
            <option value="wood">Wood Frame</option>
            <option value="vinyl">Vinyl Frame</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateGlazingEstimate}
        style={buttonStyle}
        onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.target.style.transform = 'scale(1)'}
      >
        🧮 Generate Glazing Estimate
      </button>

      {estimate && (
        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(135, 206, 250, 0.1)', borderRadius: '10px' }}>
          <h3 style={{ color: '#87CEEB', marginBottom: '20px' }}>📊 Glazing Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#87CEEB', marginBottom: '10px' }}>Project Details</h4>
              <p><strong>Type:</strong> {estimate.glazingType}</p>
              <p><strong>Area:</strong> {estimate.squareFootage} sq ft</p>
              <p><strong>Glass:</strong> {estimate.glassType}</p>
              <p><strong>Frame:</strong> {estimate.frameType}</p>
              <p><strong>Complexity:</strong> {estimate.complexity}</p>
              <p><strong>Timeline:</strong> {estimate.timeline}</p>
            </div>

            <div>
              <h4 style={{ color: '#87CEEB', marginBottom: '10px' }}>Cost Breakdown</h4>
              <p><strong>Materials:</strong> ${estimate.costBreakdown.materials.toLocaleString()}</p>
              <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.toLocaleString()}</p>
              <p><strong>Equipment:</strong> ${estimate.costBreakdown.equipment.toLocaleString()}</p>
              <p><strong>Permits:</strong> ${estimate.costBreakdown.permits.toLocaleString()}</p>
              <p><strong>Subtotal:</strong> ${estimate.costBreakdown.subtotal.toLocaleString()}</p>
              <p><strong>Markup (35%):</strong> ${estimate.costBreakdown.markup.toLocaleString()}</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#87CEEB' }}>
                <strong>Total:</strong> ${estimate.costBreakdown.total.toLocaleString()}
              </p>
            </div>

            <div>
              <h4 style={{ color: '#87CEEB', marginBottom: '10px' }}>Crew Requirements</h4>
              {estimate.crew.map((member, index) => (
                <p key={index}>• {member}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#87CEEB', marginBottom: '10px' }}>Required Tools &amp; Equipment</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {estimate.tools.map((tool, index) => (
                <p key={index} style={{ margin: '5px 0' }}>• {tool}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#87CEEB', marginBottom: '10px' }}>Materials List</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {estimate.materials.map((material, index) => (
                <p key={index} style={{ margin: '5px 0' }}>• {material}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#87CEEB', marginBottom: '10px' }}>Performance Specifications</h4>
            {estimate.performanceSpecs.map((spec, index) => (
              <p key={index} style={{ margin: '5px 0' }}>• {spec}</p>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#87CEEB', marginBottom: '10px' }}>Installation Requirements</h4>
            {estimate.installationRequirements.map((req, index) => (
              <p key={index} style={{ margin: '5px 0' }}>• {req}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlazeBox;
