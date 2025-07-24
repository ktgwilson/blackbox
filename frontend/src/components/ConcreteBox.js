import React, { useState } from 'react';

const ConcreteBox = ({ visible }) => {
  const [concreteScope, setConcreteScope] = useState('');
  const [projectType, setProjectType] = useState('slab');
  const [squareFootage, setSquareFootage] = useState('');
  const [thickness, setThickness] = useState('4');
  const [concreteGrade, setConcreteGrade] = useState('3000psi');
  const [estimate, setEstimate] = useState(null);

  const generateConcreteEstimate = () => {
    const sqft = parseFloat(squareFootage) || 500;
    const thick = parseFloat(thickness) || 4;
    
    let baseRate = 6.50;
    let complexity = 'Medium';
    let crew = ['2 Concrete Finishers', '1 Laborer', '1 Foreman'];
    let timeline = '2-3 days';
    
    if (projectType === 'foundation') {
      baseRate = 12.00;
      complexity = 'High (Structural)';
      crew = ['3 Concrete Finishers', '2 Laborers', '1 Foreman', '1 Pump Operator'];
      timeline = '3-5 days';
    } else if (projectType === 'decorative') {
      baseRate = 18.00;
      complexity = 'High (Specialty)';
      crew = ['2 Decorative Specialists', '1 Finisher', '1 Helper'];
      timeline = '4-7 days';
    }

    const gradeMultiplier = {
      '2500psi': 1.0,
      '3000psi': 1.1,
      '4000psi': 1.3,
      '5000psi': 1.5
    }[concreteGrade] || 1.1;

    const thicknessMultiplier = thick / 4;
    const volume = (sqft * thick) / 12 / 27; // cubic yards

    const materialCost = volume * 120 * gradeMultiplier;
    const laborCost = sqft * baseRate * thicknessMultiplier;
    const equipmentCost = projectType === 'foundation' ? 1200 : 600;
    const permitCost = projectType === 'foundation' ? 450 : 0;
    const totalCost = materialCost + laborCost + equipmentCost + permitCost;
    const markup = totalCost * 0.30;
    const finalPrice = totalCost + markup;

    const tools = [
      'Concrete screeds and floats',
      'Finishing trowels and edgers',
      'Concrete vibrators',
      'Bull floats and darbies',
      'Knee boards and hand tools',
      'Concrete mixer or pump truck',
      'Forms and stakes',
      'Curing compounds and sealers'
    ];

    const materials = [
      `${volume.toFixed(1)} cubic yards ${concreteGrade} concrete`,
      'Reinforcement (rebar or mesh)',
      'Forms and form release agent',
      'Vapor barrier (if required)',
      'Control joint materials',
      'Curing compound',
      'Sealer (if specified)',
      'Expansion joint materials'
    ];

    setEstimate({
      scope: concreteScope,
      projectType: projectType.toUpperCase(),
      complexity,
      crew,
      tools,
      materials,
      timeline,
      squareFootage: sqft,
      thickness: thick,
      volume: volume.toFixed(1),
      concreteGrade,
      costBreakdown: {
        materials: Math.round(materialCost),
        labor: Math.round(laborCost),
        equipment: equipmentCost,
        permits: permitCost,
        subtotal: Math.round(totalCost),
        markup: Math.round(markup),
        total: Math.round(finalPrice)
      },
      qualitySpecs: [
        'Concrete strength testing required',
        'Proper curing time (minimum 28 days)',
        'Weather protection during placement',
        'Slump test verification',
        'Air content testing (if specified)'
      ],
      safetyRequirements: [
        'Chemical burn protection required',
        'Proper lifting techniques for heavy materials',
        'Slip and fall prevention on wet surfaces',
        'Eye protection from concrete splash',
        'Respiratory protection from silica dust'
      ]
    });
  };

  if (!visible) return null;

  const containerStyle = {
    background: 'linear-gradient(135deg, rgba(128, 128, 128, 0.1), rgba(105, 105, 105, 0.05))',
    border: '2px solid rgba(128, 128, 128, 0.3)',
    borderRadius: '15px',
    padding: '25px',
    margin: '20px 0',
    color: '#ffffff'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '2px solid rgba(128, 128, 128, 0.3)',
    borderRadius: '8px',
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    marginBottom: '15px'
  };

  const buttonStyle = {
    background: 'linear-gradient(45deg, #808080, #696969)',
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
      <h2 style={{ color: '#A9A9A9', marginBottom: '20px', textAlign: 'center' }}>
        🏗️ ConcreteBox - Professional Concrete Estimator
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#A9A9A9' }}>
            Concrete Project Scope:
          </label>
          <textarea
            value={concreteScope}
            onChange={(e) => setConcreteScope(e.target.value)}
            placeholder="Describe the concrete project (foundation, slab, driveway, decorative...)"
            style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#A9A9A9' }}>
            Project Type:
          </label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            style={inputStyle}
          >
            <option value="slab">Concrete Slab</option>
            <option value="foundation">Foundation</option>
            <option value="driveway">Driveway</option>
            <option value="sidewalk">Sidewalk</option>
            <option value="decorative">Decorative Concrete</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#A9A9A9' }}>
            Square Footage:
          </label>
          <input
            type="number"
            value={squareFootage}
            onChange={(e) => setSquareFootage(e.target.value)}
            placeholder="Total concrete area in sq ft"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#A9A9A9' }}>
            Thickness (inches):
          </label>
          <input
            type="number"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            placeholder="Concrete thickness"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#A9A9A9' }}>
            Concrete Grade:
          </label>
          <select
            value={concreteGrade}
            onChange={(e) => setConcreteGrade(e.target.value)}
            style={inputStyle}
          >
            <option value="2500psi">2500 PSI (Light Duty)</option>
            <option value="3000psi">3000 PSI (Standard)</option>
            <option value="4000psi">4000 PSI (Heavy Duty)</option>
            <option value="5000psi">5000 PSI (High Strength)</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateConcreteEstimate}
        style={buttonStyle}
        onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.target.style.transform = 'scale(1)'}
      >
        🧮 Generate Concrete Estimate
      </button>

      {estimate && (
        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(128, 128, 128, 0.1)', borderRadius: '10px' }}>
          <h3 style={{ color: '#A9A9A9', marginBottom: '20px' }}>📊 Concrete Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#A9A9A9', marginBottom: '10px' }}>Project Details</h4>
              <p><strong>Type:</strong> {estimate.projectType}</p>
              <p><strong>Area:</strong> {estimate.squareFootage} sq ft</p>
              <p><strong>Thickness:</strong> {estimate.thickness} inches</p>
              <p><strong>Volume:</strong> {estimate.volume} cubic yards</p>
              <p><strong>Grade:</strong> {estimate.concreteGrade}</p>
              <p><strong>Timeline:</strong> {estimate.timeline}</p>
            </div>

            <div>
              <h4 style={{ color: '#A9A9A9', marginBottom: '10px' }}>Cost Breakdown</h4>
              <p><strong>Materials:</strong> ${estimate.costBreakdown.materials.toLocaleString()}</p>
              <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.toLocaleString()}</p>
              <p><strong>Equipment:</strong> ${estimate.costBreakdown.equipment.toLocaleString()}</p>
              <p><strong>Permits:</strong> ${estimate.costBreakdown.permits.toLocaleString()}</p>
              <p><strong>Subtotal:</strong> ${estimate.costBreakdown.subtotal.toLocaleString()}</p>
              <p><strong>Markup (30%):</strong> ${estimate.costBreakdown.markup.toLocaleString()}</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#A9A9A9' }}>
                <strong>Total:</strong> ${estimate.costBreakdown.total.toLocaleString()}
              </p>
            </div>

            <div>
              <h4 style={{ color: '#A9A9A9', marginBottom: '10px' }}>Crew Requirements</h4>
              {estimate.crew.map((member, index) => (
                <p key={index}>• {member}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#A9A9A9', marginBottom: '10px' }}>Required Tools &amp; Equipment</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {estimate.tools.map((tool, index) => (
                <p key={index} style={{ margin: '5px 0' }}>• {tool}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#A9A9A9', marginBottom: '10px' }}>Materials List</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {estimate.materials.map((material, index) => (
                <p key={index} style={{ margin: '5px 0' }}>• {material}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#A9A9A9', marginBottom: '10px' }}>Quality Specifications</h4>
            {estimate.qualitySpecs.map((spec, index) => (
              <p key={index} style={{ margin: '5px 0' }}>• {spec}</p>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#A9A9A9', marginBottom: '10px' }}>Safety Requirements</h4>
            {estimate.safetyRequirements.map((req, index) => (
              <p key={index} style={{ margin: '5px 0' }}>• {req}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConcreteBox;
