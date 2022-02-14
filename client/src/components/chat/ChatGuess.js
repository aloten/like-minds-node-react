import { useState, useContext } from 'react';
import PlayerContext from '../../context/playerContext';

const ChatGuess = ({ onGuessSubmit }) => {
  const playerContext = useContext(PlayerContext);
  const { gameStatus } = playerContext;

  const [guess, setGuess] = useState('');

  const onChange = (e) => {
    setGuess(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onGuessSubmit(e);
    setGuess('');
  };

  return (
    <form className='guessContainer' onSubmit={onSubmit}>
      <input
        type='text'
        className='guessInput'
        placeholder='Enter your guess here'
        name='guess'
        value={guess}
        onChange={onChange}
        disabled={gameStatus == 3 || gameStatus == 5}
      />
      <button
        className='btn btn-success'
        type='submit'
        disabled={gameStatus == 3 || gameStatus == 5}
      >
        Submit guess
      </button>
    </form>
  );
};

export default ChatGuess;
