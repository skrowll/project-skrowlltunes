import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { addSong, removeSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';
import styles from './FavoriteIcon.module.css';

function FavoriteIcon(props) {
  const { track } = props;
  const [favorites, setFavorites] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkFavorite = () => {
    if (favorites?.includes(track.trackId.toString())) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  useEffect(async () => {
    const favoriteSongs = await getFavoriteSongs();
    setFavorites(favoriteSongs);
  }, []);

  useEffect(async () => {
    checkFavorite();
  }, [favorites]);

  const handleChange = async ({ target }) => {
    if (target.checked === true) {
      setLoading(true);
      await addSong(track.trackId.toString());
      const favoriteSongs = await getFavoriteSongs();
      setFavorites(favoriteSongs);
      checkFavorite();
      setLoading(false);
    }
    if (target.checked === false) {
      setLoading(true);
      await removeSong(track.trackId.toString());
      const favoriteSongs = await getFavoriteSongs();
      setFavorites(favoriteSongs);
      checkFavorite();
      setLoading(false);
    }
  };

  return (
    <label
      htmlFor={ `favorite-${track.trackId}` }
      className={ styles.favoriteCheckbox }
    >
      <input
        type="checkbox"
        name="favorite"
        id={ `favorite-${track.trackId}` }
        onChange={ handleChange }
        checked={ checked }
      />
      {
        loading
          ? (
            <Loading size="1" />
          )
          : (
            <i className={ `${'material-symbols-outlined'} ${styles.favoriteIcon}` }>
              favorite
            </i>
          )
      }
    </label>
  );
}

FavoriteIcon.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number,
  }).isRequired,
};

export default FavoriteIcon;
