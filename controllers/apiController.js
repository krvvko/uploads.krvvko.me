const uploadService = require('../services/imageUploadService');
const db = require('../database');

exports.uploadMiddleware = uploadService.single('image');

exports.uploadHandler = (req, res) => {
    console.log('Img upload initialized');
    if (req.file) {
        const ip = req.ip;
        const userAgent = req.headers['user-agent'];
        const imagePath = req.file.path;

        db.run("INSERT INTO uploads (ip, user_agent, image_path) VALUES (?, ?, ?)", [ip, userAgent, imagePath], function(err) {
            if (err) {
                return res.status(500).send("Error saving to database");
            }
            console.log(`Img uploaded successfully, ${ip}, ${userAgent}, ${imagePath}`);
            res.status(200).send("Image uploaded successfully!");
        });
    } else {
        res.status(400).send("No image uploaded.");
    }
};
