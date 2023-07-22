const mongoose = require('mongoose');

const assetSpecification = new mongoose.Schema({
  buildingType: {
    type: String,
    enum: ['LMP', 'Atrium', 'Villaverde', 'Vividha', 'QuarkcityEnergy'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  specification: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  //number of maintenance activities for this asset
  activityCount: {
    type: Number,
    required: true
  }
},
{
  timestamps: true
}
);

const AssetSpec = mongoose.model('AssetSpec', assetSpecification);

module.exports = AssetSpec;
