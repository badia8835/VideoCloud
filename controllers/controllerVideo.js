const aws = require('aws-sdk');
const Video = require('../models/Video');

const { getVideos, creatNewVideo, deleteVideo} = require('../queries/queriesVideo');

// Contrôleur pour afficher la liste des videos.
exports.videoList = async (req, res, next) => {
  try {
    // Essaie de récupérer tous les videos depuis la base de données.
    const videos = await getVideos();
    res.render('videos', { videos });
  } catch(e) {
    console.error(err);
    res.status(500).send('Erreur de serveur le moment de recuperation de la lsite des videos');
  }
}

// Contrôleur pour créer un nouveau video.
exports.createNewVideo = async (req, res, next) => {
  try {
    // Récupère le corps de la requête, qui contient les informations du video.
    const { titre, description, categorie } = req.body;
    const { originalname, buffer } = req.file;

    const s3 = new aws.S3();
    // Upload video to S3
    const s3Key = `videos/${originalname}`;
    const params = {
      Bucket: 'streaming-videos-tp',
      Key: s3Key,
      Body: buffer,
    };
    await s3.upload(params).promise();
    
    await creatNewVideo({ titre, description, categorie, s3Key });
    res.redirect('/videos');

  } catch(error) {
    console.error(err);
    res.status(500).send('Erreur de serveur le moment de creation un video');

  }
}

exports.streamVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;    
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).send('Vidéo introuvable.');
    }

    const s3 = new aws.S3();
    const s3Key = video.s3Key;
    const params = {
      Bucket: 'streaming-videos-tp',
      Key: s3Key, // Remplacez par le chemin de votre vidéo dans S3
    };
  
    const videoStream = s3.getObject(params).createReadStream();
  
    // Spécifiez le type de contenu de la vidéo
    res.setHeader('Content-Type', 'video/mp4');
  
    // Diffusez la vidéo depuis S3
    videoStream.pipe(res);

  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la recherche de la vidéo.');
  }
}


// Exporte une fonction asynchrone nommée 'deleteVideo'.
exports.deleteVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    await deleteVideo(videoId);
    res.redirect('/videos');

  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors supprimer la vidéo.');
  }
}



