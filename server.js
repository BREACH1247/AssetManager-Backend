const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 3000;

const maintenanceRecordRoutes = require("./Routes/maintainenceRecord");
const assetSchedulingRoutes = require("./Routes/assetScheduling");
const assetSpecRoutes = require("./Routes/assetSpecification");
const getAssetRoutes = require("./Routes/getAssets.js")
const AssetSpecification = require("./Models/AssetSpecification")
var uri = "mongodb://anyone:1234@ac-hceg3j7-shard-00-00.8f2jhii.mongodb.net:27017,ac-hceg3j7-shard-00-01.8f2jhii.mongodb.net:27017,ac-hceg3j7-shard-00-02.8f2jhii.mongodb.net:27017/?ssl=true&replicaSet=atlas-10esad-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set("strictQuery", false);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect(uri).then(()=>{
  app.listen(port, ()=>{
      console.log(`App running on port ${port}`)
  })
}).catch((err)=>{
  console.log("error uwu\n", err)
})

//Routes
// Register routes
app.use("/recordCreation", maintenanceRecordRoutes);
app.use("/scheduleCreation", assetSchedulingRoutes);
app.use("/assetCreation", assetSpecRoutes);
app.get("/getAsset", async(req,res) => {
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
});