const AssetSpecification = require("../Models/AssetSpecification");

const getAsset = async (req, res) => {
  //gotta check if building or name is specified, otherwise return all the assets
  //req.body = {building: "" and name: ""}, or = {}
  console.log("Triggering")
  if(req.body != {}){
    const qassets = await AssetSpecification.where("name").equals(req.body.name).where("buildingType").equals(req.body.buiding);
    console.log(qassets);
    res.status(200).json(qassets);
  }
  else{
    const allassets = await AssetSpecification.find();
    console.log(allassets);
    res.status(200).json(allassets);
  }
};

module.exports = {
  getAsset,
};
