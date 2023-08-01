const express = require("express");
const router = express.Router();
const maintenanceRecordController = require("../Controllers/MaintainenceRecord");

router.post("/recordCreation", maintenanceRecordController.createRecord);
router.get("/getMaintList", maintenanceRecordController.getMaintList);


module.exports = router;