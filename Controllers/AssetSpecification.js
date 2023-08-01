const AssetSpecification = require("../Models/AssetSpecification");
const AssetSchedule = require("../Models/AssetSchedule");

const createAsset = async (req, res) => {
  // send request without activityCount as that will be set by backend to be 0 at the start
  const assetobj = {
    buildingType: req.body.buildingType,
    name: req.body.name,
    specification: req.body.specification,
    description: req.body.description,
    activityCount: 0,
  };
  const asset = await AssetSpecification.create(assetobj);
  console.log("asset.id",asset.id);
  const maintactlist = await AssetSchedule.create({assetID: asset.id, activityList: []});
  console.log(maintactlist);
  res.send(asset);
};

const deleteAsset = async (req, res) => {
  //req.body = {id}

  const asset = await AssetSpecification.deleteOne({ _id: req.body.id });
  console.log(asset);
  res.send(asset);
};

const updateAsset = async (req, res) => {
  //req.body = {id, name, spec, desc, building}. If something is to remain unchanged let the frontend send the same data to the backend

  const asset = await AssetSpecification.findOneAndUpdate(
    { _id: req.body.id },
    {
      name: req.body.name,
      buildingType: req.body.building,
      specification: req.body.spec,
      description: req.body.desc,
    },
    {new: true}
  );
  console.log(asset);
  res.send(asset);
};

module.exports = {
  createAsset,
  deleteAsset,
  updateAsset,
};
