/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Header from '../../components/Header';
import AlbumCard from '../../components/AlbumCard';
import Loading from '../../components/Loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import styles from './Search.module.css';

function Search() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [returnText, setReturnText] = useState('');

  const disabled = inputValue.length <= 0;

  const handleClick = async () => {
    setLoading(true);
    const response = await searchAlbumsAPI(inputValue);
    if (response.length === 0) {
      setReturnText('Nenhum álbum foi encontrado');
    } else {
      setReturnText(`Resultado de álbuns de: ${inputValue}`);
    }
    setAlbums(response);
    setLoading(false);
  };

  const searchButton = document.querySelector('.searchButton');
  document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchButton?.click();
    }
  });

  return (
    <div className={ styles.searchPage }>
      <Header />
      <div className={ styles.searchContainer }>
        <h1>Buscar</h1>
        <form className={ styles.searchForm } autoComplete="off">
          <label htmlFor="artist">
            <input
              type="text"
              name="artist"
              placeholder="Nome do Artista"
              className="searchInput"
              onChange={ (event) => setInputValue(event.target.value) }
              value={ inputValue }
            />
          </label>
          <button
            type="button"
            className="searchButton"
            onClick={ handleClick }
            disabled={ disabled }
          >
            <i className="material-symbols-outlined">search</i>
          </button>
        </form>
      </div>
      <div className={ styles.resultContainer }>
        {
          loading
            ? (<Loading size="6" />)
            : (
              albums.length > 0
                ? (
                  <section className={ styles.albumCardContainer }>
                    <p className={ styles.returnText }>{returnText}</p>
                    {albums.map((album) => (
                      <AlbumCard key={ album.collectionId } album={ album } />
                    ))}
                  </section>
                )
                : (
                  <p className={ styles.returnText }>{returnText}</p>
                )
            )
        }
      </div>
    </div>
  );
}

export default Search;
