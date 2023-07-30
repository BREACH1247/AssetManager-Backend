const express = require("express");
const router = express.Router();
const getAssetController = require("../Controllers/GetAssets");

router.get("/getAssets", getAssetController.getAsset);

module.exports = router;
