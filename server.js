const express = require('express');
const AssetSpec = require('./Models/AssetSpecification');
const AssetScheduling = require('./Models/AssetSchedule');
const maintenanceRec = require('./Models/MaintenanceRecord');
const mongoose = require("mongoose")


const app = express();
const port = 3000;
var uri = "mongodb://anyone:1234@ac-hceg3j7-shard-00-00.8f2jhii.mongodb.net:27017,ac-hceg3j7-shard-00-01.8f2jhii.mongodb.net:27017,ac-hceg3j7-shard-00-02.8f2jhii.mongodb.net:27017/?ssl=true&replicaSet=atlas-10esad-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set("strictQuery", false);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/recordCreation", async (req, res) => {
  const schedId = req.body[0];

  const doc = await maintenanceRec.exists({ schedID: schedId }
);

  console.log("Result :", doc)
  if(doc){
    console.log("true, add into");
    const updatedoc = await maintenanceRec.findOneAndUpdate(
      {schedID: schedId},
      {$push: {records: req.body[1]}})
    console.log(updatedoc)
  }
  else{
    console.log("false create one");
    const maintrecord = {
      schedID: schedId,
      records: [req.body[1]]
    }
    const newrecord = await maintenanceRec.create(maintrecord)
    console.log(newrecord);
    res.send(newrecord);
  }

  // const record = await maintenanceRec.create(req.body)
  // console.log(record);
  // res.send(record);
})

app.post("/scheduleCreation", async (req, res) => {
  //assetid - 0th element in req body, assetsched data (without object id) - 1
  const objectId = req.body[0];
  const doc = await AssetSpec.findById(objectId);
  console.log(doc)
  var newcount = doc.activityCount + 1;
  const docCheck = await AssetSpec.findOneAndUpdate({
    _id: objectId
}, { activityCount: newcount }, { upsert: true, useFindAndModify: false });
  console.log(docCheck)
  const schedObj = {
    assetID: objectId,
    activity: req.body[1].activity,
    activityNum: newcount,
    frequency: req.body[1].frequency,
  }

  const schedule = await AssetScheduling.create(schedObj)
  console.log(schedule);
})

app.post("/assetCreation", async (req, res) => {
  //send request without activityCount as that will be set by backend to be 0 at the start
  const assetobj = {
    buildingType: req.body.buildingType,
    name: req.body.name,
    specification: req.body.specification,
    description: req.body.description,
    activityNum: 0,
    frequency: req.body.frequency
  }
  const asset = await AssetSpec.create(assetobj)
  console.log(asset);
  res.send(asset);
})


mongoose.connect(uri).then(()=>{
  app.listen(port, ()=>{
      console.log(`App running on port ${port}`)
  })
}).catch((err)=>{
  console.log("error uwu\n", err)
})