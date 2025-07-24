import React, { useState, useEffect } from 'react';
import { Brain, Zap, Settings, TrendingUp, AlertCircle } from 'lucide-react';

const JarvisAI = ({ aiLevel, setAiLevel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [insights, setInsights] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const generateInsights = () => {
      const baseInsights = [
        { type: 'market', icon: '📊', text: 'Labor rates trending up 3% this week', priority: 'medium' },
        { type: 'weather', icon: '🌤️', text: 'Clear weather forecast for next 5 days', priority: 'low' },
        { type: 'crew', icon: '👥', text: '12 crew members available for new projects', priority: 'high' }
      ];

      if (aiLevel === 'high') {
        setInsights([
          ...baseInsights,
          { type: 'prediction', icon: '🔮', text: 'Project completion probability: 94%', priority: 'high' },
          { type: 'optimization', icon: '⚡', text: 'Route optimization saves 2.3 hours', priority: 'medium' },
          { type: 'risk', icon: '⚠️', text: 'Material delivery delay risk: 15%', priority: 'medium' },
          { type: 'profit', icon: '💰', text: 'Margin optimization: +$3,200 potential', priority: 'high' }
        ]);
      } else if (aiLevel === 'medium') {
        setInsights([
          ...baseInsights,
          { type: 'prediction', icon: '🔮', text: 'Project timeline on track', priority: 'medium' },
          { type: 'optimization', icon: '⚡', text: 'Crew efficiency at 87%', priority: 'low' }
        ]);
      } else {
        setInsights(baseInsights.slice(0, 2));
      }
    };

    generateInsights();
  }, [aiLevel]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`bg-gradient-to-b from-purple-900 to-blue-900 text-white transition-all duration-300 ${
      isExpanded ? 'w-80' : 'w-16'
    }`}>
      <div className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center space-x-2 bg-white bg-opacity-20 rounded-lg p-3 hover:bg-opacity-30 transition-colors"
        >
          <Brain className="w-6 h-6" />
          {isExpanded && <span className="font-semibold">JARVIS AI</span>}
        </button>

        {isExpanded && (
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{currentTime.toLocaleTimeString()}</div>
              <div className="text-sm opacity-75">{currentTime.toLocaleDateString()}</div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Intelligence Level</label>
              <select
                value={aiLevel}
                onChange={(e) => setAiLevel(e.target.value)}
                className="w-full bg-white bg-opacity-20 rounded-lg p-2 text-white"
              >
                <option value="low" className="text-black">Low - Basic</option>
                <option value="medium" className="text-black">Medium - Standard</option>
                <option value="high" className="text-black">High - Advanced</option>
              </select>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Live Insights
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border text-sm ${getPriorityColor(insight.priority)}`}
                  >
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">{insight.icon}</span>
                      <span className="flex-1">{insight.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white border-opacity-20">
              <div className="text-xs opacity-75 space-y-1">
                <div>System Status: ✅ Online</div>
                <div>AI Processing: ⚡ Active</div>
                <div>Data Sync: 🔄 Real-time</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JarvisAI;
