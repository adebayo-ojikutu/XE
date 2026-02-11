const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const propertyAdSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      trim: true,
      minlength: 30,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    adsType: {
      type: String,
      required: true,
      enum: ["Rent", "Buy", "Exchange", "Donation" ],
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    sizeSqm: {
      type: Number,
      required: true,
      min: 1,
    },
    area: {
      type: String,
      required: true,
      trim: true,
    },
    placeId: {
      type: String,
      required: true,
      trim: true,
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true },
);

const PropertyAd = mongoose.model("property-ad", propertyAdSchema);
module.exports = PropertyAd;
