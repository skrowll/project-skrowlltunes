import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './AlbumCard.module.css';

function AlbumCard(props) {
  const { album } = props;
  return (
    <Link
      className={ styles.albumCard }
      to={ `/album/${album.collectionId}` }
    >
      <img
        src={ album.artworkUrl100 }
        alt={ album.collectionName }
      />
      <h4
        data-text={ album.collectionName }
      >
        {album.collectionName}
      </h4>
      <p
        data-text={ album.artistName }
      >
        {album.artistName}
      </p>
    </Link>
  );
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
