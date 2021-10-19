const express = require('express');
const router = express.Router();
const YoutubeModel = require('../models/youtube');
const YoutubeDl = require('youtube-dl-exec');
const YoutubeSearch = require('youtube-search');
const checkLink = require('../middleware/checkLink');

const ytsr = require('ytsr');

//write data
router.get('/query/:url', (req, res) => {
  //queries youtube api and downloads song
  YoutubeDl(req.params.url, { dumpSingleJson: true })
    .then(async (query) => {
      YoutubeModel.find({ name: query.title }, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          // - Checks if song is already stored in db -
          // if not -->  create an entry
          if (result.length === 0) {
            const data = new YoutubeModel({
              name: query.title,
              data: query.formats[0].url,
              source: 'youtube',
            });
            data.save((err) => {
              if (err) {
                console.error(err);
              } else {
                console.log(data.id);
                res.send({
                  name: data.name,
                  audio: data.data,
                  source: data.source,
                  status: '200',
                });
              }
            });
            // if so --> retrieve already existing song
          } else {
            res.send({
              name: result[0].name,
              audio: result[0].data,
              source: result[0].source,
              status: '200',
            });
          }
        }
      })
        .clone()
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(404).send({ status: '404' });
    });
});

router.get('/suggestions/:song', async (req, res) => {
  const result = await ytsr(req.params.song, {
    pages: 1,
  });

  let data = [];
  for (let index = 0; index < 5; index++) {
    if (result.items[index]) {
      if (result.items[index].type === 'video') {
        data = [
          ...data,
          {
            id: result.items[index].id,
            author: result.items[index].author.name,
            name: result.items[index].title,
            thumbnail: result.items[index].bestThumbnail.url,
          },
        ];
      }
    }
  }
  res.send(data);
});

router.get('/expired/song', (req, res) => {
  YoutubeModel.find({ id: req.params.song }, (err, result) => {
    console.log(result);
  });
});

//Extra routes ment for testing purposes
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

//clear
router.get('/clear', async (req, res) => {
  const query = YoutubeModel.deleteMany({}, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('- success ! -');
    }
  });
});

module.exports = router;
