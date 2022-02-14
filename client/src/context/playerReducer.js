import {
  NEW_PLAYER,
  GET_PLAYERS,
  NEW_GUESS,
  GET_CURRENT_ROUND,
  GAME_OVER,
  RESTART_GAME,
} from './types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;
    case NEW_PLAYER:
      return {
        ...state,
        myPlayerName: action.payload.player,
        gameStatus: 1,
      };
    case GET_PLAYERS:
      return {
        ...state,
        players: action.payload.players,
        gameStatus: action.payload.gameStatus,
      };
    case NEW_GUESS:
      return {
        ...state,
        gameStatus: action.payload.gameStatus,
      };
    case GET_CURRENT_ROUND:
      return {
        ...state,
        guessHistory: [...state.guessHistory, action.payload.currentRound],
        gameStatus: action.payload.gameStatus,
      };
    case GAME_OVER:
      return {
        ...state,
        gameStatus: 5,
      };
    case RESTART_GAME:
      return {
        ...state,
        myPlayerName: '',
        players: null,
        guessHistory: [],
        gameStatus: 0,
      };
  }
};
