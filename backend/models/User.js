const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'estimator', 'crew_lead', 'worker'],
    default: 'estimator'
  },
  company: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  preferences: {
    defaultUnits: {
      type: String,
      enum: ['imperial', 'metric'],
      default: 'imperial'
    },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    },
    dashboard: {
      layout: { type: String, default: 'standard' },
      widgets: [{ type: String }]
    }
  },
  permissions: {
    canCreateProjects: { type: Boolean, default: true },
    canEditEstimates: { type: Boolean, default: true },
    canManageCrew: { type: Boolean, default: false },
    canViewAnalytics: { type: Boolean, default: true },
    canExportData: { type: Boolean, default: true }
  },
  lastLogin: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpires;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
