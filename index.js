const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const uploader = require('./uploads/uploader');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/image-upload', uploader.uploadMiddleware, uploader.handleUpload);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
