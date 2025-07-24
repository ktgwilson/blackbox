import React, { useState } from 'react';

const CarpentryBox = ({ visible }) => {
  const [carpentryScope, setCarpentryScope] = useState('');
  const [projectType, setProjectType] = useState('trim_work');
  const [linearFootage, setLinearFootage] = useState('');
  const [materialType, setMaterialType] = useState('pine');
  const [complexity, setComplexity] = useState('standard');
  const [estimate, setEstimate] = useState(null);

  const generateCarpentryEstimate = () => {
    const linFt = parseFloat(linearFootage) || 100;
    
    let baseRate = 15;
    let difficultyLevel = 'Medium';
    let crew = ['2 Carpenters', '1 Helper'];
    let timeline = '3-5 days';
    
    if (projectType === 'cabinetry') {
      baseRate = 45;
      difficultyLevel = 'High (Custom)';
      crew = ['2 Cabinet Makers', '1 Finisher'];
      timeline = '7-14 days';
    } else if (projectType === 'millwork') {
      baseRate = 65;
      difficultyLevel = 'Very High (Architectural)';
      crew = ['2 Millwork Specialists', '1 Finisher', '1 Helper'];
      timeline = '10-20 days';
    } else if (projectType === 'furniture') {
      baseRate = 85;
      difficultyLevel = 'Very High (Custom)';
      crew = ['1 Furniture Maker', '1 Finisher'];
      timeline = '14-30 days';
    }

    const materialMultiplier = {
      'pine': 1.0,
      'oak': 2.2,
      'maple': 2.8,
      'cherry': 3.5,
      'walnut': 4.2,
      'exotic': 6.0
    }[materialType] || 1.0;

    const complexityMultiplier = {
      'simple': 0.8,
      'standard': 1.0,
      'complex': 1.5,
      'custom': 2.2
    }[complexity] || 1.0;

    const materialCost = linFt * baseRate * materialMultiplier * complexityMultiplier;
    const laborCost = linFt * 25 * complexityMultiplier;
    const finishingCost = materialCost * 0.3;
    const hardwareCost = linFt * 8;
    const totalCost = materialCost + laborCost + finishingCost + hardwareCost;
    const markup = totalCost * 0.42;
    const finalPrice = totalCost + markup;

    const tools = [
      'Hand saws and power saws',
      'Chisels and hand planes',
      'Router and router bits',
      'Drill and driver bits',
      'Measuring and marking tools',
      'Clamps and vises',
      'Sandpaper and finishing supplies',
      'Safety equipment'
    ];

    const materials = [
      `${materialType.charAt(0).toUpperCase() + materialType.slice(1)} lumber/boards`,
      'Wood glue and adhesives',
      'Screws, nails, and fasteners',
      'Hardware (hinges, pulls, etc.)',
      'Sandpaper (various grits)',
      'Wood stain or paint',
      'Polyurethane or finish',
      'Wood filler and putty'
    ];

    setEstimate({
      scope: carpentryScope,
      projectType: projectType.replace('_', ' ').toUpperCase(),
      difficultyLevel,
      crew,
      tools,
      materials,
      timeline,
      linearFootage: linFt,
      materialType: materialType.toUpperCase(),
      complexity: complexity.toUpperCase(),
      costBreakdown: {
        materials: Math.round(materialCost),
        labor: Math.round(laborCost),
        finishing: Math.round(finishingCost),
        hardware: Math.round(hardwareCost),
        subtotal: Math.round(totalCost),
        markup: Math.round(markup),
        total: Math.round(finalPrice)
      },
      qualityStandards: [
        'Precision joinery and tight tolerances',
        'Smooth sanding to 220 grit minimum',
        'Professional grade finish application',
        'Hardware alignment and adjustment',
        'Final inspection and touch-up'
      ],
      safetyRequirements: [
        'Eye and hearing protection required',
        'Dust collection and respiratory protection',
        'Proper tool handling and maintenance',
        'Sharp tool safety protocols',
        'Workshop ventilation requirements'
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
        🔨 CarpentryBox - Carpentry &amp; Millwork Estimator
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Carpentry Project Scope:
          </label>
          <textarea
            value={carpentryScope}
            onChange={(e) => setCarpentryScope(e.target.value)}
            placeholder="Describe the carpentry project (trim, cabinetry, millwork, custom furniture...)"
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
            <option value="trim_work">Trim &amp; Molding</option>
            <option value="cabinetry">Custom Cabinetry</option>
            <option value="millwork">Architectural Millwork</option>
            <option value="furniture">Custom Furniture</option>
            <option value="built_ins">Built-in Storage</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Linear Footage:
          </label>
          <input
            type="number"
            value={linearFootage}
            onChange={(e) => setLinearFootage(e.target.value)}
            placeholder="Total linear feet"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Material Type:
          </label>
          <select
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            style={inputStyle}
          >
            <option value="pine">Pine (Budget)</option>
            <option value="oak">Oak (Standard)</option>
            <option value="maple">Maple (Premium)</option>
            <option value="cherry">Cherry (High-End)</option>
            <option value="walnut">Walnut (Luxury)</option>
            <option value="exotic">Exotic Woods</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Complexity Level:
          </label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            style={inputStyle}
          >
            <option value="simple">Simple/Basic</option>
            <option value="standard">Standard Detail</option>
            <option value="complex">Complex Design</option>
            <option value="custom">Custom/Artistic</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateCarpentryEstimate}
        style={buttonStyle}
        onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.target.style.transform = 'scale(1)'}
      >
        🧮 Generate Carpentry Estimate
      </button>

      {estimate && (
        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(139, 69, 19, 0.1)', borderRadius: '10px' }}>
          <h3 style={{ color: '#D2691E', marginBottom: '20px' }}>📊 Carpentry Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Project Details</h4>
              <p><strong>Type:</strong> {estimate.projectType}</p>
              <p><strong>Linear Footage:</strong> {estimate.linearFootage} ft</p>
              <p><strong>Material:</strong> {estimate.materialType}</p>
              <p><strong>Complexity:</strong> {estimate.complexity}</p>
              <p><strong>Difficulty:</strong> {estimate.difficultyLevel}</p>
              <p><strong>Timeline:</strong> {estimate.timeline}</p>
            </div>

            <div>
              <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Cost Breakdown</h4>
              <p><strong>Materials:</strong> ${estimate.costBreakdown.materials.toLocaleString()}</p>
              <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.toLocaleString()}</p>
              <p><strong>Finishing:</strong> ${estimate.costBreakdown.finishing.toLocaleString()}</p>
              <p><strong>Hardware:</strong> ${estimate.costBreakdown.hardware.toLocaleString()}</p>
              <p><strong>Subtotal:</strong> ${estimate.costBreakdown.subtotal.toLocaleString()}</p>
              <p><strong>Markup (42%):</strong> ${estimate.costBreakdown.markup.toLocaleString()}</p>
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
            <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Required Tools &amp; Equipment</h4>
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
            <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Quality Standards</h4>
            {estimate.qualityStandards.map((standard, index) => (
              <p key={index} style={{ margin: '5px 0' }}>• {standard}</p>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Safety Requirements</h4>
            {estimate.safetyRequirements.map((req, index) => (
              <p key={index} style={{ margin: '5px 0' }}>• {req}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarpentryBox;
