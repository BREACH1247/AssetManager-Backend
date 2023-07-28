const express = require("express");
const router = express.Router();
const assetSpecController = require("../Controllers/AssetSpecification");

router.post("/assetCreation", assetSpecController.createAsset);

module.exports = router;
