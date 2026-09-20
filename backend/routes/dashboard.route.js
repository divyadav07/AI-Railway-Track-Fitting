const express = require("express");
const router= express.Router();
const authMiddleware = require("../middleware/auth.middleware")

const { getTotalAssets ,getHealthyAssets ,getNeedsInspectionAssets, getCriticalAssets ,getAverageHealth, getAssetsByFittingType ,getAssetsByLocation, getRecentAssets ,getCriticalAssetsDetails } = require("../controllers/dashboard.controller");

router.use(authMiddleware);

router.get("/getTotalAssets", getTotalAssets);
router.get("/getHealthyAssets", getHealthyAssets);
router.get("/getNeedsInspectionAssets", getNeedsInspectionAssets);
router.get("/getCriticalAssets", getCriticalAssets);
router.get("/getAverageHealth", getAverageHealth);
router.get("/getAssetsByFittingType", getAssetsByFittingType);
router.get("/getAssetsByLocation", getAssetsByLocation);
router.get("/getRecentAssets", getRecentAssets);
router.get("/getCriticalAssetsDetails", getCriticalAssetsDetails);

module.exports = router;
