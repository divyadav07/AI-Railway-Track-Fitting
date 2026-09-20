const db = require("../config/database");

const generateQrcodeModel = (assetID, qrCode , callback)=> {

    const sql = `
        UPDATE asset
        SET QRCode = ?
        WHERE AssetID = ?
    `;

    db.query(sql, [qrCode,assetID], (err, data)=> {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

const getQrCodeModel = (id, callback) => {

    const sql = `
        SELECT AssetID, QRCode
        FROM asset
        WHERE AssetID = ?
    `;

    db.query(sql, [id], (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });
};

const scanQrCodeModel = (qrCode, callback) => {

    const sql = `
        SELECT *
        FROM asset
        WHERE QRCode = ?
    `;

    db.query(sql, [qrCode], (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });
};

const updateQrCodeModel = (assetID, qrCode, callback) => {

    const sql = `
        UPDATE asset
        SET QRCode = ?
        WHERE AssetID = ?
    `;

    db.query(sql, [qrCode, assetID], (err, data) => {

        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }

    });
};

module.exports = {
    generateQrcodeModel,
    getQrCodeModel,
    scanQrCodeModel,
    updateQrCodeModel
}