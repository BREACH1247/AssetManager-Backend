const AssetSpecification = require("../Models/AssetSpecification");
const AssetSchedule = require("../Models/AssetSchedule");

const createSchedule = async (req, res) => {
  // assetid - 0th element in req body, assetsched data (without object id) - 1
  //assetsched data = activity, frequency,

  const assetid = req.body[0];

  const doc = await AssetSpecification.findById(assetid);
  console.log(doc);
  var newcount = doc.activityCount + 1;
  const docCheck = await AssetSpecification.findOneAndUpdate(
    { _id: assetid },
    { activityCount: newcount },
    { upsert: true, useFindAndModify: false }
  );
  console.log(docCheck);

  const updatedoc = await AssetSchedule.findOneAndUpdate(
    { assetID: assetid },
    { $push: { activityList: req.body[1] } }
  );
  console.log(updatedoc);
  res.send(updatedoc);
  
};

const getSchedList = async (req, res) => {
  //req.body -> id -> assetID
  const schedlist = await AssetSchedule.find({
    assetID: req.body.id
  });
  console.log(schedlist[0].activityList);
  res.status(200).json(schedlist[0].activityList);
}

const deleteActivity = async (req, res) => {
  //req.body[0] -> actid -> ID of the activity in the array
  //req.body[1] -> assetid
  //req.body[2] -> documentID of assetscheduling doc

  const docid = req.body[2];
  const assetid = req.body[1];
  const actid = req.body[0];

  const removeAct = await AssetSchedule.findByIdAndUpdate(
    docid,
    {$pull : {activityList: {_id: actid}}},
    {new: true}
  )
  const doc = await AssetSpecification.findById(assetid);
  
  var newcount = doc.activityCount - 1;
  const docCheck = await AssetSpecification.findOneAndUpdate(
    { _id: assetid },
    { activityCount: newcount },
    { upsert: true, useFindAndModify: false }
  );
  console.log(docCheck);
  console.log(removeAct);
  res.send(removeAct)
}

const updateActivity = async (req, res) => {
  //req.body[0] -> actid -> ID of the activity in the array
  //req.body[1] -> documentID of assetscheduling doc
  //req.body[2] -> object with updated info (send same info if no updation) {activity, frequency}

  const docid = req.body[1];
  const actid = req.body[0];
  const updatedinfo = req.body[2];

  const toupdate = await AssetSchedule.updateOne(
    {_id: docid, "activityList._id" : actid},
    {
      $set: {
        "activityList.$.activity": updatedinfo.activity,
        "activityList.$.frequency": updatedinfo.frequency,
      }
    }
  )
  console.log(toupdate);
  res.send(toupdate)
}


module.exports = {
  createSchedule,
  getSchedList,
  deleteActivity,
  updateActivity
};
