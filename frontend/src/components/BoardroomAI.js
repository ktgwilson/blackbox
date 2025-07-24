import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Users, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const BoardroomAI = () => {
  const [insights, setInsights] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    generateBoardroomInsights();
  }, []);

  const generateBoardroomInsights = () => {
    const mockMetrics = {
      revenue: {
        current: 2400000,
        projected: 2850000,
        growth: 18.8
      },
      projects: {
        active: 24,
        pipeline: 38,
        completion: 94.2
      },
      efficiency: {
        crewUtilization: 87.3,
        profitMargin: 22.5,
        clientSatisfaction: 4.8
      }
    };

    const mockInsights = [
      {
        type: 'revenue',
        title: 'Q2 Revenue Projection',
        value: '$2.85M',
        change: '+18.8%',
        status: 'positive',
        details: 'Strong pipeline in VoltBox and PoolBox verticals driving growth'
      },
      {
        type: 'efficiency',
        title: 'Crew Utilization',
        value: '87.3%',
        change: '+5.2%',
        status: 'positive',
        details: 'Optimized scheduling reducing downtime across all trade verticals'
      },
      {
        type: 'risk',
        title: 'Material Cost Risk',
        value: 'Medium',
        change: '+12%',
        status: 'warning',
        details: 'Copper and steel prices trending upward, recommend bulk purchasing'
      }
    ];

    const mockRecommendations = [
      {
        priority: 'high',
        category: 'Revenue',
        title: 'Expand PoolBox Operations',
        impact: '$450K additional revenue',
        timeline: '60 days',
        confidence: 92
      },
      {
        priority: 'medium',
        category: 'Efficiency',
        title: 'Cross-train Security Teams',
        impact: '15% utilization increase',
        timeline: '30 days',
        confidence: 78
      },
      {
        priority: 'high',
        category: 'Risk Management',
        title: 'Hedge Material Costs',
        impact: '8% margin protection',
        timeline: '14 days',
        confidence: 85
      }
    ];

    setMetrics(mockMetrics);
    setInsights(mockInsights);
    setRecommendations(mockRecommendations);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">🏢 BoardroomAI - Executive Intelligence</h1>
        <p className="text-blue-100">AI-powered insights for strategic decision making</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Performance</h3>
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-green-600">${(metrics.revenue?.current / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-gray-600">Current Quarter</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+{metrics.revenue?.growth}%</span>
              <span className="text-gray-500">vs last quarter</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-600">{metrics.projects?.active}</div>
            <div className="text-sm text-gray-600">In Progress</div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">{metrics.projects?.completion}%</span>
              <span className="text-gray-500">completion rate</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Team Efficiency</h3>
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-600">{metrics.efficiency?.crewUtilization}%</div>
            <div className="text-sm text-gray-600">Crew Utilization</div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">{metrics.efficiency?.profitMargin}%</span>
              <span className="text-gray-500">profit margin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🧠 AI Insights</h3>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getStatusColor(insight.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{insight.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{insight.value}</span>
                    <span className="text-sm font-medium">{insight.change}</span>
                  </div>
                </div>
                <p className="text-sm">{insight.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Strategic Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">{rec.confidence}% confidence</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{rec.category}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-600 font-medium">{rec.impact}</span>
                  <span className="text-gray-500">{rec.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Trade Vertical Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'VoltBox', revenue: 680000, growth: 15.2, projects: 8 },
            { name: 'PoolBox', revenue: 520000, growth: 28.7, projects: 6 },
            { name: 'AirBox', revenue: 450000, growth: 8.3, projects: 5 },
            { name: 'SecurityBox', revenue: 380000, growth: 22.1, projects: 4 }
          ].map((trade, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">{trade.name}</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-medium">${(trade.revenue / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth:</span>
                  <span className="text-green-600 font-medium">+{trade.growth}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects:</span>
                  <span className="font-medium">{trade.projects}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardroomAI;
