import React from 'react';
import Header from '../../components/Header';
import InProgress from '../../components/InProgress';
import styles from './Favorites.module.css';

function Favorites() {
  return (
    <div className={ styles.pageFavorites }>
      <Header />
      <InProgress />
    </div>
  );
}

export default Favorites;
