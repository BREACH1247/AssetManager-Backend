const express = require("express");
const router = express.Router();
const assetSchedulingController = require("../Controllers/AssetSchedulingRecord");

router.post("/scheduleCreation", assetSchedulingController.createSchedule);
router.get("/getSchedList", assetSchedulingController.getSchedList);
router.post("/deleteActivity", assetSchedulingController.deleteActivity);
router.post("/updateActivity", assetSchedulingController.updateActivity);


module.exports = router;
