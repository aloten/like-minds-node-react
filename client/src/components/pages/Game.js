import React, { useContext, useEffect } from 'react';
import ChatWindow from '../chat/ChatWindow';
import ChatGuess from '../chat/ChatGuess';
import PlayerContext from '../../context/playerContext';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const playerContext = useContext(PlayerContext);
  const { restartGame, gameStatus, newGuess, getCurrentRound } = playerContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (gameStatus === 0) {
      navigate('/');
    }
  }, [gameStatus]);

  const onRestartClick = () => {
    restartGame();
    navigate('/');
  };

  const onGuessSubmit = async (e) => {
    const form = e.target;
    const guess = form.guess.value;
    await newGuess(guess);
    getCurrentRound();
  };

  return (
    <div className='gamePage'>
      <button className='btn btn-danger' onClick={onRestartClick}>
        Restart game
      </button>
      <ChatWindow />
      <ChatGuess onGuessSubmit={onGuessSubmit} />
    </div>
  );
};

export default Game;
