import React, { useState, useEffect } from 'react';
import { MapPin, Star, DollarSign, Clock, Search, Wifi, Car, Coffee } from 'lucide-react';

const HotelFinder = ({ socket }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoSearch, setAutoSearch] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const sampleHotels = [
    {
      id: 1,
      name: 'Hampton Inn & Suites Downtown',
      rating: 4.2,
      price: 129,
      distance: '2.3 miles from job site',
      amenities: ['Free WiFi', 'Parking', 'Breakfast'],
      crewFriendly: true,
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Extended Stay America',
      rating: 3.8,
      price: 89,
      distance: '4.1 miles from job site',
      amenities: ['Kitchenette', 'Free WiFi', 'Pet Friendly'],
      crewFriendly: true,
      availability: 'Limited'
    },
    {
      id: 3,
      name: 'Holiday Inn Express',
      rating: 4.5,
      price: 145,
      distance: '1.8 miles from job site',
      amenities: ['Pool', 'Gym', 'Business Center'],
      crewFriendly: false,
      availability: 'Available'
    },
    {
      id: 4,
      name: 'Red Roof Inn',
      rating: 3.5,
      price: 75,
      distance: '5.2 miles from job site',
      amenities: ['Free WiFi', 'Pet Friendly'],
      crewFriendly: true,
      availability: 'Available'
    }
  ];

  useEffect(() => {
    if (autoSearch && location) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        setHotels(prev => prev.map(hotel => ({
          ...hotel,
          price: hotel.price + Math.floor((Math.random() - 0.5) * 10)
        })));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [autoSearch, location]);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setHotels(sampleHotels);
      setLoading(false);
      setLastUpdate(new Date());
    }, 1500);
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'breakfast': return <Coffee className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Hotel Finder</h1>
          <p className="text-xl text-gray-600 mt-2">Crew lodging with real-time availability</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Last Updated</p>
          <p className="text-lg font-semibold">{lastUpdate.toLocaleTimeString()}</p>
          <div className="flex items-center text-green-600 mt-1">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">Auto-updating every 30s</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Site Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter job site address..."
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={loading || !location}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search Hotels'}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoSearch}
              onChange={(e) => setAutoSearch(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm font-medium">Auto-update prices every 30 seconds</span>
          </label>
        </div>
      </div>

      {hotels.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Available Hotels</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="card hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{hotel.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600">${hotel.price}</div>
                    <div className="text-sm text-gray-600">per night</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{hotel.distance}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {hotel.crewFriendly && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        👷 Crew Friendly
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hotel.availability === 'Available' ? 'bg-green-100 text-green-800' :
                      hotel.availability === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {hotel.availability}
                    </span>
                  </div>
                  <button className="btn-primary">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <h3 className="text-xl font-bold text-green-900 mb-4">💰 Crew Lodging Cost Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-800">${hotels.reduce((sum, h) => sum + h.price, 0) / hotels.length || 0}</p>
                <p className="text-sm text-green-700">Average per night</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-800">${Math.min(...hotels.map(h => h.price)) || 0}</p>
                <p className="text-sm text-green-700">Lowest rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-800">{hotels.filter(h => h.crewFriendly).length}</p>
                <p className="text-sm text-green-700">Crew-friendly options</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelFinder;
