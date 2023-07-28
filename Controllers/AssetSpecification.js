const AssetSpecification = require("../Models/AssetSpecification");

const createAsset = async (req, res) => {
  // send request without activityCount as that will be set by backend to be 0 at the start
  const assetobj = {
    buildingType: req.body.buildingType,
    name: req.body.name,
    specification: req.body.specification,
    description: req.body.description,
    activityCount: 0,
    frequency: req.body.frequency,
  };
  const asset = await AssetSpecification.create(assetobj);
  console.log(asset);
  res.send(asset);
};

module.exports = {
  createAsset,
};
