const AssetSpecification = require("../Models/AssetSpecification");
const AssetSchedule = require("../Models/AssetSchedule");

const createSchedule = async (req, res) => {
  // assetid - 0th element in req body, assetsched data (without object id) - 1
  const objectId = req.body[0];
  const doc = await AssetSpecification.findById(objectId);
  console.log(doc);
  var newcount = doc.activityCount + 1;
  const docCheck = await AssetSpecification.findOneAndUpdate(
    { _id: objectId },
    { activityCount: newcount },
    { upsert: true, useFindAndModify: false }
  );
  console.log(docCheck);
  const schedObj = {
    assetID: objectId,
    activity: req.body[1].activity,
    activityNum: newcount,
    frequency: req.body[1].frequency,
  };

  const schedule = await AssetSchedule.create(schedObj);
  console.log(schedule);
};

module.exports = {
  createSchedule,
};