const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require('cors');
const maintenanceRecordRoutes = require("./Routes/maintainenceRecord");
const assetSchedulingRoutes = require("./Routes/assetScheduling");
const assetSpecRoutes = require("./Routes/assetSpecification");
const getAssetRoutes = require("./Routes/getAssets")
const authroutes = require("./Routes/user")
const jwtauth = require("./Controllers/JwtAuth")
var uri = "mongodb://anyone:1234@ac-hceg3j7-shard-00-00.8f2jhii.mongodb.net:27017,ac-hceg3j7-shard-00-01.8f2jhii.mongodb.net:27017,ac-hceg3j7-shard-00-02.8f2jhii.mongodb.net:27017/?ssl=true&replicaSet=atlas-10esad-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set("strictQuery", false);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

mongoose.connect(uri).then(()=>{
  app.listen(port, ()=>{
      console.log(`App running on port ${port}`)
  })
}).catch((err)=>{
  console.log("error uwu\n", err)
})

//Routes
// Register routes
app.post("/signup",authroutes)
app.post("/login",authroutes)
app.post("/recordCreation",jwtauth,maintenanceRecordRoutes);
app.post("/scheduleCreation",jwtauth, assetSchedulingRoutes);
app.post("/assetCreation",jwtauth, assetSpecRoutes);
app.post("/deleteAsset",jwtauth,assetSpecRoutes);
app.post("/updateAsset",jwtauth, assetSpecRoutes);
app.get("/getAsset",jwtauth, getAssetRoutes);
app.get("/getSchedList",jwtauth, assetSchedulingRoutes);
app.post("/deleteActivity",jwtauth, assetSchedulingRoutes);
app.post("/updateActivity",jwtauth, assetSchedulingRoutes);
app.get("/getMaintList",jwtauth, maintenanceRecordRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the maintenance and asset management API!");
});