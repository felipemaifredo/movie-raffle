import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineCloseSquare } from "react-icons/ai";

import rulleteGif from './ruleta.gif';
import meuAudio from './audio.mp3';

function App() {
  const [films, setFilms] = useState([]);
  const [inputFilm, setInputFilm] = useState('');
  const [randomFilm, setRandomFilm] = useState('');
  const audioRef = useRef(null);

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

    // Reproduzir o áudio quando o botão de sorteio é clicado
    playAudio();

    setTimeout(() => {
      rullete.classList.remove('container-rullete-on');
    }, 11000);
  };

  // Função para reproduzir o áudio
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // Carregar a lista de filmes do localStorage quando o componente é montado
  useEffect(() => {
    const storedFilms = localStorage.getItem('films');
    if (storedFilms) {
      setFilms(JSON.parse(storedFilms));
    }
  }, []);

  const CreateCardFilm = ({ title, index }) => {
    return (
      <div key={index} className="film-item">
        <p>{title}</p>
        <button onClick={() => removeFilm(index)}> <AiOutlineCloseSquare /> </button>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Noite de Filme</h1>
      <div>
        <div className='films-addeds'>
          <div className='selectores-box'>
            <div id='box-select-film'>
              <input 
                  type='text'
                  placeholder='Adicione o filme'
                  id='input-filme'
                  value={inputFilm}
                  onChange={(e) => setInputFilm(e.target.value)}
                />
              <button id='add-filme-btn' onClick={addFilm}> + </button>
            </div>
            <div className='films-box'>
            {films.map((film, index) => (
              <CreateCardFilm key={index} title={film} />
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
      <audio ref={audioRef} src={meuAudio} volume={0.5} />
    </div>
  );
}

export default App;