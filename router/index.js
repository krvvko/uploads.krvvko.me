const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/image-upload', apiController.uploadMiddleware, apiController.uploadHandler);

module.exports = router;