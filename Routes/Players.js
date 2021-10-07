const express = require('express');
const router = express.Router();
const Player = require('../models/players')


//midleware
const getPlayer = async (req, res, next) => {
 try {
  player = await Player.findById(req.params.id);
  if (!player) {
   return res.status(404).json({ message: 'cannot find player' });
  }
 } catch (error) {
  res.status(500).json({ message:error.message });
 }

 res.player = player;
 next();
}

//GET
router.get('/', async (req, res) => {
 try {
  const players = await Player.find();
  res.send(players);
 }catch (error){
  res.status(500).json({message:error.message})
 }

})

//GET SPECIFIC
router.get('/:id', getPlayer ,(req, res) => {
 res.send(res.player)
})

//POST
router.post('/', async (req, res) => {
 const player = new Player({
  name:req.body.name,
  subscribe: req.body.subscribe
 });

 try {
  newPlayer = await player.save();
  res.status(201).json(newPlayer);
 } catch (error) {
  res.status(400).json({message:error.message})
 }
 
})


//UPDATE
router.patch('/:id', getPlayer, async (req, res) => {
 if (req.body.name) {
  res.player.name = req.body.name;
 } else if (req.body.subscribe) {
  res.player.subscribe = req.body.subscribe
 }
 try {
  const updatePlayer = await res.player.save();
  res.status(200).json(res.player);

 } catch (error) {
  res.status(400).json({message: error.message})
 }
})

//DELETE
router.delete('/:id', getPlayer,async (req, res) => {
  try {
   await res.player.remove();
   res.json({message: 'deleted user'})
  } catch (error) {
   res.status(500).json({ message: error.message })
  }
})
module.exports = router;