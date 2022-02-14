import { useState } from 'react';
import PlayerForm from '../user/PlayerForm';

const Home = () => {
  const [playerFormOpen, setPlayerFormOpen] = useState(false);

  const onPlayGame = () => {
    setPlayerFormOpen(true);
  };

  return (
    <div>
      <button className='btn' onClick={onPlayGame}>Play game</button>
      {playerFormOpen && <PlayerForm />}
    </div>
  );
};

export default Home;
