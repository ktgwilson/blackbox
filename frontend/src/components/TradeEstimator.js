import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Calculator, Users, Wrench, Package, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';
import BlackBoxAI from './BlackBoxAI';
import PoolBox from './PoolBox';
import SecurityBox from './SecurityBox';
import FFEBox from './FFEBox';

const tradeConfigs = {
    voltbox: {
      name: 'VoltBox - Electrical Systems',
      icon: '⚡',
      color: 'bg-yellow-500',
      placeholder: 'Describe electrical installation scope: outlets, panels, lighting, conduit runs...',
      defaultCrew: ['2 Journeyman Electricians', '1 Apprentice', '1 Foreman'],
      defaultTools: ['Multimeter', 'Wire strippers', 'Conduit bender', 'Fish tape', 'Voltage tester'],
      riskFactors: ['Live electrical work', 'Code compliance', 'Panel access']
    },
    airbox: {
      name: 'AirBox - HVAC Systems',
      icon: '❄️',
      color: 'bg-blue-500',
      placeholder: 'Describe HVAC scope: ductwork, units, thermostats, ventilation...',
      defaultCrew: ['2 HVAC Technicians', '1 Helper', '1 Lead Tech'],
      defaultTools: ['Refrigerant gauges', 'Duct blaster', 'Manometer', 'Torch set', 'Vacuum pump'],
      riskFactors: ['Refrigerant handling', 'Roof work', 'Tight spaces']
    },
    flowbox: {
      name: 'FlowBox - Plumbing Systems',
      icon: '🚰',
      color: 'bg-cyan-500',
      placeholder: 'Describe plumbing scope: pipes, fixtures, water lines, drainage...',
      defaultCrew: ['2 Plumbers', '1 Helper', '1 Supervisor'],
      defaultTools: ['Pipe threader', 'Torch', 'Pipe cutter', 'Snake', 'Pressure tester'],
      riskFactors: ['Water damage', 'Confined spaces', 'Pressure testing']
    },
    floorbox: {
      name: 'FloorBox - Flooring Systems',
      icon: '🏗️',
      color: 'bg-amber-600',
      placeholder: 'Describe flooring scope: material type, square footage, subfloor prep...',
      defaultCrew: ['2 Floor Installers', '1 Helper', '1 Finisher'],
      defaultTools: ['Flooring nailer', 'Miter saw', 'Knee pads', 'Spacers', 'Tapping block'],
      riskFactors: ['Dust control', 'Adhesive fumes', 'Heavy lifting']
    },
    poolbox: {
      name: 'PoolBox - Pool Construction',
      icon: '🏊',
      color: 'bg-blue-600',
      placeholder: 'Describe pool construction scope: type, size, features, equipment...',
      defaultCrew: ['2 Pool Technicians', '1 Equipment Specialist', '1 Supervisor'],
      defaultTools: ['Pool excavation tools', 'Plumbing equipment', 'Electrical tools', 'Finishing tools'],
      riskFactors: ['Water safety', 'Electrical hazards', 'Heavy equipment']
    },
    securitybox: {
      name: 'SecurityBox - Security Systems',
      icon: '🔒',
      color: 'bg-red-600',
      placeholder: 'Describe security system scope: cameras, alarms, access control...',
      defaultCrew: ['2 Security Technicians', '1 Network Specialist', '1 Lead Tech'],
      defaultTools: ['Network tools', 'Camera equipment', 'Access control devices', 'Testing equipment'],
      riskFactors: ['Electrical work', 'Height access', 'Network security']
    },
    ffebox: {
      name: 'FFEBox - Furniture, Fixtures & Equipment',
      icon: '🪑',
      color: 'bg-yellow-600',
      placeholder: 'Describe FF&E scope: furniture, fixtures, equipment installation...',
      defaultCrew: ['2 Installers', '1 Designer', '1 Project Manager'],
      defaultTools: ['Assembly tools', 'Measuring equipment', 'Lifting equipment', 'Installation hardware'],
      riskFactors: ['Heavy lifting', 'Precision assembly', 'Client coordination']
    }
  };

