const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  estimator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['draft', 'estimating', 'quoted', 'approved', 'in_progress', 'completed', 'cancelled'],
    default: 'draft'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  scope: {
    tradeType: {
      type: String,
      required: true,
      enum: ['electrical', 'plumbing', 'hvac', 'flooring', 'roofing', 'concrete', 'framing', 'painting', 'carpentry', 'insulation', 'glazing', 'pool', 'security', 'ffe']
    },
    description: { type: String, required: true },
    specifications: mongoose.Schema.Types.Mixed,
    drawings: [{ type: String }],
    documents: [{ type: String }]
  },
  estimate: {
    materials: { type: Number, default: 0 },
    labor: { type: Number, default: 0 },
    equipment: { type: Number, default: 0 },
    permits: { type: Number, default: 0 },
    overhead: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    confidence: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  },
  timeline: {
    estimatedStart: Date,
    estimatedCompletion: Date,
    actualStart: Date,
    actualCompletion: Date,
    milestones: [{
      name: String,
      plannedDate: Date,
      actualDate: Date,
      status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'delayed'],
        default: 'pending'
      }
    }]
  },
  crew: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crew'
  }],
  risks: [{
    category: String,
    description: String,
    probability: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    impact: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    mitigation: String
  }],
  notes: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

projectSchema.index({ projectId: 1 });
projectSchema.index({ 'client': 1 });
projectSchema.index({ 'estimator': 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ 'scope.tradeType': 1 });
projectSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
