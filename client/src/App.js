import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/pages/Home';

import PlayerState from './context/PlayerState';

function App() {
  return (
    <PlayerState>
      <BrowserRouter>
        <Header />
        <div className='main'>
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PlayerState>
  );
}

export default App;
