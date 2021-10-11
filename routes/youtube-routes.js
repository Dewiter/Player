const express = require('express');
const router = express.Router();
const YoutubeModel = require('../models/youtube');
const YoutubeDl = require('youtube-dl-exec');
const fs = require('fs');
const lamejs = require('lamejs');
const { Blob } = require('node-blob');

//write data
router.get('/add-content/:url', (req, res) => {
  YoutubeDl(req.params.url, { dumpSingleJson: true }).then((result) => {
    const data = new YoutubeModel({
      name: result.title,
      data: result.formats[0].url,
    });

    data.save((err) => {
      if (err) {
        console.error(err);
      } else {
        res.send(`${result.title}\n was send to db`);
      }
    });
  });
});

//get data
router.get('/get-content', (req, res) => {
  const query = YoutubeModel.find({});
  query.select('name');
  query.exec((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//find single
router.get('/single/:id', async (req, res) => {
  const query = await YoutubeModel.findById(req.params.id, { _id: false }).exec(
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ data: result.data });
      }
    }
  );
});

//delete
router.get('/delete/:id', async (req, res) => {
  const query = await YoutubeModel.findByIdAndDelete(req.params.id).exec(
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('- Deleted Item -');
      }
    }
  );
});

//update
router.get('/update/:id', async (req, res) => {
  const query = await YoutubeModel.findByIdAndUpdate(req.params.id, {
    name: 'luximor',
  }).exec((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('- Deleted Item -');
    }
  });
});

module.exports = router;
