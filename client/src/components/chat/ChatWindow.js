import { useContext, useEffect, Fragment } from 'react';
import PlayerContext from '../../context/playerContext';
import ChatMessage from './ChatMessage';
import GameOverDialog from './GameOverDialog';

const ChatWindow = () => {
  const playerContext = useContext(PlayerContext);
  const {
    myPlayerName,
    getPlayers,
    players,
    newGuess,
    getCurrentRound,
    guessHistory,
    gameStatus,
  } = playerContext;

  useEffect(() => {
    getPlayers();
  }, []);

  const loading = <span>waiting for other player to join game...</span>;

  const chatMessages = (
    <div className='chatWindow'>
      {guessHistory.map((round) => {
        return (
          <div className='roundContainer' key={round.round}>
            <span className='roundTitle'>Round {round.round}</span>
            <div className='roundInline'>
              <ChatMessage
                round={round}
                player={players[1]}
                whichPlayer='other'
              />
              <ChatMessage
                round={round}
                player={players[0]}
                whichPlayer='own'
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Fragment>
      {gameStatus == 1 ? loading : chatMessages}
      {gameStatus === 5 && <GameOverDialog />}
    </Fragment>
  );
};

export default ChatWindow;
