const express = require('express');
const router = express.Router();

const Game = require('./Game');

const game = new Game();

router.get('/', (req, res) => {
  res.json('Run some of our routes!');
});

router.get('/guessHistory', async (req, res) => {
  const guessHistory = await game.getGuessHistory();
  res.json(guessHistory);
});

router.post('/newPlayer', async (req, res) => {
  const player = req.body.player;
  try {
    const result = await game.newPlayer(player);
    const status = await game.getStatus();
    res.status(201);
    res.json({ status, result });
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/getPlayers', async (req, res) => {
  try {
    const players = await game.getPlayers();
    res.json(players);
  } catch (error) {
    res.status(500);
  }
});

router.post('/newGuess', async (req, res) => {
  const player = req.body.player;
  const guess = req.body.guess;
  try {
    const result = await game.newGuess(player, guess);
    const status = await game.getStatus();
    res.status(201);
    res.json({ status, result });
  } catch (error) {
    res.status(500).send();
  }
});

// restart game
// router.post('/burn')

module.exports = router;
