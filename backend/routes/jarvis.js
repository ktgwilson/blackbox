const express = require('express');
const router = express.Router();
const aiEngine = require('../services/aiEngine');

router.post('/voice-command', async (req, res) => {
  try {
    const { command, aiLevel } = req.body;
    
    const processedCommand = await processVoiceCommand(command, aiLevel);
    
    res.json(processedCommand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function processVoiceCommand(command, aiLevel) {
  const lowerCommand = command.toLowerCase();
  
  if (lowerCommand.includes('estimate') || lowerCommand.includes('quote')) {
    const tradeType = extractTradeType(lowerCommand);
    return {
      response: `I'll help you create an estimate${tradeType ? ` for ${tradeType}` : ''}. Opening the estimator now.`,
      action: tradeType ? { type: 'estimate', tradeType } : { type: 'navigate', url: '/trades' }
    };
  }
  
  if (lowerCommand.includes('search')) {
    const query = extractSearchQuery(lowerCommand);
    return {
      response: `Searching for "${query}"...`,
      action: { type: 'search', query }
    };
  }
  
  if (lowerCommand.includes('market') || lowerCommand.includes('price')) {
    return {
      response: 'Opening market data dashboard with current pricing information.',
      action: { type: 'navigate', url: '/market-data' }
    };
  }
  
  if (lowerCommand.includes('hotel') || lowerCommand.includes('accommodation')) {
    return {
      response: 'Opening hotel finder to locate nearby accommodations.',
      action: { type: 'navigate', url: '/hotel' }
    };
  }
  
  if (lowerCommand.includes('control') || lowerCommand.includes('settings')) {
    return {
      response: 'Opening control panel for system management.',
      action: { type: 'navigate', url: '/control' }
    };
  }
  
  if (lowerCommand.includes('mobile') || lowerCommand.includes('field')) {
    return {
      response: 'Opening mobile field application.',
      action: { type: 'navigate', url: '/mobile' }
    };
  }
  
  if (lowerCommand.includes('data') || lowerCommand.includes('collect')) {
    return {
      response: 'Opening field data collection interface.',
      action: { type: 'navigate', url: '/field-data' }
    };
  }
  
  if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
    return {
      response: getHelpResponse(aiLevel),
      action: null
    };
  }
  
  return {
    response: "I'm not sure how to help with that. Try saying 'help' to see what I can do.",
    action: null
  };
}

function extractTradeType(command) {
  const tradeMap = {
    'electrical': 'voltbox',
    'electric': 'voltbox',
    'hvac': 'airbox',
    'air conditioning': 'airbox',
    'plumbing': 'flowbox',
    'plumber': 'flowbox',
    'flooring': 'floorbox',
    'floor': 'floorbox',
    'glazing': 'glazebox',
    'window': 'glazebox',
    'framing': 'framebox',
    'drywall': 'framebox',
    'low voltage': 'signalbox',
    'signal': 'signalbox',
    'roofing': 'roofbox',
    'roof': 'roofbox',
    'painting': 'colorbox',
    'paint': 'colorbox'
  };
  
  for (const [keyword, tradeType] of Object.entries(tradeMap)) {
    if (command.includes(keyword)) {
      return tradeType;
    }
  }
  
  return null;
}

function extractSearchQuery(command) {
  const searchPhrases = ['search for', 'find', 'look for', 'search'];
  
  for (const phrase of searchPhrases) {
    const index = command.indexOf(phrase);
    if (index !== -1) {
      return command.substring(index + phrase.length).trim();
    }
  }
  
  return 'general search';
}

function getHelpResponse(aiLevel) {
  const baseCommands = [
    "Create estimates: 'Create an electrical estimate' or 'Quote for HVAC'",
    "Search: 'Search for projects' or 'Find materials'",
    "Navigate: 'Open market data' or 'Show control panel'",
    "Field work: 'Open mobile app' or 'Collect field data'"
  ];
  
  if (aiLevel === 'high') {
    return `I'm your AI assistant with advanced capabilities. I can help you with:\n\n${baseCommands.join('\n')}\n\nI can also provide detailed analysis, predictive insights, and automated recommendations based on your project data.`;
  } else if (aiLevel === 'medium') {
    return `I'm your AI assistant. I can help you with:\n\n${baseCommands.join('\n')}\n\nJust speak naturally and I'll understand what you need.`;
  } else {
    return `I can help you navigate the BlackBox system. Try saying:\n\n${baseCommands.slice(0, 2).join('\n')}`;
  }
}

module.exports = router;
