const AssetSpecification = require("../Models/AssetSpecification");

const getAsset = async (req, res) => {
  //pass an empty object to get all assets, pass with "name" and "building" to search. 
  //pass building with exact string, name for regex search.
  //when passing building, either pass complete matching string or empty ("")
  console.log("Triggering");
  console.log("req.body", Object.keys(req.body).length);
  if (Object.keys(req.body).length !== 0) {
    var namergx = new RegExp(req.body.name, "i");
    var buildingrgx = new RegExp(req.body.building, "i");
    console.log("name", req.body.name);
    console.log("buildingType", req.body.building);
    const qassets = await AssetSpecification.find({
      name: namergx,
      buildingType: buildingrgx,
    });
    console.log("qassets", qassets);
    res.status(200).json(qassets);
  } else {
    const allassets = await AssetSpecification.find();
    console.log("allassets", allassets);
    res.status(200).json(allassets);
  }
};

module.exports = {
  getAsset,
};
