const YoutubeDl = require('ytdl-core');
const fs = require('fs');

const getVideo = async (req, res) => {
  YoutubeDl(req.params.url).pipe(
    fs.createWriteStream(`./data/youtube/${req.params.url}.mp4`)
  );
  res.send(
    `Downloading : ${await (
      await YoutubeDl.getInfo(req.params.url)
    ).videoDetails.title}`
  );
};

module.exports = getVideo;
