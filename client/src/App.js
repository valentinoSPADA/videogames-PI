
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx'
import NavBar from './components/Navbar.jsx';
import VideogameCreate from './components/Created.jsx';
import Details from './components/GameDetails.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing/>} />
      </Routes>
      <div>
        <NavBar />
        <Routes>
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/created' element={<VideogameCreate />} />
          <Route exact path='/videogame/:id' element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
