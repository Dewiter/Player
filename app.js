//ENV
const dotenv = require('dotenv').config();
const path = require('path');

// express
const express = require('express');
const app = express();

//database
const mongoose = require('mongoose');

//Routes
const YoutubeRoutes = require('./routes/youtube-routes');

// app.use('/get-video/:url', dl);

//Create instance of db
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

app.use('/youtube', YoutubeRoutes);

//db handling error
db.on('error', (error) => {
  console.error(error);
});

//db do stuff on connection
db.once('open', () => {
  console.log('connected to database !!');
  app.listen(process.env.PORT, () => {
    console.log(`process started at PORT : ${process.env.PORT}`);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/test.html'), { test: 'hello' });
});
