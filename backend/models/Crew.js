const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
  crewId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      required: true
    },
    hourlyRate: {
      type: Number,
      required: true
    },
    skills: [String],
    certifications: [String]
  }],
  specializations: [{
    type: String,
    enum: ['electrical', 'plumbing', 'hvac', 'flooring', 'roofing', 'concrete', 'framing', 'painting', 'carpentry', 'insulation', 'glazing', 'pool', 'security', 'ffe']
  }],
  availability: {
    status: {
      type: String,
      enum: ['available', 'assigned', 'unavailable'],
      default: 'available'
    },
    currentProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    schedule: [{
      date: Date,
      status: {
        type: String,
        enum: ['available', 'assigned', 'off']
      },
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
      }
    }]
  },
  location: {
    baseLocation: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    currentLocation: {
      coordinates: {
        latitude: Number,
        longitude: Number
      },
      lastUpdated: Date
    },
    travelRadius: {
      type: Number,
      default: 50
    }
  },
  equipment: [{
    name: String,
    type: String,
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor'],
      default: 'good'
    },
    lastMaintenance: Date,
    nextMaintenance: Date
  }],
  performance: {
    completedProjects: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    onTimeCompletion: { type: Number, default: 0 },
    safetyRecord: {
      incidents: { type: Number, default: 0 },
      lastIncident: Date,
      trainingCompleted: [String]
    }
  },
  contact: {
    phone: String,
    email: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

crewSchema.index({ crewId: 1 });
crewSchema.index({ lead: 1 });
crewSchema.index({ specializations: 1 });
crewSchema.index({ 'availability.status': 1 });
crewSchema.index({ 'location.baseLocation.coordinates': '2dsphere' });

module.exports = mongoose.model('Crew', crewSchema);
