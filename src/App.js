import './App.css';
import Banner from './components/banner';
import MovieList from './components/MovieList';
import NavBar from './components/navbar'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Fav from './components/fav';

function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<><Banner /><MovieList /></>} />
          <Route path="/favourites" element={<Fav/>} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;