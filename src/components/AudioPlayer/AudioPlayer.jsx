import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import styles from './AudioPlayer.module.css';

function AudioPlayer(props) {
  const { track } = props;
  const [isPlaynig, setIsPlaying] = useState(false);
  const [isMuted, setIsMutedo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previousVolume, setPreviousVolume] = useState(0);
  const [totalTime, setTotalTime] = useState('00');
  const [currentTime, setCurrentTime] = useState('00');

  const audio = document.querySelector('audio');
  const currentVolume = document.querySelector(`.${styles.volume}`);
  const seekbar = document.querySelector(`.${styles.seekbar}`);

  const handleClickPause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const handleClickPlay = () => {
    audio.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    audio?.load();
    audio?.pause();
    setIsPlaying(false);
    setLoading(false)
  }, [track]);

  useEffect(() => {
    if (track && seekbar) {
      audio.onloadedmetadata = () => {
        setTotalTime(seekbar.max = Math.floor(audio.duration));
      };
    }
  }, [track, seekbar]);

  const volumeChange = () => {
    if (isMuted) {
      setIsMutedo(!isMuted);
    }
    audio.volume = currentVolume.value / 100;
  };

  const muteVolume = () => {
    setIsMutedo(!isMuted);
    if (!isMuted) {
      setPreviousVolume(currentVolume.value / 100);
      currentVolume.value = 0;
      audio.volume = currentVolume.value;
    }
    if (isMuted) {
      currentVolume.value = previousVolume * 100;
      audio.volume = currentVolume.value / 100;
    }
  };

  const update = (event) => {
    const time = Math.floor(event.target.currentTime);
    const TWO = 2;
    setCurrentTime((`00${time}`).slice(-TWO));
    seekbar.value = time;
  };

  const handleNext = () => {
    console.log('next');
    const next = document.querySelector('.next');
    if (next) {
      next.click();
    }
  };

  const endedAudio = () => {
    setIsPlaying(false);
    seekbar.value = '0';
    handleNext();
    audio.play();
    setIsPlaying(true);
  };

  return (
    <>
      <div className={ styles.leftContainer }>
        {
          loading
            ?(
              <Loading size="1" />
            ) : (
              <p>{ `${track?.trackNumber}. ${track?.trackName}` }</p>
              )
            }
      </div>
      <div className={ styles.centerContainer }>
        <div className={ styles.buttonContainer }>
          <button className="prev" type="button">
            <i className="material-symbols-outlined">
              skip_previous
            </i>
          </button>
          {
            isPlaynig
              ? (
                <button type="button" onClick={ handleClickPause }>
                  <i className="material-symbols-outlined">
                    pause
                  </i>
                </button>
              ) : (
                <button type="button" onClick={ handleClickPlay }>
                  <i className="material-symbols-outlined">
                    play_arrow
                  </i>
                </button>
              )
          }
          <button className="next" type="button">
            <i className="material-symbols-outlined">
              skip_next
            </i>
          </button>
        </div>
        <div className={ styles.durationContainer }>
          <span className={ styles.currentTime }>
            00:
            {currentTime}
          </span>
          <input
            className={ styles.seekbar }
            type="range"
            min="0"
          />
          <span className={ styles.totalTime }>
            00:
            { totalTime }
          </span>
        </div>
        <audio
          className={ styles.tagAudio }
          src={ track?.previewUrl }
          onTimeUpdate={ (event) => update(event) }
          preload="metadata"
          id="audio"
          onEnded={ endedAudio }
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
      <div className={ styles.rightContainer }>
        <button
          type="button"
          className={ styles.muteButton }
          onClick={ muteVolume }
        >
          {
            isMuted
              ? (
                <i className="material-symbols-outlined">
                  volume_off
                </i>
              ) : (
                <i className="material-symbols-outlined">
                  volume_up
                </i>
              )
          }
        </button>
        <input
          className={ styles.volume }
          type="range"
          min="0"
          max="100"
          onChange={ volumeChange }
          onInput={ volumeChange }
        />
      </div>
    </>
  );
}

AudioPlayer.propTypes = {
  track: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackNumber: PropTypes.number,
  }).isRequired,
};

export default AudioPlayer;
