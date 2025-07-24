const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['individual', 'business', 'government', 'non_profit'],
    required: true
  },
  industry: {
    type: String,
    enum: ['residential', 'commercial', 'industrial', 'healthcare', 'education', 'retail', 'hospitality', 'government', 'other']
  },
  contact: {
    primaryContact: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      title: String,
      email: { type: String, required: true },
      phone: { type: String, required: true },
      mobile: String
    },
    billingContact: {
      firstName: String,
      lastName: String,
      title: String,
      email: String,
      phone: String
    },
    projectContact: {
      firstName: String,
      lastName: String,
      title: String,
      email: String,
      phone: String
    }
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'USA' }
  },
  billing: {
    paymentTerms: {
      type: String,
      enum: ['net_15', 'net_30', 'net_45', 'net_60', 'due_on_receipt'],
      default: 'net_30'
    },
    creditLimit: { type: Number, default: 0 },
    paymentHistory: {
      onTimePayments: { type: Number, default: 0 },
      latePayments: { type: Number, default: 0 },
      averageDaysLate: { type: Number, default: 0 }
    },
    preferredPaymentMethod: {
      type: String,
      enum: ['check', 'ach', 'wire', 'credit_card', 'cash'],
      default: 'check'
    }
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  preferences: {
    communicationMethod: {
      type: String,
      enum: ['email', 'phone', 'text', 'portal'],
      default: 'email'
    },
    reportingFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'bi_weekly', 'monthly'],
      default: 'weekly'
    },
    qualityStandards: {
      type: String,
      enum: ['standard', 'high', 'premium'],
      default: 'standard'
    }
  },
  notes: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  }],
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

clientSchema.index({ clientId: 1 });
clientSchema.index({ name: 1 });
clientSchema.index({ type: 1 });
clientSchema.index({ industry: 1 });
clientSchema.index({ 'contact.primaryContact.email': 1 });

module.exports = mongoose.model('Client', clientSchema);
