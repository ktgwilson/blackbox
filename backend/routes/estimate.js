const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const scope = req.body.scope || 'standard FF&E';
  const response = {
    scope,
    crew: ['2 Installers', '1 Lead'],
    tools: ['Cordless drill', 'Furniture dolly', 'Level'],
    materials: ['Anchors', 'Screws'],
    perDiem: '$150/day',
    riskScore: 'Low',
    estimatedTime: '3 days',
    winRate: '85%',
    exportable: true
  };
  res.json(response);
});

module.exports = router;
