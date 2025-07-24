const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blackbox', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

app.use('/api/estimate', require('./routes/estimate'));
app.use('/api/market', require('./routes/market'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/search', require('./routes/search'));
app.use('/api/control', require('./routes/control'));
app.use('/api/field', require('./routes/field'));
app.use('/api/jarvis', require('./routes/jarvis'));

let marketData = {
  laborRates: [
    { name: 'Electrician', rate: 95, trend: 'up', change: '+8%' },
    { name: 'HVAC Tech', rate: 88, trend: 'up', change: '+5%' },
    { name: 'Plumber', rate: 92, trend: 'down', change: '-2%' },
    { name: 'Flooring Installer', rate: 75, trend: 'up', change: '+12%' }
  ],
  materialCosts: [
    { name: 'Copper Wire', price: 3.45, trend: 'up', change: '+3%' },
    { name: 'PVC Pipe', price: 2.89, trend: 'down', change: '-1%' },
    { name: 'Steel Conduit', price: 4.12, trend: 'up', change: '+7%' },
    { name: 'Lumber 2x4', price: 8.95, trend: 'up', change: '+15%' }
  ],
  lastUpdate: new Date()
};

cron.schedule('*/30 * * * * *', () => {
  marketData.laborRates = marketData.laborRates.map(item => ({
    ...item,
    rate: Math.max(50, item.rate + (Math.random() - 0.5) * 3)
  }));
  
  marketData.materialCosts = marketData.materialCosts.map(item => ({
    ...item,
    price: Math.max(1, item.price + (Math.random() - 0.5) * 0.2)
  }));
  
  marketData.lastUpdate = new Date();
  
  io.emit('marketDataUpdate', marketData);
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.emit('marketDataUpdate', marketData);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
