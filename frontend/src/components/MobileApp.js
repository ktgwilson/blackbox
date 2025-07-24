import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Users, CheckSquare, AlertTriangle, Upload, Wifi, WifiOff } from 'lucide-react';

const MobileApp = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [location, setLocation] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    getCurrentLocation();
    loadOfflineData();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          console.error('Location error:', error);
        }
      );
    }
  };

  const loadOfflineData = async () => {
    try {
      const savedTasks = localStorage.getItem('blackbox_tasks');
      const savedPhotos = localStorage.getItem('blackbox_photos');
      
      if (savedTasks) setTasks(JSON.parse(savedTasks));
      if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
    } catch (error) {
      console.error('Failed to load offline data:', error);
    }
  };

  const saveOfflineData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save offline data:', error);
    }
  };

  const capturePhoto = (imageSrc) => {
    const newPhoto = {
      id: Date.now(),
      src: imageSrc,
      timestamp: new Date().toISOString(),
      location: location,
      uploaded: false,
      type: 'progress'
    };
    
    const updatedPhotos = [...photos, newPhoto];
    setPhotos(updatedPhotos);
    saveOfflineData('blackbox_photos', updatedPhotos);
    setShowCamera(false);
  };

  const uploadPendingData = async () => {
    if (!isOnline) return;
    
    try {
      const pendingPhotos = photos.filter(photo => !photo.uploaded);
      const pendingTasks = tasks.filter(task => task.status === 'pending_sync');
      
      for (const photo of pendingPhotos) {
        await uploadPhoto(photo);
      }
      
      for (const task of pendingTasks) {
        await syncTask(task);
      }
      
      console.log('Data sync completed');
    } catch (error) {
      console.error('Data sync failed:', error);
    }
  };

  const uploadPhoto = async (photo) => {
    try {
      const response = await fetch('/api/field/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photo)
      });
      
      if (response.ok) {
        const updatedPhotos = photos.map(p => 
          p.id === photo.id ? { ...p, uploaded: true } : p
        );
        setPhotos(updatedPhotos);
        saveOfflineData('blackbox_photos', updatedPhotos);
      }
    } catch (error) {
      console.error('Photo upload failed:', error);
    }
  };

  const syncTask = async (task) => {
    try {
      const response = await fetch('/api/field/sync-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      
      if (response.ok) {
        const updatedTasks = tasks.map(t => 
          t.id === task.id ? { ...t, status: 'synced' } : t
        );
        setTasks(updatedTasks);
        saveOfflineData('blackbox_tasks', updatedTasks);
      }
    } catch (error) {
      console.error('Task sync failed:', error);
    }
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      timestamp: new Date().toISOString(),
      location: location,
      status: isOnline ? 'synced' : 'pending_sync'
    };
    
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveOfflineData('blackbox_tasks', updatedTasks);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Field Dashboard</h2>
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <div className="flex items-center text-green-600">
              <Wifi className="w-5 h-5 mr-1" />
              <span className="text-sm">Online</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <WifiOff className="w-5 h-5 mr-1" />
              <span className="text-sm">Offline</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <Camera className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-semibold text-blue-900">Photos</h3>
              <p className="text-blue-700">{photos.length} captured</p>
            </div>
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center">
            <CheckSquare className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <h3 className="font-semibold text-green-900">Tasks</h3>
              <p className="text-green-700">{tasks.length} logged</p>
            </div>
          </div>
        </div>

        <div className="card bg-purple-50 border-purple-200">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <h3 className="font-semibold text-purple-900">Location</h3>
              <p className="text-purple-700">
                {location ? 'GPS Active' : 'No Location'}
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-orange-50 border-orange-200">
          <div className="flex items-center">
            <Upload className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <h3 className="font-semibold text-orange-900">Sync</h3>
              <p className="text-orange-700">
                {photos.filter(p => !p.uploaded).length} pending
              </p>
            </div>
          </div>
        </div>
      </div>

      {isOnline && (
        <button
          onClick={uploadPendingData}
          className="w-full btn-primary"
        >
          Sync All Data
        </button>
      )}
    </div>
  );

  const renderCamera = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Capture Photo</h2>
        <button
          onClick={() => setShowCamera(false)}
          className="text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>

      <div className="relative">
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center relative">
          <div className="text-center text-gray-500">
            <Camera className="w-16 h-16 mx-auto mb-2" />
            <p className="text-lg font-semibold">Camera Preview</p>
            <p className="text-sm">(Simplified for core functionality)</p>
          </div>
          <button
            onClick={() => capturePhoto('/placeholder-image.jpg')}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg"
          >
            <Camera className="w-8 h-8 text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Photos</h2>
        <button
          onClick={() => setShowCamera(true)}
          className="btn-primary"
        >
          <Camera className="w-5 h-5 mr-2" />
          Capture
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            <img
              src={photo.src}
              alt="Field photo"
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2">
              {photo.uploaded ? (
                <div className="bg-green-500 text-white rounded-full p-1">
                  <CheckSquare className="w-4 h-4" />
                </div>
              ) : (
                <div className="bg-orange-500 text-white rounded-full p-1">
                  <Upload className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              {new Date(photo.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No photos captured yet</p>
        </div>
      )}
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-gray-600 text-sm">{task.description}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(task.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center">
                {task.status === 'synced' ? (
                  <CheckSquare className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <CheckSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No tasks logged yet</p>
        </div>
      )}
    </div>
  );

  if (showCamera) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        {renderCamera()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'photos' && renderPhotos()}
        {activeTab === 'tasks' && renderTasks()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <Users className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'photos' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <Camera className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Photos</span>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'tasks' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
            }`}
          >
            <CheckSquare className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Tasks</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
