

// Importation du modèle 'Video'
// Ce modèle est basé sur Mongoose, qui est une bibliothèque pour MongoDB.
const Video = require('../models/Video');

exports.getVideos = () => {

    return Video.find({}).exec();
}

exports.creatNewVideo = ({ titre, description, categorie, s3Key }) => {
    const newVideo = new Video({ titre, description, categorie, s3Key });
    return newVideo.save();
}

// Exporte une fonction appelée `deleteVideo`
exports.deleteVideo = (videoId) => {
    
    // La méthode `exec()` est utilisée pour exécuter la requête et renvoyer une promesse.
    return Video.findByIdAndDelete(videoId).exec();
  }
  