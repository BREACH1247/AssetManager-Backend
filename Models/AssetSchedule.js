const mongoose = require('mongoose');
const assetSchedulingSchema = new mongoose.Schema({
  assetName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AssetSpec',
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Biweekly', 'Monthly', 'Half Early', 'Early'],
    required: true
  }
});

const AssetScheduling = mongoose.model('AssetScheduling', assetSchedulingSchema);

module.exports = AssetScheduling;
