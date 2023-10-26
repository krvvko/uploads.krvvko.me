const AWS = require('aws-sdk');
const config = require('../config');

const s3 = new AWS.S3({
    accessKeyId: config.AWS.AWSAccessKeyId,
    secretAccessKey: config.AWS.AWSSecretKey
});

async function uploadToAWS(files) {
    for (let file of files) {
        await s3.putObject({
            Bucket: config.AWS.bucketName,
            Key: file.originalname,
            Body: file.buffer,
            ACL: 'public-read'
        }).promise();
    }
}

module.exports = uploadToAWS;
