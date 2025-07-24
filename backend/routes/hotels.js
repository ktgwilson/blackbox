const express = require('express');
const router = express.Router();

router.post('/search', (req, res) => {
  const { location, checkIn, checkOut } = req.body;
  
  const hotels = [
    {
      id: 1,
      name: 'Hampton Inn & Suites Downtown',
      rating: 4.2,
      price: 129 + Math.floor(Math.random() * 20),
      distance: '2.3 miles from job site',
      amenities: ['Free WiFi', 'Parking', 'Breakfast'],
      crewFriendly: true,
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Extended Stay America',
      rating: 3.8,
      price: 89 + Math.floor(Math.random() * 15),
      distance: '4.1 miles from job site',
      amenities: ['Kitchenette', 'Free WiFi', 'Pet Friendly'],
      crewFriendly: true,
      availability: 'Limited'
    },
    {
      id: 3,
      name: 'Holiday Inn Express',
      rating: 4.5,
      price: 145 + Math.floor(Math.random() * 25),
      distance: '1.8 miles from job site',
      amenities: ['Pool', 'Gym', 'Business Center'],
      crewFriendly: false,
      availability: 'Available'
    },
    {
      id: 4,
      name: 'Red Roof Inn',
      rating: 3.5,
      price: 75 + Math.floor(Math.random() * 10),
      distance: '5.2 miles from job site',
      amenities: ['Free WiFi', 'Pet Friendly'],
      crewFriendly: true,
      availability: 'Available'
    }
  ];
  
  res.json({
    location,
    checkIn,
    checkOut,
    hotels,
    searchedAt: new Date()
  });
});

module.exports = router;
