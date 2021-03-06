const express = require('express');
const router = express.Router();
const YoutubeModel = require('../models/youtube');
const query = require('../controller/youtube/query');

const ytsr = require('ytsr');

//write data
router.post('/query/', async (req, res) => {
  const data = req.body;
  const check = await query.checkSong(data.sourceID);
  if (check) {
    const send = (({ _id, __v, date, ...newValue }) => newValue)(check)._doc;
    res.send({ data: send, status: 200 });
  } else {
    const newSong = await query.createSong(data);
    const send = (({ _id, __v, date, ...newValue }) => newValue)(newSong);
    res.send({ data: send, status: 200 });
  }
});

//Get suggestions
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
            sourceID: result.items[index].id,
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

//------------------------------------------------------------------------//
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
