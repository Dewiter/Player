const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating Schema for model
const YoutubeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    stream: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: Object,
      require: true,
    },
    source: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      require: true,
    },
    user: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    sourceID: {
      type: String,
      required: true,
    },
  },
  { collection: 'youtube' }
);

//creating model
const YoutubeModel = mongoose.model('youtube', YoutubeSchema);

module.exports = YoutubeModel;
