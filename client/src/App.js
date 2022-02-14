import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home';
import Game from './components/pages/Game';

import PlayerState from './context/PlayerState';

function App() {
  return (
    <PlayerState>
      <BrowserRouter>
        <Header />
        <div className='main'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/game' element={<Game />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PlayerState>
  );
}

export default App;
