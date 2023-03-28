import React from 'react';
import Header from '../../components/Header';
import InProgress from '../../components/InProgress';
import styles from './Profile.module.css';

function Profile() {
  return (
    <div className={ styles.pageProfile }>
      <Header />
      <InProgress />
    </div>
  );
}

export default Profile;
