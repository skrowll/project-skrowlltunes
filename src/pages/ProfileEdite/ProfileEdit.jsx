import React from 'react';
import Header from '../../components/Header';
import InProgress from '../../components/InProgress';
import styles from './ProfileEdit.module.css';

function ProfileEdit() {
  return (
    <div className={ styles.pageProfileEdit }>
      <Header />
      <InProgress />
    </div>
  );
}

export default ProfileEdit;