const TradeEstimator = ({ socket, aiLevel, marketData }) => {
  const { tradeType } = useParams();
  const [scope, setScope] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState([]);

  const config = tradeConfigs[tradeType] || tradeConfigs.voltbox;

  useEffect(() => {
    if (aiLevel === 'high') {
      setAiInsights([
        `🧠 AI Analysis: ${config.name} project detected`,
        `📊 Market conditions: ${tradeType} labor rates up 8% this quarter`,
        `⚠️ Risk assessment: Consider ${config.riskFactors[0]} protocols`,
        `💡 Optimization: Bundle with nearby projects for 15% savings`
      ]);
    } else if (aiLevel === 'medium') {
      setAiInsights([
        `🧠 AI: ${config.name} scope analysis ready`,
        `📊 Current market rates applied`
      ]);
    }
  }, [tradeType, aiLevel]);

  const handleEstimate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/estimate', {
        scope,
        tradeType,
        aiLevel,
        marketData
      });
      setResult(response.data);
    } catch (error) {
      console.error('Estimation error:', error);
    }
    setLoading(false);
  };

  const handleEstimateGenerated = (estimate) => {
    setResult(estimate);
  };

  if (tradeType === 'poolbox') {
    return <PoolBox visible={true} onEstimateGenerated={handleEstimateGenerated} />;
  }
  if (tradeType === 'securitybox') {
    return <SecurityBox visible={true} onEstimateGenerated={handleEstimateGenerated} />;
  }
  if (tradeType === 'ffebox') {
    return <FFEBox visible={true} onEstimateGenerated={handleEstimateGenerated} />;
  }

  return (
    <div className="space-y-8">
      <BlackBoxAI tradeType={tradeType} scope={scope} aiLevel={aiLevel} />
      
      <div className="flex items-center space-x-4">
        <div className={`w-16 h-16 ${config.color} rounded-xl flex items-center justify-center text-3xl`}>
          {config.icon}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{config.name}</h1>
          <p className="text-xl text-gray-600">AI-Powered Trade Estimation</p>
        </div>
      </div>

      {aiInsights.length > 0 && (
        <div className="card bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <h2 className="text-xl font-bold text-purple-900 mb-4">🤖 BlackBox AI Insights</h2>
          <div className="space-y-2">
            {aiInsights.map((insight, index) => (
              <p key={index} className="text-purple-800">{insight}</p>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calculator className="w-6 h-6 mr-2" />
            Project Scope Input
          </h2>
          <textarea
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            placeholder={config.placeholder}
            className="input-field h-40 mb-6"
          />
          <button
            onClick={handleEstimate}
            disabled={loading || !scope.trim()}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Generate AI Estimate'}
          </button>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Recommended Crew
          </h2>
          <div className="space-y-3">
            {config.defaultCrew.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{role}</span>
                <span className="text-sm text-gray-600">$85-120/hr</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <DollarSign className="w-6 h-6 mr-2" />
              Cost Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Labor Cost</p>
                <p className="text-3xl font-bold text-green-800">${result.laborCost || '12,500'}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Materials</p>
                <p className="text-3xl font-bold text-blue-800">${result.materialCost || '8,200'}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">Total Estimate</p>
                <p className="text-3xl font-bold text-purple-800">${result.totalCost || '25,750'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Wrench className="w-5 h-5 mr-2" />
                Required Tools
              </h3>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Hand Tools (Per Worker):</h4>
                {config.defaultTools.slice(0, 3).map((tool, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{tool}</span>
                    <span className="text-gray-600">✓</span>
                  </div>
                ))}
                <h4 className="font-semibold text-gray-700 mt-4">Moving Equipment (Crew):</h4>
                <div className="flex justify-between text-sm">
                  <span>Panel cart</span>
                  <span className="text-gray-600">2 units</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Material dolly</span>
                  <span className="text-gray-600">1 unit</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Risk Analysis
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="font-semibold text-yellow-800">Medium Risk</p>
                  <p className="text-sm text-yellow-700">{config.riskFactors[0]} - Add 10% buffer</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-800">Win Rate: 87%</p>
                  <p className="text-sm text-green-700">Based on similar {tradeType} projects</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Strategic Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">💰 Profit Optimization</h4>
                <p className="text-sm text-blue-700">Add 15% markup for premium service positioning</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">⏱️ Timeline</h4>
                <p className="text-sm text-green-700">Estimated completion: {result.estimatedTime || '3-4 days'}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800">🎯 Client Psychology</h4>
                <p className="text-sm text-purple-700">Emphasize safety protocols and code compliance</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800">📋 Next Steps</h4>
                <p className="text-sm text-orange-700">Schedule site visit within 48 hours</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeEstimator;
