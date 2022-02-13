module.exports = class Game {
  constructor() {
    this.status = 'pregame';
    this.round = 1;
    this.players = [];
    this.guessHistory = [];
  }

  getStatus() {
    return this.status;
  }

  newPlayer(player) {
    if (this.players.length == 0) {
      this.players.push(player);
      return `${player} added to the game`;
    } else {
      this.players.push(player);
      this.status = 'running game';
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
      return 'waiting for other player to submit guess';
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
      this.status = 'game over';
      return 'match';
    } else {
      this.round++;
      return 'no match';
    }
  }
};
