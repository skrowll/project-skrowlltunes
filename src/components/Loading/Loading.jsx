import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loading.module.css';

function Loading(props) {
  const { size } = props;
  const loaserSize = {
    '--size': size,
  };
  return (
    <div
      className={ styles.loader }
      style={ loaserSize }
    >
      ...
    </div>
  );
}

Loading.propTypes = {
  size: PropTypes.string.isRequired,
};

export default Loading;
