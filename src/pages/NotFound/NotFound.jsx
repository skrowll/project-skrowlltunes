import React from 'react';
import Header from '../../components/Header';
import styles from './NotFound.module.css';
import desert from '../../assets/desert.svg';

function InProgress() {
  return (
    <div className={ styles.pageNotFound }>
      <Header />
      <main>
        <div className={ styles.textContainer }>
          <h1>404</h1>
          <h2>Página não encontrada</h2>
        </div>
        <div className={ styles.imageContainer }>
          <img className={ styles.desert } src={ desert } alt="desert" />
        </div>
      </main>
    </div>
  );
}

export default InProgress;
