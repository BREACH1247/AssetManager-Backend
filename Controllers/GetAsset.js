const AssetSpecification = require("../Models/AssetSpecification");

const getAsset = async (req, res) => {
  // Gotta check if building or name is specified as query parameters, otherwise return all the assets
  // req.query = { building: "", name: "" }
  console.log("Triggering");

  if (req.query.name || req.query.building) {
    const qassets = await AssetSpecification.where("name").equals(req.query.name).where("buildingType").equals(req.query.building);
    console.log(qassets);
    res.status(200).json(qassets);
  } else {
    const allassets = await AssetSpecification.find();
    console.log(allassets);
    res.status(200).json(allassets);
  }
};

module.exports = {
  getAsset,
};
