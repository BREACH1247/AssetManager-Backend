const express = require("express");
const router = express.Router();
const assetSpecController = require("../Controllers/AssetSpecification");

router.post("/assetCreation", assetSpecController.createAsset);
router.post("/deleteAsset", assetSpecController.deleteAsset);
router.post("/updateAsset", assetSpecController.updateAsset);

module.exports = router;
