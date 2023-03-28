import React from 'react';
import styles from './InProgress.module.css';
import working from '../../assets/working.svg';

function InProgress() {
  return (
    <main className={ styles.inProgress }>
      <div className={ styles.textContainer }>
        <h1>Ops!</h1>
        <h2>Página em construção</h2>
      </div>
      <div className={ styles.imageContainer }>
        <img className={ styles.working } src={ working } alt="working" />
      </div>
    </main>
  );
}

export default InProgress;
