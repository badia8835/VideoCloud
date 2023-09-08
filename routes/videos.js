const express = require('express');
const router = express.Router();
const multer = require('multer');
const aws = require('aws-sdk');

const { videoList, createNewVideo, streamVideo, deleteVideo} = require('../controllers/controllerVideo');


// Configure AWS S3
aws.config.update({
  accessKeyId: 'AKIA3A7AVTYTWRZSRVUG',
  secretAccessKey: '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',
  region: 'us-east-2',
});


// Configure Multer for video uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// liste toutes les videos
router.get('/videos', videoList);

// creer une nouveau video
router.post('/videos/upload', upload.single('video'), createNewVideo);

// Stream a video
router.get('/videos/stream/:id', streamVideo);

// delete a video
router.get('/delete-video/:id', deleteVideo);

module.exports = router;



