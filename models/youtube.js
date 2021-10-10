const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//Creating Schema for model
const YoutubeSchema = new Schema({
    name: {
        type: String,
        isRequired: true
    },
    artiste: {
        type: String,
        isRequired: true
    }
}, {collection: 'youtube'});

//creating model
const YoutubeModel = mongoose.model('youtube', YoutubeSchema);

module.exports = YoutubeModel;