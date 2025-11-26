const mongoose = require('mongoose');

const resellerSchema = new mongoose.Schema({

  businessName: { type: String, required: true },
  ownerName: String,

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  phone: String,
  logo: String,

  // Unique domain for multi-tenant system
  domain: { type: String, unique: true, sparse: true },

  // Optional: if you create subdomain like reseller.myapp.com
  portalUrl: String,

  // KYC
  gstin: String,
  pan: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  kycDocs: [String],

  // Account status
  status: {
    type: String,
    enum: ["pending_payment", "active", "expired", "suspended"],
    default: "pending_payment"
  },

  // Subscription model
  subscription: {
    plan: { type: String, default: "free" }, // free, basic, pro
    amount: Number,
    paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
    startDate: Date,
    endDate: Date,
    invoiceUrl: String
  },

  // Branding
  branding: {
    logo: String,
    primaryColor: String,
    secondaryColor: String,
    themeTemplate: {
      type: String,
      enum: ["template1", "template2", "template3"],
      default: "template1"
    }
  },

  // KYC/Reseller verification flag
  isVerified: { type: Boolean, default: false },

  lastLogin: Date

}, { timestamps: true });

module.exports = mongoose.model("Reseller", resellerSchema);
