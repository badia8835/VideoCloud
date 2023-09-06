const express = require('express');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const aws = require('aws-sdk');

const path = require('path');
const videosRouter = require('./routes/videos');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = "mongodb+srv://6220230:badia2023@cluster0.cuju86u.mongodb.net/video?retryWrites=true&w=1";

// Configure AWS S3
aws.config.update({
  accessKeyId: 'AKIA3A7AVTYTWRZSRVUG',
  secretAccessKey: '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',
  region: 'us-east-2',
});

// Middleware pour analyser le corps des requêtes au format JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(mongoURI, {
  useNewUrlParser: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
});

app.set('view engine', 'pug');
app.set('views', './views');

app.use( videosRouter);

app.get('/ajouter-video', (req, res) => {
  res.render('ajouter-video');
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});