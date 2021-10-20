const YoutubeModel = require('../../models/youtube');
const YoutubeDl = require('youtube-dl-exec');

const checkSong = async (sourceID) => {
  const data = await YoutubeModel.find({ sourceID: sourceID });
  return data;
};

const generateStream = async (id) => {
  const result = await YoutubeDl(id, { dumpSingleJson: true });

  return result.formats[0].url;
};

const createSong = async (data) => {
  const stream = await generateStream(data.sourceID);
  const entry = {
    ...data,
    source: 'youtube',
    count: 0,
    date: new Date().getTime(),
    stream: stream,
  };
  const response = new YoutubeModel(entry);
  response.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  return entry;
};

module.exports = { checkSong, createSong };
