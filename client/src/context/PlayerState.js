import { useReducer } from 'react';
import PlayerContext from './playerContext';
import playeReducer from './playerReducer';
import {
  NEW_PLAYER,
  GET_PLAYERS,
  NEW_GUESS,
  GET_CURRENT_ROUND,
  GAME_OVER,
  RESTART_GAME,
} from './types';

const PlayerState = (props) => {
  const initialState = {
    myPlayerName: '',
    players: null,
    guessHistory: [],
    gameStatus: 0,
  };

  const gameStatuses = {
    0: 'pregame; sign in as a player',
    1: 'waiting for other player to join',
    2: 'game started; ready to submit guess',
    3: 'waiting for other player to submit guess',
    4: 'round over; no word match; ready to submit guess',
    5: 'round over; yes word match; game over; you win!',
  };

  const [state, dispatch] = useReducer(playeReducer, initialState);

  // post a new player to server
  const newPlayer = async (player) => {
    try {
      const postURL = '/newPlayer';
      const body = { player: player };
      const postInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
      const res = await fetch(postURL, postInit);
      const json = await res.json();
      const gameStatus = json.gameStatus;
      // tricky syncing gameStatus at this step, so hardcoding 1 in reducer =>
      dispatch({ type: NEW_PLAYER, payload: { player, gameStatus } });
    } catch (error) {
      console.log(error);
    }
  };

  // if both players are not on server, recursively
  // call getPlayers until res returns both players
  const getPlayers = () => {
    setTimeout(async () => {
      console.log('getPlayers');
      try {
        const res = await fetch('/getPlayers');
        let json = await res.json();
        if (json.gameStatus === 2) {
          dispatch({
            type: GET_PLAYERS,
            payload: { gameStatus: json.gameStatus, players: json.players },
          });
        } else {
          getPlayers();
        }
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  };

  // post a new guess to server
  const newGuess = async (guess) => {
    try {
      const body = { guess: guess, player: state.myPlayerName };
      const postURL = '/newGuess';
      const postInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      };
      const res = await fetch(postURL, postInit);
      const json = await res.json();
      dispatch({
        type: NEW_GUESS,
        payload: { gameStatus: json.gameStatus },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // if both guesses of current round are not on server,
  // recursively call itself until res returns both guesses
  const getCurrentRound = async () => {
    setTimeout(async () => {
      console.log('getCurrentRound');
      try {
        const res = await fetch('/currentRound');
        let json = await res.json();
        if (json.gameStatus === 4 || json.gameStatus === 5) {
          dispatch({
            type: GET_CURRENT_ROUND,
            payload: {
              currentRound: json.currentRound,
              gameStatus: json.gameStatus,
            },
          });
          if (json.gameStatus === 5) {
            gameOver();
          }
        } else {
          getCurrentRound();
        }
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  };

  const gameOver = () => {
    dispatch({ type: GAME_OVER });
  };

  const restartGame = () => {
    fetch('/restartGame');
    dispatch({ type: RESTART_GAME });
  };

  return (
    <PlayerContext.Provider
      value={{
        myPlayerName: state.myPlayerName,
        players: state.players,
        guessHistory: state.guessHistory,
        gameStatus: state.gameStatus,
        newPlayer,
        getPlayers,
        newGuess,
        getCurrentRound,
        gameOver,
        restartGame,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerState;
