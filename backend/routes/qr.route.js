const express = require("express");
const router = express.Router();

const { 
    generateQrcodeController,
    getQrCodeController,
    scanQrCodeController,
    updateQrCodeController
 } = require('../controllers/qr.controller')

const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Generate QR Code
router.post("/generateQRCode/:id", generateQrcodeController);

router.get('/getQrCode/:id', getQrCodeController);

router.get('/scanQrCode/:qrCode', scanQrCodeController);

router.put('/updateQrCode/:id', updateQrCodeController)

module.exports = router;