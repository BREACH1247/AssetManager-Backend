const mongoose = require("mongoose");

const activityData = new mongoose.Schema(
  {
    activity: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      enum: [
        "Daily",
        "Weekly",
        "Biweekly",
        "Monthly",
        "Bimonthly",
        "Half Yearly",
        "Yearly",
      ],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const assetSchedulingSchema = new mongoose.Schema(
  {
    assetID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetSpec",
      required: true,
    },
    activityList: [activityData]
  }
);

const AssetScheduling = mongoose.model(
  "AssetScheduling",
  assetSchedulingSchema
);

module.exports = AssetScheduling;
