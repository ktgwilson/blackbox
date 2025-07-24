import React, { useState, useEffect } from 'react';
import { Brain, Zap, Settings, TrendingUp, AlertCircle, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const BlackBoxAI = ({ aiLevel, setAiLevel }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [insights, setInsights] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    initializeSpeechRecognition();
  }, []);

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  };

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

  const toggleListening = () => {
    if (!recognition) {
      setResponse('Speech recognition not supported in this browser');
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setTranscript('');
    } else {
      recognition.start();
      setIsListening(true);
      setTranscript('Listening...');
    }
  };

  const processVoiceCommand = async (command) => {
    try {
      const response = await fetch('/api/jarvis/voice-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, aiLevel })
      });
      
      if (response.ok) {
        const result = await response.json();
        setResponse(result.response);
        
        if (result.action) {
          executeVoiceAction(result.action);
        }
        
        if (isSpeaking) {
          speakResponse(result.response);
        }
      }
    } catch (error) {
      console.error('Voice command processing failed:', error);
      setResponse('Sorry, I could not process that command.');
    }
  };

  const executeVoiceAction = (action) => {
    switch (action.type) {
      case 'navigate':
        window.location.href = action.url;
        break;
      case 'estimate':
        if (action.tradeType) {
          window.location.href = `/trade/${action.tradeType}`;
        }
        break;
      case 'search':
        if (action.query) {
          window.location.href = `/search?q=${encodeURIComponent(action.query)}`;
        }
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
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
          {isExpanded && <span className="font-semibold">BlackBox AI</span>}
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

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center">
                <Mic className="w-4 h-4 mr-2" />
                Voice Control
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={toggleListening}
                  className={`flex-1 flex items-center justify-center space-x-2 p-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span className="text-sm">{isListening ? 'Stop' : 'Listen'}</span>
                </button>
                <button
                  onClick={toggleSpeaking}
                  className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                    isSpeaking 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-gray-500 hover:bg-gray-600'
                  }`}
                >
                  {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
              {transcript && (
                <div className="text-xs bg-white bg-opacity-10 p-2 rounded">
                  <strong>You said:</strong> {transcript}
                </div>
              )}
              {response && (
                <div className="text-xs bg-white bg-opacity-10 p-2 rounded">
                  <strong>BlackBox AI:</strong> {response}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white border-opacity-20">
              <div className="text-xs opacity-75 space-y-1">
                <div>System Status: ✅ Online</div>
                <div>AI Processing: ⚡ Active</div>
                <div>Data Sync: 🔄 Real-time</div>
                <div>Voice Control: {recognition ? '🎤 Ready' : '❌ Unavailable'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlackBoxAI;
