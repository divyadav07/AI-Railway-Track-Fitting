const db = require("../config/database");

// 1. Get total number of assets
const getTotalAssetsModel = (callback)=>{

    const sql = `
        SELECT COUNT(*) AS totalAssets
        FROM asset
    `;

    db.query(sql, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data[0]);
        }
    });

};

// 2. Get healthy assets
const getHealthyAssetsModel = (callback) => {

    const sql = `
        SELECT COUNT(*) AS healthyAssets
        FROM asset
        WHERE Status = 'Healthy'
    `;

    db.query(sql, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data[0]);
        }

    });
};

// 3. Get assets that need inspection
const getNeedsInspectionAssetsModel = (callback) => {

    const sql = `
        SELECT COUNT(*) AS needsInspection
        FROM asset
        WHERE Status = 'Needs Inspection'
    `;

    db.query(sql, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data[0]);
        }

    });
};

// 4. Get critical assets
const getCriticalAssetsModel = (callback) => {

    const sql = `
        SELECT COUNT(*) AS criticalAssets
        FROM asset
        WHERE Status = 'Critical'
    `;

    db.query(sql, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data[0]);
        }

    });
};

const getAverageHealthModel = (callback)=> {
    const sql = `
        SELECT ROUND(AVG(CurrentHealth), 2) AS averageHealth
        FROM asset
    `;

    db.query(sql, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data[0]);
        }

    });
}

const getAssetsByFittingTypeModel = (callback) =>{

    const sql = `
        SELECT FittingType, COUNT(*) AS total
        FROM asset
        GROUP BY FittingType
        ORDER BY total DESC
    `;

    db.query(sql, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });

};

const getAssetsByLocationModel = (callback) => {

    const sql = `
        SELECT Location, COUNT(*) AS total
        FROM asset
        GROUP BY Location
        ORDER BY total DESC
    `;

    db.query(sql, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });

};

const getRecentAssetsModel = (callback) => {

    const sql = `
        SELECT AssetID, FittingType, TrackNumber, Location,
               InstallationDate, CurrentHealth, Status
        FROM asset
        ORDER BY InstallationDate DESC
        LIMIT 5
    `;

    db.query(sql, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });

};

const getCriticalAssetsDetailsModel = (callback) => {

    const sql = `
        SELECT 
            AssetID,
            FittingType,
            TrackNumber,
            Location,
            InstallationDate,
            CurrentHealth,
            Status,
            QRCode
        FROM asset
        WHERE Status = ?
        ORDER BY CurrentHealth ASC
    `;

    db.query(sql, ["Critical"], (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });

};

module.exports = {
    getTotalAssetsModel,
    getHealthyAssetsModel,
    getNeedsInspectionAssetsModel,
    getCriticalAssetsModel,
    getAverageHealthModel,
    getAssetsByFittingTypeModel,
    getAssetsByLocationModel,
    getRecentAssetsModel,
    getCriticalAssetsDetailsModel
}