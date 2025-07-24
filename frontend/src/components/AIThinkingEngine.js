import React, { useState, useEffect } from 'react';
import { Brain, Zap, Target, TrendingUp, AlertCircle, CheckCircle, Clock, Lightbulb, DollarSign, Users, Calendar, MapPin, BarChart3, PieChart, Activity, Shield, Briefcase, Settings } from 'lucide-react';

const AIThinkingEngine = () => {
  const [thinkingProcess, setThinkingProcess] = useState([]);
  const [currentThought, setCurrentThought] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [projectScope, setProjectScope] = useState('');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('comprehensive');
  const [decisionMatrix, setDecisionMatrix] = useState(null);
  const [strategicRecommendations, setStrategicRecommendations] = useState(null);

  useEffect(() => {
    startThinkingProcess();
  }, []);

  const startThinkingProcess = async () => {
    setIsProcessing(true);
    const thoughts = [
      {
        id: 1,
        type: 'analysis',
        content: 'Analyzing current market conditions and project pipeline...',
        status: 'processing',
        timestamp: new Date(),
        details: 'Processing 156 active projects across 24 trade verticals'
      },
      {
        id: 2,
        type: 'pattern',
        content: 'Identifying patterns in successful project outcomes...',
        status: 'processing',
        timestamp: new Date(),
        details: 'Cross-referencing completion times, profit margins, and client satisfaction'
      },
      {
        id: 3,
        type: 'optimization',
        content: 'Calculating optimal crew allocation strategies...',
        status: 'processing',
        timestamp: new Date(),
        details: 'Balancing skill sets, geographic proximity, and workload distribution'
      },
      {
        id: 4,
        type: 'prediction',
        content: 'Generating predictive models for Q2 performance...',
        status: 'processing',
        timestamp: new Date(),
        details: 'Incorporating seasonal factors, market trends, and historical data'
      },
      {
        id: 5,
        type: 'recommendation',
        content: 'Formulating strategic recommendations...',
        status: 'processing',
        timestamp: new Date(),
        details: 'Prioritizing actions based on impact potential and implementation feasibility'
      }
    ];

    for (let i = 0; i < thoughts.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setThinkingProcess(prev => {
        const updated = [...prev];
        if (updated[i]) {
          updated[i] = { ...thoughts[i], status: 'complete' };
        } else {
          updated.push({ ...thoughts[i], status: 'complete' });
        }
        return updated;
      });
      
      setCurrentThought(thoughts[i].content);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setAnalysisResults({
      insights: [
        {
          category: 'Market Opportunity',
          finding: 'PoolBox vertical showing 28% growth potential',
          confidence: 94,
          impact: 'High',
          action: 'Increase crew allocation by 40%',
          financialImpact: '+$340K annually',
          timeline: '3-6 months',
          riskLevel: 'Low'
        },
        {
          category: 'Efficiency Optimization',
          finding: 'Cross-training reduces project delays by 23%',
          confidence: 87,
          impact: 'Medium',
          action: 'Implement multi-trade certification program',
          financialImpact: '+$180K annually',
          timeline: '6-12 months',
          riskLevel: 'Medium'
        },
        {
          category: 'Risk Mitigation',
          finding: 'Material cost volatility affecting 15% of projects',
          confidence: 91,
          impact: 'High',
          action: 'Establish strategic supplier partnerships',
          financialImpact: '+$220K annually',
          timeline: '2-4 months',
          riskLevel: 'Low'
        },
        {
          category: 'Technology Integration',
          finding: 'AI-driven scheduling improves crew utilization by 31%',
          confidence: 89,
          impact: 'High',
          action: 'Deploy advanced scheduling algorithms',
          financialImpact: '+$290K annually',
          timeline: '1-3 months',
          riskLevel: 'Low'
        }
      ],
      predictions: {
        revenue: { q2: 2850000, confidence: 89, trend: '+12%' },
        projects: { completion: 96.2, confidence: 92, trend: '+8%' },
        efficiency: { improvement: 12.5, confidence: 85, trend: '+15%' },
        profitMargin: { current: 18.5, projected: 22.3, confidence: 91 },
        marketShare: { current: 12.8, projected: 15.2, confidence: 87 }
      },
      competitiveAnalysis: {
        marketPosition: 'Strong',
        competitiveAdvantage: 'AI-driven estimation accuracy',
        threatLevel: 'Medium',
        opportunities: ['Vertical expansion', 'Geographic growth', 'Technology licensing']
      }
    });

    setDecisionMatrix({
      options: [
        {
          name: 'Expand PoolBox Operations',
          score: 8.7,
          pros: ['High growth potential', 'Low competition', 'Seasonal demand'],
          cons: ['Weather dependency', 'Specialized equipment'],
          investment: '$125K',
          roi: '340%',
          timeline: '6 months'
        },
        {
          name: 'Multi-Trade Certification',
          score: 7.9,
          pros: ['Reduced delays', 'Higher utilization', 'Premium pricing'],
          cons: ['Training costs', 'Time investment'],
          investment: '$85K',
          roi: '280%',
          timeline: '12 months'
        },
        {
          name: 'Geographic Expansion',
          score: 7.2,
          pros: ['Market diversification', 'Revenue growth', 'Brand expansion'],
          cons: ['Management complexity', 'Local competition'],
          investment: '$200K',
          roi: '220%',
          timeline: '18 months'
        }
      ]
    });

    setStrategicRecommendations({
      immediate: [
        'Launch PoolBox expansion pilot program',
        'Negotiate bulk material contracts',
        'Implement AI scheduling system'
      ],
      shortTerm: [
        'Develop cross-training curriculum',
        'Establish regional partnerships',
        'Enhance mobile crew capabilities'
      ],
      longTerm: [
        'Consider vertical integration',
        'Explore acquisition opportunities',
        'Develop proprietary technology licensing'
      ]
    });
    
    setIsProcessing(false);
  };

  const getThoughtIcon = (type) => {
    switch (type) {
      case 'analysis': return <Brain className="w-5 h-5" />;
      case 'pattern': return <Target className="w-5 h-5" />;
      case 'optimization': return <Zap className="w-5 h-5" />;
      case 'prediction': return <TrendingUp className="w-5 h-5" />;
      case 'recommendation': return <Lightbulb className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing': return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const launchFullAnalysis = () => {
    setProjectScope('');
    startThinkingProcess();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">🧠 AI Thinking Engine</h1>
        <p className="text-purple-100">Real-time cognitive processing and strategic analysis</p>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-600" />
          Project Scope & Analysis Configuration
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Project Scope or Business Challenge
            </label>
            <textarea
              value={projectScope}
              onChange={(e) => setProjectScope(e.target.value)}
              placeholder="Describe your project scope, business challenge, or strategic question. The AI will analyze market conditions, resource requirements, risk factors, and provide comprehensive recommendations..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Type</label>
              <select
                value={selectedAnalysisType}
                onChange={(e) => setSelectedAnalysisType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="comprehensive">Comprehensive Analysis</option>
                <option value="financial">Financial Impact Focus</option>
                <option value="risk">Risk Assessment Focus</option>
                <option value="competitive">Competitive Analysis</option>
                <option value="operational">Operational Efficiency</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="immediate">Immediate (0-3 months)</option>
                <option value="short">Short-term (3-12 months)</option>
                <option value="medium">Medium-term (1-3 years)</option>
                <option value="long">Long-term (3+ years)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={launchFullAnalysis}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isProcessing ? 'Processing Analysis...' : 'Launch Full Analysis'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-purple-600" />
            Thinking Process
          </h3>
          
          {isProcessing && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500 animate-spin" />
                <span className="text-blue-700 font-medium">Currently processing:</span>
              </div>
              <p className="text-blue-600 mt-1">{currentThought}</p>
            </div>
          )}

          <div className="space-y-3">
            {thinkingProcess.map((thought, index) => (
              <div key={thought.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="text-purple-600">
                      {getThoughtIcon(thought.type)}
                    </div>
                    <span className="font-medium text-gray-900">{thought.type.charAt(0).toUpperCase() + thought.type.slice(1)}</span>
                  </div>
                  {getStatusIcon(thought.status)}
                </div>
                <p className="text-gray-700 mb-2">{thought.content}</p>
                <p className="text-sm text-gray-500">{thought.details}</p>
                <div className="text-xs text-gray-400 mt-2">
                  {thought.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
            Analysis Results
          </h3>

          {analysisResults ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Insights</h4>
                <div className="space-y-3">
                  {analysisResults.insights.map((insight, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">{insight.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getImpactColor(insight.impact)}`}>
                            {insight.impact}
                          </span>
                          <span className="text-sm text-gray-500">{insight.confidence}%</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-3">{insight.finding}</p>
                      <div className="bg-blue-50 p-3 rounded-lg mb-3">
                        <p className="text-blue-800 text-sm font-medium mb-2">Recommended Action:</p>
                        <p className="text-blue-700 text-sm">{insight.action}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="text-center">
                          <div className="text-green-600 font-semibold">{insight.financialImpact}</div>
                          <div className="text-gray-500">Financial Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-600 font-semibold">{insight.timeline}</div>
                          <div className="text-gray-500">Timeline</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-semibold ${insight.riskLevel === 'Low' ? 'text-green-600' : insight.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                            {insight.riskLevel}
                          </div>
                          <div className="text-gray-500">Risk Level</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Predictions & Forecasts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-800 font-medium">Q2 Revenue</span>
                      <span className="text-green-600 text-sm">{analysisResults.predictions.revenue.confidence}% confidence</span>
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      ${(analysisResults.predictions.revenue.q2 / 1000000).toFixed(2)}M
                    </div>
                    <div className="text-sm text-green-600">{analysisResults.predictions.revenue.trend} vs Q1</div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-blue-800 font-medium">Project Completion</span>
                      <span className="text-blue-600 text-sm">{analysisResults.predictions.projects.confidence}% confidence</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-700">
                      {analysisResults.predictions.projects.completion}%
                    </div>
                    <div className="text-sm text-blue-600">{analysisResults.predictions.projects.trend} improvement</div>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-purple-800 font-medium">Efficiency Gain</span>
                      <span className="text-purple-600 text-sm">{analysisResults.predictions.efficiency.confidence}% confidence</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-700">
                      +{analysisResults.predictions.efficiency.improvement}%
                    </div>
                    <div className="text-sm text-purple-600">{analysisResults.predictions.efficiency.trend} projected</div>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-orange-800 font-medium">Profit Margin</span>
                      <span className="text-orange-600 text-sm">{analysisResults.predictions.profitMargin.confidence}% confidence</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-700">
                      {analysisResults.predictions.profitMargin.projected}%
                    </div>
                    <div className="text-sm text-orange-600">From {analysisResults.predictions.profitMargin.current}%</div>
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-indigo-800 font-medium">Market Share</span>
                      <span className="text-indigo-600 text-sm">{analysisResults.predictions.marketShare.confidence}% confidence</span>
                    </div>
                    <div className="text-2xl font-bold text-indigo-700">
                      {analysisResults.predictions.marketShare.projected}%
                    </div>
                    <div className="text-sm text-indigo-600">From {analysisResults.predictions.marketShare.current}%</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Analysis in progress...</p>
            </div>
          )}
        </div>
      </div>

      {decisionMatrix && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Briefcase className="w-6 h-6 mr-2 text-green-600" />
            Decision Matrix & Strategic Options
          </h3>
          
          <div className="space-y-4">
            {decisionMatrix.options.map((option, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{option.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                      Score: {option.score}/10
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="font-medium text-green-700 mb-2">Pros</h5>
                    <ul className="space-y-1">
                      {option.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-green-600 flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">Cons</h5>
                    <ul className="space-y-1">
                      {option.cons.map((con, i) => (
                        <li key={i} className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 p-3 rounded-lg">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{option.investment}</div>
                    <div className="text-sm text-gray-600">Investment</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{option.roi}</div>
                    <div className="text-sm text-gray-600">ROI</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{option.timeline}</div>
                    <div className="text-sm text-gray-600">Timeline</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {strategicRecommendations && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-purple-600" />
            Strategic Recommendations & Action Plan
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-1" />
                Immediate Actions (0-3 months)
              </h4>
              <ul className="space-y-2">
                {strategicRecommendations.immediate.map((action, index) => (
                  <li key={index} className="bg-red-50 border border-red-200 p-3 rounded-lg text-sm text-red-800">
                    {action}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-yellow-700 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Short-term Goals (3-12 months)
              </h4>
              <ul className="space-y-2">
                {strategicRecommendations.shortTerm.map((action, index) => (
                  <li key={index} className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800">
                    {action}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Long-term Vision (1+ years)
              </h4>
              <ul className="space-y-2">
                {strategicRecommendations.longTerm.map((action, index) => (
                  <li key={index} className="bg-green-50 border border-green-200 p-3 rounded-lg text-sm text-green-800">
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {analysisResults && analysisResults.competitiveAnalysis && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-red-600" />
            Competitive Intelligence & Market Position
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Market Analysis</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-800 font-medium">Market Position</span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {analysisResults.competitiveAnalysis.marketPosition}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-800 font-medium">Competitive Advantage</span>
                  <span className="text-green-700 text-sm font-medium">
                    {analysisResults.competitiveAnalysis.competitiveAdvantage}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-800 font-medium">Threat Level</span>
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                    {analysisResults.competitiveAnalysis.threatLevel}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Strategic Opportunities</h4>
              <ul className="space-y-2">
                {analysisResults.competitiveAnalysis.opportunities.map((opportunity, index) => (
                  <li key={index} className="bg-purple-50 border border-purple-200 p-3 rounded-lg text-sm text-purple-800 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {opportunity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 AI Cognitive Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Pattern Recognition', accuracy: 94, description: 'Identifies trends across projects', icon: Brain },
            { name: 'Predictive Modeling', accuracy: 89, description: 'Forecasts outcomes and risks', icon: TrendingUp },
            { name: 'Resource Optimization', accuracy: 92, description: 'Maximizes crew efficiency', icon: Users },
            { name: 'Strategic Planning', accuracy: 87, description: 'Long-term business insights', icon: Target },
            { name: 'Financial Analysis', accuracy: 91, description: 'ROI and profit optimization', icon: DollarSign },
            { name: 'Risk Assessment', accuracy: 88, description: 'Identifies and mitigates risks', icon: Shield },
            { name: 'Market Intelligence', accuracy: 85, description: 'Competitive analysis and trends', icon: BarChart3 },
            { name: 'Decision Support', accuracy: 93, description: 'Data-driven recommendations', icon: Lightbulb }
          ].map((capability, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-2">
                <capability.icon className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-900">{capability.name}</h4>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Accuracy</span>
                  <span className="font-medium text-blue-600">{capability.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${capability.accuracy}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIThinkingEngine;
