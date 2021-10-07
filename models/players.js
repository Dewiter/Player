const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
 name: {
  type:String,
  required:true
 },
 subscribe:{
  type:String,
  required:true
 },
 date:{
  type:Date,
  required:true,
  default:Date.now
 }
});

module.exports = mongoose.model('player', playerSchema);