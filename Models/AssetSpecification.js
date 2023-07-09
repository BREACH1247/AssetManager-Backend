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
  location: {
    type: String,
    required: true
  },
  specification: {
    type: String,
    required: true
  }
});

const AssetSpec = mongoose.model('BuildingType', assetSpecification);

module.exports = AssetSpec;
