import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Users, Clock, Target, BarChart3, PieChart, Activity, Zap, X } from 'lucide-react';

const BlackBoxAI = ({ tradeType, scope, aiLevel = 'medium' }) => {
  const [insights, setInsights] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [marketData, setMarketData] = useState({});
  const [profitAnalysis, setProfitAnalysis] = useState({});
  const [riskAssessment, setRiskAssessment] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (scope && scope.length > 10) {
      setIsFullScreen(true);
      generateInsights();
    }
  }, [scope, tradeType, aiLevel]);

  const generateInsights = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const baseInsights = [
        {
          title: 'Market Opportunity',
          content: 'Current market conditions favor premium pricing with 15% higher margins than Q3 average.',
          confidence: 92,
          impact: 'high'
        },
        {
          title: 'Resource Optimization',
          content: 'Crew efficiency can be improved by 12% with optimized scheduling and route planning.',
          confidence: 87,
          impact: 'medium'
        },
        {
          title: 'Risk Mitigation',
          content: 'Weather patterns suggest 85% probability of favorable conditions for next 7 days.',
          confidence: 94,
          impact: 'low'
        }
      ];

      if (aiLevel === 'high') {
        setInsights([
          ...baseInsights,
          {
            title: 'Predictive Analytics',
            content: 'AI forecasting indicates 23% increase in demand for this trade type over next quarter.',
            confidence: 89,
            impact: 'high'
          },
          {
            title: 'Competitive Intelligence',
            content: 'Market analysis shows opportunity to capture additional 18.5% market share with strategic positioning.',
            confidence: 91,
            impact: 'high'
          }
        ]);
      } else if (aiLevel === 'medium') {
        setInsights([
          ...baseInsights,
          {
            title: 'Cost Optimization',
            content: 'Material procurement timing could reduce costs by $3,200 on average project.',
            confidence: 85,
            impact: 'medium'
          }
        ]);
      } else {
        setInsights(baseInsights.slice(0, 2));
      }

      setMarketData({
        laborRates: {
          current: 85,
          regional: 78,
          change: '+3.2%'
        },
        demandIndex: 78,
        competitionLevel: 'moderate',
        seasonalFactor: 1.15,
        materialCosts: {
          volatility: 'low'
        }
      });

      setProfitAnalysis({
        grossMargin: 28,
        netMargin: 18,
        optimalPricing: 52000,
        competitivePosition: 'strong',
        riskAdjustedMargin: 24
      });

      setRiskAssessment({
        overall: 'medium',
        factors: [
          { name: 'Weather Dependency', level: 'low', impact: 15 },
          { name: 'Material Availability', level: 'medium', impact: 25 },
          { name: 'Labor Shortage', level: 'high', impact: 35 },
          { name: 'Permit Delays', level: 'low', impact: 10 }
        ],
        mitigation: 'Implement flexible scheduling and maintain 20% buffer for critical path activities.'
      });

      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const getStatusIcon = (value, threshold) => {
    if (value >= threshold + 10) return '🟢';
    if (value >= threshold) return '🟡';
    return '🔴';
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getIntelligenceData = () => {
    switch (aiLevel) {
      case 'high':
        return {
          dataPoints: 47,
          analysisDepth: 'Comprehensive',
          predictionAccuracy: '94%',
          marketCoverage: 'Global',
          riskFactors: 12,
          profitOptimization: 'Advanced'
        };
      case 'medium':
        return {
          dataPoints: 28,
          analysisDepth: 'Standard',
          predictionAccuracy: '87%',
          marketCoverage: 'Regional',
          riskFactors: 8,
          profitOptimization: 'Standard'
        };
      default:
        return {
          dataPoints: 15,
          analysisDepth: 'Basic',
          predictionAccuracy: '78%',
          marketCoverage: 'Local',
          riskFactors: 4,
          profitOptimization: 'Basic'
        };
    }
  };

  if (!isFullScreen || !scope || scope.length < 10) {
    return (
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4">
          <Brain className="w-12 h-12 text-purple-600" />
          <div>
            <h3 className="text-xl font-bold text-purple-900">🤖 BlackBox AI Intelligence</h3>
            <p className="text-purple-700">Enter project scope to activate full-screen AI analysis</p>
          </div>
          <button 
            onClick={() => setIsFullScreen(true)}
            className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Launch Full Analysis
          </button>
        </div>
      </div>
    );
  }

  const intelligenceData = getIntelligenceData();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white z-50 overflow-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-gradient-to-r from-purple-800 to-blue-800 rounded-lg p-6 border border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">🤖 BlackBox AI Intelligence Center</h1>
                <div className="flex items-center space-x-4">
                  <p className="text-purple-200">Intelligence Level: {aiLevel.toUpperCase()}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-purple-300">Status:</span>
                    {aiLevel === 'high' ? '🔴' : aiLevel === 'medium' ? '🟡' : '🟢'}
                  </div>
                  <p className="text-purple-200">Trade: {tradeType?.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-4xl font-bold">{insights.length}</div>
                  <div className="text-purple-200 text-sm">Active Insights</div>
                </div>
                <button 
                  onClick={() => setIsFullScreen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {isAnalyzing && (
            <div className="bg-blue-800/50 backdrop-blur border border-blue-400 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-200">AI Analysis in Progress</h3>
                  <p className="text-blue-300">Processing project data, market conditions, and profit optimization...</p>
                </div>
              </div>
            </div>
          )}

          {analysisComplete && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-green-800/30 backdrop-blur border border-green-400 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <DollarSign className="w-8 h-8 text-green-400" />
                    <span className="text-2xl">{getStatusIcon(profitAnalysis.grossMargin, 25)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-green-200 mb-2">Profit Analysis</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-300">Gross Margin:</span>
                      <span className="font-bold text-green-200">{profitAnalysis.grossMargin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-300">Net Margin:</span>
                      <span className="font-bold text-green-200">{profitAnalysis.netMargin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-300">Optimal Price:</span>
                      <span className="font-bold text-green-200">${profitAnalysis.optimalPricing?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-800/30 backdrop-blur border border-blue-400 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-400" />
                    <span className="text-2xl">{getStatusIcon(marketData.demandIndex, 70)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-200 mb-2">Market Intelligence</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-300">Labor Rate:</span>
                      <span className="font-bold text-blue-200">${marketData.laborRates?.current}/hr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Trend:</span>
                      <span className="font-bold text-blue-200">{marketData.laborRates?.change}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Demand Index:</span>
                      <span className="font-bold text-blue-200">{marketData.demandIndex}/100</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-800/30 backdrop-blur border border-yellow-400 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <AlertTriangle className="w-8 h-8 text-yellow-400" />
                    <span className="text-2xl">{riskAssessment.overall === 'low' ? '🟢' : riskAssessment.overall === 'medium' ? '🟡' : '🔴'}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-200 mb-2">Risk Assessment</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-yellow-300">Overall Risk:</span>
                      <span className="font-bold text-yellow-200 capitalize">{riskAssessment.overall}</span>
                    </div>
                    {riskAssessment.factors?.slice(0, 2).map((factor, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-yellow-300">{factor.name}:</span>
                        <span className={`font-bold ${getRiskColor(factor.level)}`}>{factor.impact}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-800/30 backdrop-blur border border-purple-400 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="w-8 h-8 text-purple-400" />
                    <span className="text-2xl">{aiLevel === 'high' ? '🔴' : aiLevel === 'medium' ? '🟡' : '🟢'}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-200 mb-2">AI Performance</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-300">Data Points:</span>
                      <span className="font-bold text-purple-200">{intelligenceData.dataPoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300">Accuracy:</span>
                      <span className="font-bold text-purple-200">{intelligenceData.predictionAccuracy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300">Coverage:</span>
                      <span className="font-bold text-purple-200">{intelligenceData.marketCoverage}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 backdrop-blur border border-gray-400 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center">
                    <Brain className="w-6 h-6 mr-2 text-purple-400" />
                    AI Insights & Recommendations
                    <span className="ml-2 text-sm bg-purple-600 px-2 py-1 rounded">{aiLevel.toUpperCase()}</span>
                  </h3>
                  <div className="space-y-4">
                    {insights.map((insight, index) => (
                      <div key={index} className={`border rounded-lg p-4 ${getImpactColor(insight.impact)} bg-opacity-20`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-white">{insight.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-white bg-black/30 px-2 py-1 rounded">{insight.confidence}%</span>
                            {insight.confidence > 90 ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : insight.confidence > 75 ? (
                              <Target className="w-4 h-4 text-yellow-400" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-200">{insight.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur border border-gray-400 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center">
                    <PieChart className="w-6 h-6 mr-2 text-blue-400" />
                    Detailed Risk Factors
                    <span className="ml-2 text-sm bg-yellow-600 px-2 py-1 rounded">{riskAssessment.factors?.length} FACTORS</span>
                  </h3>
                  <div className="space-y-3">
                    {riskAssessment.factors?.map((factor, index) => (
                      <div key={index} className="border border-gray-600 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-200">{factor.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-bold ${getRiskColor(factor.level)}`}>{factor.level.toUpperCase()}</span>
                            <span className="text-sm text-gray-400">{factor.impact}% impact</span>
                            <span className="text-lg">{factor.level === 'high' ? '🔴' : factor.level === 'medium' ? '🟡' : '🟢'}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${factor.level === 'high' ? 'bg-red-500' : factor.level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${factor.impact * 5}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-900/30 border border-blue-500 rounded-lg">
                    <p className="text-sm text-blue-200">
                      <strong>Mitigation Strategy:</strong> {riskAssessment.mitigation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur border border-gray-400 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-green-400" />
                  Market Positioning & Competitive Analysis
                  <span className="ml-2 text-sm bg-green-600 px-2 py-1 rounded">LIVE DATA</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-300 flex items-center">
                      Pricing Strategy 
                      <span className="ml-2 text-lg">🟢</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Current Market Rate:</span>
                        <span className="text-green-400 font-bold">${marketData.laborRates?.regional}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Recommended Rate:</span>
                        <span className="text-green-400 font-bold">${marketData.laborRates?.current}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Premium Potential:</span>
                        <span className="text-green-400 font-bold">+15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Profit Margin:</span>
                        <span className="text-green-400 font-bold">{profitAnalysis.grossMargin}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-300 flex items-center">
                      Market Conditions 
                      <span className="ml-2 text-lg">🟡</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Competition Level:</span>
                        <span className="text-blue-400 font-bold capitalize">{marketData.competitionLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Seasonal Factor:</span>
                        <span className="text-blue-400 font-bold">{marketData.seasonalFactor}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Material Volatility:</span>
                        <span className="text-blue-400 font-bold capitalize">{marketData.materialCosts?.volatility}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Demand Trend:</span>
                        <span className="text-blue-400 font-bold">{marketData.laborRates?.change}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-300 flex items-center">
                      Strategic Position 
                      <span className="ml-2 text-lg">🟢</span>
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Competitive Edge:</span>
                        <span className="text-purple-400 font-bold capitalize">{profitAnalysis.competitivePosition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Risk-Adj. Margin:</span>
                        <span className="text-purple-400 font-bold">{profitAnalysis.riskAdjustedMargin}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Win Probability:</span>
                        <span className="text-purple-400 font-bold">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Analysis Depth:</span>
                        <span className="text-purple-400 font-bold">{intelligenceData.analysisDepth}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {aiLevel === 'high' && (
                <div className="bg-red-900/30 backdrop-blur border border-red-400 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-200 mb-4 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-red-400" />
                    Advanced Intelligence Features
                    <span className="ml-2 text-sm bg-red-600 px-2 py-1 rounded">HIGH LEVEL ONLY</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-red-800/20 border border-red-500 rounded-lg p-4">
                      <h4 className="font-semibold text-red-300 mb-2">Predictive Analytics</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-red-200">Future Demand:</span>
                          <span className="text-red-100 font-bold">+23%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-200">Price Forecast:</span>
                          <span className="text-red-100 font-bold">$52K</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-800/20 border border-red-500 rounded-lg p-4">
                      <h4 className="font-semibold text-red-300 mb-2">Competitive Intelligence</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-red-200">Market Share:</span>
                          <span className="text-red-100 font-bold">18.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-200">Competitor Gap:</span>
                          <span className="text-red-100 font-bold">+$8K</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-800/20 border border-red-500 rounded-lg p-4">
                      <h4 className="font-semibold text-red-300 mb-2">Resource Optimization</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-red-200">Efficiency Gain:</span>
                          <span className="text-red-100 font-bold">+15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-200">Cost Reduction:</span>
                          <span className="text-red-100 font-bold">-$3.2K</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-800/20 border border-red-500 rounded-lg p-4">
                      <h4 className="font-semibold text-red-300 mb-2">Strategic Recommendations</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-red-200">Priority Actions:</span>
                          <span className="text-red-100 font-bold">7</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-red-200">ROI Impact:</span>
                          <span className="text-red-100 font-bold">+28%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlackBoxAI;
