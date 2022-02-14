import React, { useContext, useState } from 'react';
import ChatWindow from '../chat/ChatWindow';
import ChatGuess from '../chat/ChatGuess';
import PlayerContext from '../../context/playerContext';
import PlayerForm from '../user/PlayerForm';
import Spinner from '../../misc/Spinner';

const Game = () => {
  const playerContext = useContext(PlayerContext);
  const { newPlayer, gameStatus, newGuess, getCurrentRound } =
    playerContext;
    
  const [playerFormOpen, setPlayerFormOpen] = useState(true);

  const onSubmitPlayer = async (e) => {
    e.preventDefault();
    const form = e.target;
    const player = form.player.value;
    await newPlayer(player);
    setPlayerFormOpen(false);
  };

  const onGuessSubmit = async (e) => {
    const form = e.target;
    const guess = form.guess.value;
    await newGuess(guess);
    getCurrentRound();
  };

  const gameRunning = gameStatus === 2 || gameStatus === 3 || gameStatus === 4;
  const gameLoading = gameStatus === 1;
  return (
    <div className='gamePage'>
      {gameLoading && <Spinner />}
      <ChatWindow />
      {gameRunning && <ChatGuess onGuessSubmit={onGuessSubmit} />}
      {playerFormOpen && <PlayerForm onSubmitPlayer={onSubmitPlayer} />}
    </div>
  );
};

export default Game;
