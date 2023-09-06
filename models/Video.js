const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  titre: String,
  description: String,
  categorie: String,
  s3Key: String,
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
