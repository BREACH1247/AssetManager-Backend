const express = require("express");
const router = express.Router();
const assetSchedulingController = require("../Controllers/AssetSchedulingRecord");

router.post("/scheduleCreation", assetSchedulingController.createSchedule);

module.exports = router;
