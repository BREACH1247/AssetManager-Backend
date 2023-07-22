const mongoose = require('mongoose');

const assetSchedulingSchema = new mongoose.Schema({
  assetID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssetSpec',
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  activityNum: {
    //assigned by backend not by user
    type: Number,
    required: true
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Bimonthly', 'Half Yearly', 'Yearly'],
    required: true
  }
},
{
  timestamps: true
});

const AssetScheduling = mongoose.model('AssetScheduling', assetSchedulingSchema);

module.exports = AssetScheduling;
