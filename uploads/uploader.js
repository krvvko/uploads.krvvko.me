const multer = require('multer');
const config = require('../config');
const uploadToAWS = require('./aws');
const logToDB = require('../database/log');

const generateFilename = (req, file, cb) => {
    const currentDate = new Date().toISOString().replace(/[-T:\.Z]/g, '').slice(0, 14);
    if (!req.uploadCounter) {
        req.uploadCounter = 1;
    } else {
        req.uploadCounter += 1;
    }

    const filename = `${currentDate}-${req.uploadCounter}.${file.mimetype.split('/')[1]}`;
    cb(null, filename);
};

const storage = config.storage.useAWS ? multer.memoryStorage() : multer.diskStorage({
    destination: config.storage.uploads_local_path,
    filename: generateFilename
});

const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image!'), false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

async function handleUpload(req, res) {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No images uploaded or one of the files was not an image.');
    }

    if (config.storage.useAWS) {
        // If using AWS
        try {
            await uploadToAWS(req.files);

            // Log to SQLite
            logToDB(req, req.files.map(f => `${config.AWS.bucketName}.s3.amazonaws.com/${f.filename}`));

            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error uploading to AWS");
        }
    } else {
        try {
            logToDB(req, req.files.map(f => `${config.storage.uploads_local_path}${f.filename}`));

            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error uploading locally");
        }
    }
}

module.exports = {
    uploadMiddleware: upload.array('images'),
    handleUpload: handleUpload
};
