module.exports = class Game {
  constructor() {
    this.gameStatus = 0;
    this.round = 1;
    this.players = [];
    this.guessHistory = [];
  }

  getGameStatus() {
    return this.gameStatus;
  }

  newPlayer(player) {
    if (this.players.length == 0) {
      this.players.push(player);
      this.gameStatus = 1;
      return `${player} added to the game`;
    } else if (this.players.length == 1) {
      this.players.push(player);
      this.gameStatus = 2;
      return `${player} added to the game`;
    }
  }

  getPlayers() {
    return this.players;
  }

  getGuessHistory() {
    return this.guessHistory;
  }

  getCurrentRound() {
    const gameStarted = this.guessHistory.length > 0;
    if (gameStarted) {
      const bothPlayersSubmitted =
        Object.keys(this.guessHistory[this.guessHistory.length - 1]).length ==
        3;
      if (bothPlayersSubmitted) {
        const currentRound = this.guessHistory[this.guessHistory.length - 1];
        return currentRound;
      }
    }
    return 'waiting for other player to submit guess';
  }

  // add an incoming guess to the guessHistory
  newGuess(player, guess) {
    if (this.guessHistory.length < this.round) {
      let roundData = {};
      roundData[player] = guess;
      roundData['round'] = this.round;
      this.guessHistory.push(roundData);
      this.gameStatus = 3;
      return guess;
    } else {
      this.guessHistory[this.round - 1][player] = guess;
      return this.evaluate();
    }
  }

  // Evaluate the guesses and if they are 'equal', call won function,
  // else call newRound function
  evaluate() {
    const guesses = this.guessHistory[this.round - 1];
    const guess1 = guesses[this.players[0]];
    const guess2 = guesses[this.players[1]];
    if (guess1.toLowerCase() == guess2.toLowerCase()) {
      this.gameStatus = 5;
      return 'match';
    } else {
      this.round++;
      this.gameStatus = 4;
      return 'no match';
    }
  }
};
