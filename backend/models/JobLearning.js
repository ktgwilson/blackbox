const mongoose = require('mongoose');

const jobLearningSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    unique: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  tradeType: {
    type: String,
    required: true,
    enum: ['electrical', 'plumbing', 'hvac', 'flooring', 'roofing', 'concrete', 'framing', 'painting', 'carpentry', 'insulation', 'glazing', 'pool', 'security', 'ffe']
  },
  location: {
    city: String,
    state: String,
    zipCode: String,
    region: String
  },
  originalEstimate: {
    materials: Number,
    labor: Number,
    equipment: Number,
    permits: Number,
    overhead: Number,
    profit: Number,
    total: Number,
    estimatedHours: Number
  },
  actualCosts: {
    materials: Number,
    labor: Number,
    equipment: Number,
    permits: Number,
    overhead: Number,
    total: Number,
    actualHours: Number
  },
  accuracy: {
    materialVariance: Number,
    laborVariance: Number,
    totalVariance: Number,
    timeVariance: Number,
    accuracyScore: Number
  },
  factors: {
    weatherDelays: Number,
    permitDelays: Number,
    materialShortages: [String],
    laborShortages: [String],
    changeOrders: Number,
    complexity: {
      type: String,
      enum: ['simple', 'moderate', 'complex', 'very_complex']
    }
  },
  crew: {
    size: Number,
    experience: {
      type: String,
      enum: ['junior', 'intermediate', 'senior', 'expert']
    },
    efficiency: Number,
    safetyIncidents: Number
  },
  client: {
    type: {
      type: String,
      enum: ['residential', 'commercial', 'industrial', 'government']
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large', 'enterprise']
    },
    paymentHistory: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor']
    },
    changeOrderFrequency: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  },
  marketData: {
    materialPrices: mongoose.Schema.Types.Mixed,
    laborRates: mongoose.Schema.Types.Mixed,
    competitionLevel: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    seasonality: String
  },
  lessons: [{
    category: String,
    description: String,
    impact: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    recommendation: String
  }],
  tags: [String],
  isValidated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

jobLearningSchema.index({ jobId: 1 });
jobLearningSchema.index({ project: 1 });
jobLearningSchema.index({ tradeType: 1 });
jobLearningSchema.index({ 'accuracy.accuracyScore': -1 });
jobLearningSchema.index({ 'marketData.competitionLevel': 1 });
jobLearningSchema.index({ createdAt: -1 });

module.exports = mongoose.model('JobLearning', jobLearningSchema);
