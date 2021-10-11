const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating Schema for model
const YoutubeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  { collection: 'youtube' }
);

//creating model
const YoutubeModel = mongoose.model('youtube', YoutubeSchema);

module.exports = YoutubeModel;
