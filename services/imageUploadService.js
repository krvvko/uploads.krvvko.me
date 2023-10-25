const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const config = require('../config');
const path = require('path');

const s3 = new AWS.S3({
    accessKeyId: config.AWS.AWSAccessKeyId,
    secretAccessKey: config.AWS.AWSSecretKey
});

const storage = config.storage.useAWS
    ? multerS3({
        s3: s3,
        bucket: config.AWS.bucketName,
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + path.extname(file.originalname));
        }
    })
    : multer.diskStorage({
        destination: config.storage.uploads_local_path,
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error('Only jpeg and png images are allowed'));
        }
    }
});

exports.uploadMiddleware = upload.array('images');