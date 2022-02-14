import { useContext } from 'react';
import PlayerContext from '../../context/playerContext';
import { useNavigate } from 'react-router-dom';

const PlayerForm = () => {
  const playerContext = useContext(PlayerContext);
  const { newPlayer } = playerContext;

  let navigate = useNavigate();

  const onSubmitPlayer = async (e) => {
    e.preventDefault();
    const form = e.target;
    const player = form.player.value;
    await newPlayer(player);
    navigate('/game');
  };

  return (
    <div className='playerFormContainer'>
      <form onSubmit={onSubmitPlayer}>
        <span>Please enter your name: </span>
        <input type='text' placeholder='name' name='player' />
        <button className='btn' type='submit'>Start game</button>
      </form>
    </div>
  );
};

export default PlayerForm;
