const express = require("express");
const router = express.Router();
const getAssetController = require("../Controllers/GetAsset");

// Use router.get for a GET request
router.get("/getAsset", getAssetController.getAsset);

module.exports = router;
