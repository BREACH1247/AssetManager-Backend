const express = require("express");
const router = express.Router();
const getAssetController = require("../Controllers/GetAsset");

router.get("/getAsset", getAssetController.getAsset);

module.exports = router;
