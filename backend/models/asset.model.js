const db = require("../config/database");
const { searchAsset } = require("../controllers/asset.controller");

const createAsset = (asset, callback) => {

    const sql = `
        INSERT INTO Asset
        (FittingType, TrackNumber, Location, InstallationDate, CurrentHealth, Status, QRCode)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        asset.FittingType,
        asset.TrackNumber,
        asset.Location,
        asset.InstallationDate,
        asset.CurrentHealth,
        asset.Status,
        asset.QRCode
    ];

    db.query(sql, values, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });
};

const getAllAssets = (callback) => {

    const sql = "SELECT * FROM asset";

    db.query(sql, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });
};

const getAssetById = (AssetID, callback) => {

    const sql = "SELECT * FROM asset WHERE AssetID = ?";

    db.query(sql, [AssetID], (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });
};

const updateAsset = (AssetID, asset, callback) => {

    const sql = `
        UPDATE asset
        SET FittingType = ?,
            TrackNumber = ?,
            Location = ?,
            InstallationDate = ?,
            CurrentHealth = ?,
            Status = ?,
            QRCode = ?
        WHERE AssetID = ?
    `;

    const values = [
        asset.FittingType,
        asset.TrackNumber,
        asset.Location,
        asset.InstallationDate,
        asset.CurrentHealth,
        asset.Status,
        asset.QRCode,
        AssetID
    ];

    db.query(sql, values, (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });
};

const deleteAsset = (AssetID, callback) => {

    const sql = "DELETE FROM asset WHERE AssetID = ?";

    db.query(sql, [AssetID], (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });
};

const searchAssets = (search, callback) => {

    const sql = `
        SELECT * FROM asset
        WHERE AssetID = ?
        OR FittingType LIKE ?
        OR TrackNumber LIKE ?
        OR Location LIKE ?
        OR Status LIKE ?
    `;

    const values = [
        search,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
    ];

    db.query(
        sql,
        values,
        (err, data) => {

            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }

        }
    );
};

const getAssetsByStatusModel = (status, callback) => {

    const sql = "SELECT * FROM asset WHERE Status = ?";

    db.query(sql, [status], (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });
};

module.exports = {
    createAsset,
    getAllAssets,
    getAssetById,
    updateAsset,
    deleteAsset,
    searchAssets,
    getAssetsByStatusModel
    
};