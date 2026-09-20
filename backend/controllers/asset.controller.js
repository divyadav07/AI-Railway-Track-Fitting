const { createAsset , getAllAssets ,getAssetById ,updateAsset ,deleteAsset ,searchAssets ,getAssetsByStatusModel ,} = require("../models/asset.model");

const addAsset = (req,res)=>{

    const asset = req.body;

    createAsset(asset , (err,data)=>{
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Failed to create asset",
                error: err
            });
        }

        return res.status(201).json({
            status: "success",
            message: "Asset created successfully",
            data: data
        });
    });
};

const getAssets = (req, res) => {

    getAllAssets((err, data) => {

        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Failed to fetch assets",
                error: err
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Assets fetched successfully",
            data: data
        });
    });
};

const getAsset = (req, res) => {

    const AssetID = req.params.id;

    getAssetById(AssetID, (err, data) => {

        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Failed to fetch asset",
                error: err
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Asset not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Asset fetched successfully",
            data: data[0]
        });
    });
};

const updateAssetController = (req, res) => {

    const AssetID = req.params.id;
    const asset = req.body;

    updateAsset(AssetID, asset, (err, data) => {

        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Failed to update asset",
                error: err
            });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({
                status: "error",
                message: "Asset not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Asset updated successfully",
            data: data
        });
    });
};

const deleteAssetController = (req, res) => {

    const AssetID = req.params.id;

    deleteAsset(AssetID, (err, data) => {

        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Failed to delete asset",
                error: err
            });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({
                status: "error",
                message: "Asset not found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Asset deleted successfully"
        });
    });
};

const searchAsset = (req,res)=>{

    const search = req.query.search;

    if (!search) {
        return res.status(400).json({
            status: "error",
            message: "Please provide a search value"
        });
    }

    searchAssets(search, (err,data)=>{
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Failed to search assets",
                error: err
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No assets found"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Assets found successfully",
            data: data
        });
    });

};

const getAssetsByStatus = (req, res) => {

    const status = req.query.status;

    if (!status) {
        return res.status(400).json({
            status: "error",
            message: "Status is required"
        });
    }

    getAssetsByStatusModel(status, (err, data) => {

        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Failed to fetch assets by status",
                error: err
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No assets found with this status"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Assets fetched successfully",
            data: data
        });
    });
};


module.exports = {
    addAsset,
    getAssets,
    getAsset,
    updateAssetController,
    deleteAssetController,
    searchAsset,
    getAssetsByStatus
};