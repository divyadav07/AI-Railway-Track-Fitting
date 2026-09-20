const express = require("express");
const router = express.Router();
const { 
    addAsset ,
    getAssets ,
    getAsset, 
    updateAssetController, 
    deleteAssetController ,
    searchAsset ,
    getAssetsByStatus
 } = require("../controllers/asset.controller");
 
const authMiddleware=require("../middleware/auth.middleware");

router.use(authMiddleware);

router.post("/addAsset", addAsset);
router.get("/getAssets", getAssets);
router.get("/getAsset/:id", getAsset);
router.put("/updateAsset/:id", updateAssetController);
router.delete("/deleteAsset/:id", deleteAssetController);
router.get("/searchAsset", searchAsset);
router.get("/getAssetsByStatus", getAssetsByStatus);

module.exports = router;