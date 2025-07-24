import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './index.css';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TradeEstimator from './components/TradeEstimator';
import TradeVerticals from './components/TradeVerticals';
import ControlPanel from './components/ControlPanel';
import HotelFinder from './components/HotelFinder';
import GlobalSearch from './components/GlobalSearch';
import BlackBoxAI from './components/BlackBoxAI';
import MarketData from './components/MarketData';
import MobileApp from './components/MobileApp';
import FieldDataCollector from './components/FieldDataCollector';
import BoardroomAI from './components/BoardroomAI';
import AIThinkingEngine from './components/AIThinkingEngine';
import ShortcutPanel from './components/ShortcutPanel';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function AppContent() {
  useKeyboardShortcuts();
  
  const [socket, setSocket] = useState(null);
  const [aiLevel, setAiLevel] = useState('medium');
  const [marketData, setMarketData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('marketDataUpdate', (data) => {
      setMarketData(data);
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => newSocket.close();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="flex">
        <BlackBoxAI aiLevel={aiLevel} setAiLevel={setAiLevel} />
        
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard marketData={marketData} />} />
            <Route path="/trades" element={<TradeVerticals />} />
            <Route path="/trade/:tradeType" element={<TradeEstimator socket={socket} aiLevel={aiLevel} marketData={marketData} />} />
            <Route path="/control-panel" element={<ControlPanel />} />
            <Route path="/hotel-finder" element={<HotelFinder socket={socket} />} />
            <Route path="/search" element={<GlobalSearch query={searchQuery} />} />
            <Route path="/market-data" element={<MarketData data={marketData} />} />
            <Route path="/mobile" element={<MobileApp />} />
            <Route path="/field-data" element={<FieldDataCollector />} />
            <Route path="/boardroom" element={<BoardroomAI />} />
            <Route path="/ai-thinking" element={<AIThinkingEngine />} />
          </Routes>
          <ShortcutPanel />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
