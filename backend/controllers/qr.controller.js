const QRCode = require("qrcode");
const { 
    generateQrcodeModel,
    getQrCodeModel,
    scanQrCodeModel,
    updateQrCodeModel
 } = require("../models/qr.model");

const generateQrcodeController = async (req,res) => {
    const { id } = req.params;

    try {

        // Value that will be stored inside QR code
        const qrValue = `QR-ASSET-${id}`;

        // Generate QR image
        const qrImage = await QRCode.toDataURL(qrValue);

        generateQrcodeModel(id, qrValue, (err,data)=> {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to save QR code",
                    error: err.message
                })
            }

            if(data.affectedRows===0) {
                return res.status(404).json({
                    success: false,
                    message: "Asset not found"
                })
            }

            return res.status(200).json({
                success : true,
                message : "QR code generated successfully",
                data: {
                    assetId: id,
                    qrValue: qrValue,
                    qrImage: qrImage
                }
            })
        })
    }

    catch (error) {

        // QR generation error
        return res.status(500).json({
            success: false,
            message: "Failed to generate QR code",
            error: error.message
        });
    }
    
}

const getQrCodeController = (req,res) => {

    const { id } = req.params;

    getQrCodeModel(id, (err, data) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch QR code",
                error: err.message
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Asset not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "QR code fetched successfully",
            data: data[0]
        });
    });
}

const scanQrCodeController = (req, res) => {

    const { qrCode } = req.params;

    scanQrCodeModel(qrCode, (err, data) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to scan QR code",
                error: err.message
            });
        }

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Invalid QR code or asset not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "QR code scanned successfully",
            metadata: data[0]
        });

    });
};

const updateQrCodeController = async (req, res) => {

    const { id } = req.params;

    try {

        // Generate new QR value
        const qrValue = `QR-ASSET-${id}-${Date.now()}`;

        // Generate QR image
        const qrImage = await QRCode.toDataURL(qrValue);

        updateQrCodeModel(id, qrValue, (err, data) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to update QR code",
                    error: err.message
                });
            }

            if (data.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Asset not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "QR code updated successfully",
                metadata: {
                    assetID: id,
                    qrCode: qrValue,
                    qrImage: qrImage
                }
            });

        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to generate new QR code",
            error: error.message
        });

    }
};

module.exports = {
    generateQrcodeController,
    getQrCodeController,
    scanQrCodeController,
    updateQrCodeController
}