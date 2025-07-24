const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { q: query } = req.query;
  
  const sampleResults = [
    {
      id: 1,
      type: 'project',
      title: 'Downtown Office Complex - Electrical',
      description: 'VoltBox project for 50,000 sq ft office building',
      value: '$125,000',
      status: 'In Progress',
      date: '2024-01-15'
    },
    {
      id: 2,
      type: 'crew',
      title: 'Mike Johnson - Lead Electrician',
      description: 'Journeyman with 15 years experience, available next week',
      value: '$95/hour',
      status: 'Available',
      date: '2024-01-20'
    },
    {
      id: 3,
      type: 'quote',
      title: 'Hotel Renovation HVAC Quote #2024-0156',
      description: 'AirBox estimate for 120-room hotel HVAC upgrade',
      value: '$89,500',
      status: 'Pending',
      date: '2024-01-18'
    },
    {
      id: 4,
      type: 'material',
      title: 'Copper Wire 12 AWG',
      description: 'Current market price and availability',
      value: '$3.45/ft',
      status: 'In Stock',
      date: '2024-01-22'
    }
  ];
  
  const filteredResults = query 
    ? sampleResults.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
    : sampleResults;
  
  res.json({
    query,
    results: filteredResults,
    total: filteredResults.length,
    searchedAt: new Date()
  });
});

module.exports = router;
