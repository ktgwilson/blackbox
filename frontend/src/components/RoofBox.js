import React, { useState } from 'react';

const RoofBox = ({ visible }) => {
  const [roofingScope, setRoofingScope] = useState('');
  const [roofType, setRoofType] = useState('shingle');
  const [squareFootage, setSquareFootage] = useState('');
  const [roofPitch, setRoofPitch] = useState('');
  const [layers, setLayers] = useState('1');
  const [estimate, setEstimate] = useState(null);

  const generateRoofingEstimate = () => {
    const sqft = parseFloat(squareFootage) || 2000;
    const pitch = parseFloat(roofPitch) || 6;
    const layerCount = parseInt(layers) || 1;
    
    let baseRate = 8.50;
    let complexity = 'Medium';
    let crew = ['3 Roofers', '1 Lead Roofer', '1 Safety Coordinator'];
    let timeline = '3-5 days';
    
    if (roofType === 'metal') {
      baseRate = 12.50;
      complexity = 'Medium-High';
      crew = ['3 Metal Roofers', '1 Lead Roofer', '1 Safety Coordinator'];
      timeline = '4-6 days';
    } else if (roofType === 'tile') {
      baseRate = 15.00;
      complexity = 'High';
      crew = ['4 Tile Roofers', '1 Lead Roofer', '1 Safety Coordinator', '1 Crane Operator'];
      timeline = '5-8 days';
    } else if (roofType === 'slate') {
      baseRate = 22.00;
      complexity = 'Very High';
      crew = ['4 Slate Specialists', '1 Lead Roofer', '1 Safety Coordinator', '1 Crane Operator'];
      timeline = '7-12 days';
    }

    const pitchMultiplier = pitch > 8 ? 1.4 : pitch > 6 ? 1.2 : 1.0;
    const layerMultiplier = layerCount > 1 ? 1.3 : 1.0;
    const weatherMultiplier = 1.1;

    const materialCost = sqft * baseRate * pitchMultiplier * layerMultiplier;
    const laborCost = sqft * 6.50 * pitchMultiplier * (roofType === 'slate' ? 2.0 : roofType === 'tile' ? 1.6 : 1.0);
    const equipmentCost = roofType === 'tile' || roofType === 'slate' ? 1800 : 950;
    const permitCost = 350;
    const dumpsterCost = layerCount > 1 ? 800 : 400;
    const totalCost = (materialCost + laborCost + equipmentCost + permitCost + dumpsterCost) * weatherMultiplier;
    const markup = totalCost * 0.38;
    const finalPrice = totalCost + markup;

    const tools = [
      'Roofing nailers and compressors',
      'Safety harnesses and fall protection',
      'Roofing ladders and scaffolding',
      'Chalk lines and measuring tools',
      'Roofing hammers and hand tools',
      'Tear-off tools and scrapers',
      roofType === 'metal' ? 'Metal cutting tools' : 'Shingle cutters',
      'Dumpster and disposal equipment'
    ];

    const materials = [
      `${roofType.charAt(0).toUpperCase() + roofType.slice(1)} roofing material`,
      'Underlayment and ice shield',
      'Flashing and drip edge',
      'Ridge caps and hip shingles',
      'Roofing nails and fasteners',
      'Ventilation components',
      'Gutters and downspouts (if included)',
      'Sealants and adhesives'
    ];

    setEstimate({
      scope: roofingScope,
      roofType: roofType.toUpperCase(),
      complexity,
      crew,
      tools,
      materials,
      timeline,
      squareFootage: sqft,
      roofPitch: pitch,
      layers: layerCount,
      costBreakdown: {
        materials: Math.round(materialCost),
        labor: Math.round(laborCost),
        equipment: equipmentCost,
        permits: permitCost,
        disposal: dumpsterCost,
        weatherContingency: Math.round(totalCost * 0.1),
        subtotal: Math.round(totalCost),
        markup: Math.round(markup),
        total: Math.round(finalPrice)
      },
      safetyRequirements: [
        'OSHA fall protection compliance required',
        'Weather monitoring and work stoppage protocols',
        'Proper ladder and scaffolding setup',
        'Safety harness inspection and certification',
        'Emergency response procedures in place'
      ],
      weatherConsiderations: [
        'No work during precipitation or high winds',
        'Temperature restrictions for material installation',
        'UV protection for crew during summer months',
        'Ice and snow removal protocols for winter work',
        'Tarp coverage for incomplete sections'
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
        🏠 RoofBox - Professional Roofing Estimator
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Roofing Project Scope:
          </label>
          <textarea
            value={roofingScope}
            onChange={(e) => setRoofingScope(e.target.value)}
            placeholder="Describe the roofing project (re-roof, repair, new construction...)"
            style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Roof Type:
          </label>
          <select
            value={roofType}
            onChange={(e) => setRoofType(e.target.value)}
            style={inputStyle}
          >
            <option value="shingle">Asphalt Shingles</option>
            <option value="metal">Metal Roofing</option>
            <option value="tile">Clay/Concrete Tile</option>
            <option value="slate">Slate Roofing</option>
            <option value="membrane">Membrane/Flat Roof</option>
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
            placeholder="Total roof area in sq ft"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Roof Pitch (rise/run):
          </label>
          <input
            type="number"
            value={roofPitch}
            onChange={(e) => setRoofPitch(e.target.value)}
            placeholder="e.g., 6 for 6/12 pitch"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', color: '#D2691E' }}>
            Existing Layers to Remove:
          </label>
          <select
            value={layers}
            onChange={(e) => setLayers(e.target.value)}
            style={inputStyle}
          >
            <option value="0">New Construction (No Removal)</option>
            <option value="1">1 Layer Removal</option>
            <option value="2">2 Layers Removal</option>
            <option value="3">3+ Layers Removal</option>
          </select>
        </div>
      </div>

      <button
        onClick={generateRoofingEstimate}
        style={buttonStyle}
        onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={e => e.target.style.transform = 'scale(1)'}
      >
        🧮 Generate Roofing Estimate
      </button>

      {estimate && (
        <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(139, 69, 19, 0.1)', borderRadius: '10px' }}>
          <h3 style={{ color: '#D2691E', marginBottom: '20px' }}>📊 Roofing Estimate Results</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Project Details</h4>
              <p><strong>Type:</strong> {estimate.roofType}</p>
              <p><strong>Area:</strong> {estimate.squareFootage} sq ft</p>
              <p><strong>Pitch:</strong> {estimate.roofPitch}/12</p>
              <p><strong>Layers:</strong> {estimate.layers} to remove</p>
              <p><strong>Complexity:</strong> {estimate.complexity}</p>
              <p><strong>Timeline:</strong> {estimate.timeline}</p>
            </div>

            <div>
              <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Cost Breakdown</h4>
              <p><strong>Materials:</strong> ${estimate.costBreakdown.materials.toLocaleString()}</p>
              <p><strong>Labor:</strong> ${estimate.costBreakdown.labor.toLocaleString()}</p>
              <p><strong>Equipment:</strong> ${estimate.costBreakdown.equipment.toLocaleString()}</p>
              <p><strong>Permits:</strong> ${estimate.costBreakdown.permits.toLocaleString()}</p>
              <p><strong>Disposal:</strong> ${estimate.costBreakdown.disposal.toLocaleString()}</p>
              <p><strong>Weather Contingency:</strong> ${estimate.costBreakdown.weatherContingency.toLocaleString()}</p>
              <p><strong>Subtotal:</strong> ${estimate.costBreakdown.subtotal.toLocaleString()}</p>
              <p><strong>Markup (38%):</strong> ${estimate.costBreakdown.markup.toLocaleString()}</p>
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
            <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Safety Requirements</h4>
            {estimate.safetyRequirements.map((req, index) => (
              <p key={index} style={{ margin: '5px 0' }}>• {req}</p>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#D2691E', marginBottom: '10px' }}>Weather Considerations</h4>
            {estimate.weatherConsiderations.map((consideration, index) => (
              <p key={index} style={{ margin: '5px 0' }}>• {consideration}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoofBox;
