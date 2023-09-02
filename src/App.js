import './App.css';
import React, { useState, useEffect } from 'react';
import { AiOutlineCloseSquare } from "react-icons/ai";
import rulleteGif from './ruleta.gif';

function App() {
  const [films, setFilms] = useState([]);
  const [inputFilm, setInputFilm] = useState('');
  const [randomFilm, setRandomFilm] = useState('');

  const addFilm = () => {
    if (!inputFilm) {
      alert('Preencha o nome do filme');
      return;
    }

    const updatedFilms = [...films, inputFilm];
    setFilms([...films, inputFilm]);
    setInputFilm('');

    // Atualizar o localStorage com a lista de filmes
    localStorage.setItem('films', JSON.stringify(updatedFilms));
  };

  const removeFilm = (index) => {
    const updatedFilms = [...films];
    updatedFilms.splice(index, 1);
    setFilms(updatedFilms);

    // Atualizar o localStorage com a lista de filmes
    localStorage.setItem('films', JSON.stringify(updatedFilms));
  };

  const randomizeFilms = () => {
    let rullete = document.querySelector('div.container-rullete')
  
    if (films.length === 0) {
      alert('Adicione filmes antes de sortear.');
      return;
    }
    rullete.classList.add('container-rullete-on');
    const randomIndex = Math.floor(Math.random() * films.length);
    const randomSelectedFilm = films[randomIndex];
    setRandomFilm(randomSelectedFilm);

    setTimeout(() => {
      rullete.classList.remove('container-rullete-on');
    }, 5000);
  };

  // Carregar a lista de filmes do localStorage quando o componente é montado
  useEffect(() => {
    const storedFilms = localStorage.getItem('films');
    if (storedFilms) {
      setFilms(JSON.parse(storedFilms));
    }
  }, []);

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

      <div className='container-rullete'>
        <img src={rulleteGif} alt='roleta' />
      </div>

    </div>
  );
}

export default App;