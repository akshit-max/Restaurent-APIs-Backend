const mongoose = require("mongoose");

// Schema
const restaurentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurent title is required"],
    },
    imageUrl: {
      type: String,
    },
    food: {
      type: Array,
    },
    time: {
      type: String,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    code: {
      type: String,
    },
    coords: {
      id: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
      latitudeDelta: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

// Export Model
module.exports = mongoose.model("restaurent", restaurentSchema);
