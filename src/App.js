import './App.css';
import React, { useState } from 'react';
import { AiOutlineCloseSquare } from "react-icons/ai";
 
function App() {
  const [films, setFilms] = useState([]);
  const [inputFilm, setInputFilm] = useState('');
  const [randomFilm, setRandomFilm] = useState('');

  const addFilm = () => {
    if (!inputFilm) {
      alert('Preencha o nome do filme');
      return;
    }

    setFilms([...films, inputFilm]);
    setInputFilm('');
  };

  const removeFilm = (index) => {
    const updatedFilms = [...films];
    updatedFilms.splice(index, 1);
    setFilms(updatedFilms);
  };

  const randomizeFilms = () => {
    if (films.length === 0) {
      alert('Adicione filmes antes de sortear.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * films.length);
    const randomSelectedFilm = films[randomIndex];
    setRandomFilm(randomSelectedFilm);
  };

  return (
    <div className="App">
      <h1>Noite de Filme</h1>
      <div>
        <div className='films-addeds'>
          <div className='selectores-box'>
            <div>
              <input 
                  type='text'
                  placeholder='Adicione o filme'
                  id='input-filme'
                  value={inputFilm}
                  onChange={(e) => setInputFilm(e.target.value)}
                />
              <button onClick={addFilm}>Adicionar</button>
            </div>
            <div className='films-box'>
              {films.map((film, index) => (
                <div key={index} className="film-item">
                  <p>{film}</p>
                  <button onClick={() => removeFilm(index)}> <AiOutlineCloseSquare /> </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='result-container'>        
          <button onClick={randomizeFilms}>Sortear Filme</button>
          {randomFilm && (
            <div className="random-film">
              <p>Filme Sorteado:</p>
              <h2>{randomFilm}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;