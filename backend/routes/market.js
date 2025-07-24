const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const marketData = {
    laborRates: [
      { name: 'Electrician', rate: 95 + Math.random() * 10, trend: 'up', change: '+8%' },
      { name: 'HVAC Tech', rate: 88 + Math.random() * 8, trend: 'up', change: '+5%' },
      { name: 'Plumber', rate: 92 + Math.random() * 6, trend: 'down', change: '-2%' },
      { name: 'Flooring Installer', rate: 75 + Math.random() * 12, trend: 'up', change: '+12%' }
    ],
    materialCosts: [
      { name: 'Copper Wire', price: 3.45 + Math.random() * 0.5, trend: 'up', change: '+3%' },
      { name: 'PVC Pipe', price: 2.89 + Math.random() * 0.3, trend: 'down', change: '-1%' },
      { name: 'Steel Conduit', price: 4.12 + Math.random() * 0.4, trend: 'up', change: '+7%' },
      { name: 'Lumber 2x4', price: 8.95 + Math.random() * 1.2, trend: 'up', change: '+15%' }
    ],
    regions: [
      { name: 'Downtown', multiplier: 1.25, demand: 'High' },
      { name: 'Suburbs', multiplier: 1.0, demand: 'Medium' },
      { name: 'Industrial', multiplier: 1.15, demand: 'High' },
      { name: 'Residential', multiplier: 0.95, demand: 'Low' }
    ],
    lastUpdate: new Date()
  };
  
  res.json(marketData);
});

module.exports = router;
