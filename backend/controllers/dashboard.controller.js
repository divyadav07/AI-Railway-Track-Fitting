const { 
    getTotalAssetsModel ,
    getHealthyAssetsModel ,
    getNeedsInspectionAssetsModel ,
    getCriticalAssetsModel ,
    getAverageHealthModel,
    getAssetsByFittingTypeModel, 
    getAssetsByLocationModel, 
    getRecentAssetsModel , 
    getCriticalAssetsDetailsModel
  } = require("../models/dashboard.model");

getTotalAssets = (req, res)=>{

    getTotalAssetsModel((err, data) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch total assets",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Total assets fetched successfully",
            totalAssets: data
        });

    });
};

getHealthyAssets = (req,res)=>{

    getHealthyAssetsModel((err,data)=>{

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch total assets",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Total assets fetched successfully",
            totalAssets: data
        });

    })
}

getNeedsInspectionAssets = (req,res)=>{

    getNeedsInspectionAssetsModel((err,data)=>{

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch total assets",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Total assets fetched successfully",
            totalAssets: data
        });

    })
}

getCriticalAssets = (req,res)=>{

    getCriticalAssetsModel((err,data)=>{

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch total assets",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Total assets fetched successfully",
            totalAssets: data
        });

    })
}

getAverageHealth = (req,res) =>{

    getAverageHealthModel((err,data)=>{

        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Failed to fetch average health"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Average health fetched successfully",
            data: data
        });

    })
}

getAssetsByFittingType = (req,res) =>{

    getAssetsByFittingTypeModel ((err,data)=>{

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch assets by fitting type",
                error: err
            });
        }

        res.status(200).json({
            success: true,
            message: "Assets by fitting type fetched successfully",
            data: data
        });

    })
}


const getAssetsByLocation = (req, res) => {

    getAssetsByLocationModel((err, data) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to fetch assets by location",
                error: err
            });

        }

        res.status(200).json({
            success: true,
            message: "Assets by location fetched successfully",
            data: data
        });

    });

};

const getRecentAssets = (req, res) => {

    getRecentAssetsModel((err, data) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to fetch recent assets",
                error: err
            });

        }

        res.status(200).json({
            success: true,
            message: "Recent assets fetched successfully",
            data: data
        });

    });

};

const getCriticalAssetsDetails = (req, res) => {

    getCriticalAssetsDetailsModel((err, data) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Failed to fetch critical asset details",
                error: err
            });

        }

        res.status(200).json({
            success: true,
            message: "Critical asset details fetched successfully",
            data: data
        });

    });

};

module.exports = {
    getTotalAssets,
    getHealthyAssets,
    getNeedsInspectionAssets,
    getCriticalAssets,
    getAverageHealth,
    getAssetsByFittingType,
    getAssetsByLocation,
    getRecentAssets,
    getCriticalAssetsDetails
}