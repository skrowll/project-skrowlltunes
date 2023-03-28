import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import FavoriteIcon from '../../components/FavoriteIcon';
import AudioPlayer from '../../components/AudioPlayer';
import getMusics from '../../services/musicsAPI';
import styles from './Album.module.css';

function Album() {
  const { id } = useParams();

  const [tracks, setTracks] = useState([]);
  const [artistName, setArtistName] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [collectionImage, setCollectionImage] = useState('');
  const [collectionGenre, setCollectionGenre] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [activeId, setActiveId] = useState('');
  const [activeTrack, setActiveTrack] = useState({});

  const handleClick = (event) => {
    const { target } = event;
    if (target.classList.value.includes('track')) {
      const active = document.querySelector(`.${styles.active}`);
      active.classList.remove(`${styles.active}`);
      target.classList.add(`${styles.active}`);
      setActiveId(target.id);
    }
  };

  const handleNameClick = (event) => {
    const { target } = event;
    const parent = target.parentElement.parentElement;
    parent.click();
  };

  const handleActiceClass = () => {
    const trackContainer = document.querySelectorAll(`.${styles.track}`);
    trackContainer[0].classList.add(`${styles.active}`);
    setActiveId(trackContainer[0].id);
    trackContainer.forEach((element) => {
      element.addEventListener('click', (event) => {
        handleClick(event);
      });
    });
    const trackName = document.querySelectorAll(`.${styles.trackName}`);
    trackName.forEach((element) => {
      element.addEventListener('click', (event) => {
        handleNameClick(event);
      });
    });
  };

  const getInfos = (album) => {
    setArtistName(album[0].artistName);
    setCollectionName(album[0].collectionName);
    setCollectionImage(album[0].artworkUrl100);
    setCollectionGenre(album[0].primaryGenreName.toUpperCase());
    const date = new Date(album[0].releaseDate);
    const year = date.getFullYear();
    setReleaseYear(year);
    album.shift();
    setTracks(album);
  };

  const handleNext = () => {
    const next = document.querySelector(`.${styles.active}`).nextSibling;
    if (next) {
      next.click();
    }
  };

  const handlePrev = () => {
    const prev = document.querySelector(`.${styles.active}`).previousSibling;
    if (prev) {
      prev.click();
    }
  };

  useEffect(async () => {
    const response = await getMusics(id);
    getInfos(response);
    handleActiceClass();
    const next = document.querySelector('.next');
    next.addEventListener('click', () => {
      handleNext();
    });
    const prev = document.querySelector('.prev');
    prev.addEventListener('click', () => {
      handlePrev();
    });
  }, []);

  useEffect(() => {
    setActiveTrack(tracks.find((track) => track.trackId === Number(activeId)));
  }, [activeId]);

  useEffect(() => {
    document.createElement('audio');
  }, [activeTrack]);

  const milisecondsToMinutes = (milliseconds) => {
    const MIL = 1000;
    const SESSENTA = 60;
    const TRESK = 3000;
    const minutes = parseInt((milliseconds - TRESK) / MIL / SESSENTA, 10);
    const seconds = (parseInt(((milliseconds - TRESK) / MIL) % SESSENTA, 10))
      .toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={ styles.pageAlbum }>
      <Header />
      {
        tracks.length > 0
          && (
            <main>
              <aside>
                <img src={ collectionImage } alt={ collectionName } />
                <div className={ styles.collectionTextContainer }>
                  <h3 className={ styles.collectionName }>{collectionName}</h3>
                  <p className={ styles.artistName }>{artistName}</p>
                  <p className={ styles.genre }>{collectionGenre}</p>
                  <p className={ styles.year }>{releaseYear}</p>
                </div>
              </aside>
              <div className={ styles.trackList }>
                {
                  tracks.map((track) => (
                    <div
                      key={ track.trackId }
                      className={ styles.track }
                      id={ track.trackId }
                    >
                      <div className={ styles.trackName }>
                        <span>
                          {`${track.trackNumber}. ${track.trackName}`}
                        </span>
                      </div>
                      <div className={ styles.rightContainer }>
                        <FavoriteIcon track={ track } />
                        <span>
                          {milisecondsToMinutes(track.trackTimeMillis)}
                        </span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </main>
          )
      }
      <div className={ styles.playerContainer }>
        <AudioPlayer track={ activeTrack } />
      </div>
    </div>
  );
}

export default Album;
