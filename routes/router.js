const express = require('express');
const router = express.Router();

const Game = require('./game');

let game = new Game();

router.get('/', (req, res) => {
  res.json('Run some of our routes!');
});

// Reset game state on Node server
router.get('/restartGame', (req, res) => {
  game = new Game();
  res.json('Game restarted');
});

router.get('/guessHistory', async (req, res) => {
  const guessHistory = await game.getGuessHistory();
  const gameStatus = await game.getGameStatus();
  const body = { gameStatus, guessHistory };
  res.json(body);
});

router.get('/currentRound', async (req, res) => {
  const currentRound = await game.getCurrentRound();
  const gameStatus = await game.getGameStatus();
  const body = { gameStatus, currentRound };
  res.json(body);
});

router.post('/newPlayer', async (req, res) => {
  const player = req.body.player;
  try {
    const msg = await game.newPlayer(player);
    const gameStatus = await game.getGameStatus();
    const body = { gameStatus, msg };
    res.status(201);
    res.json(body);
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/getPlayers', async (req, res) => {
  try {
    const players = await game.getPlayers();
    const gameStatus = await game.getGameStatus();
    const body = { gameStatus, players };
    res.json(body);
  } catch (error) {
    res.status(500);
  }
});

router.post('/newGuess', async (req, res) => {
  const player = req.body.player;
  const newGuess = req.body.guess;
  try {
    const guess = await game.newGuess(player, newGuess);
    const gameStatus = await game.getGameStatus();
    const body = { gameStatus, guess };
    res.status(201);
    res.json(body);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
