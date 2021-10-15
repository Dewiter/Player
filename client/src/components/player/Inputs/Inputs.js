import React, { useState, useEffect, useReducer } from 'react';
import Button from './Button';

const Inputs = ({ queue }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const playPause = React.createRef();
  const next = React.createRef();
  const prev = React.createRef();
  const audio = document.querySelector('#audio');

  useEffect(() => {
    if (queue.length === 1) {
      console.log('set to zero');
      setCurrentSong(0);
    }
  }, [queue]);

  const playSong = (index) => {
    audio.volume = 0.05;
    if (queue.length > 0) {
      if (!isPlaying) {
        //Chnaging style
        playPause.current.classList.remove('btn-not-pressed');
        playPause.current.classList.add('btn-pressed');
        playPause.current.style.color = '#578cc5';

        //audio manipulation
        audio.src = queue[index].audio;
        audio.currentTime = currentTime;
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const pauseSong = () => {
    audio.pause();
    console.log(audio.currentTime);
    setCurrentTime(audio.currentTime);

    //Changing style
    playPause.current.style.color = 'black';
    playPause.current.classList.remove('btn-pressed');
    playPause.current.classList.add('btn-not-pressed');
    setIsPlaying(false);
  };

  const previousSong = (index) => {
    setIsPlaying(false);
    audio.currentTime = 0;
    setCurrentSong(index);
    if (currentTime <= 5 || currentSong === 0) {
      setCurrentSong(() => {
        playSong();
        return 0;
      });
    } else {
      setCurrentSong(() => {
        playSong();
        return currentSong - 1;
      });
    }
  };

  const nextSong = (index) => {
    setIsPlaying(false);
    audio.currentTime = 0;
    setCurrentSong(index);
    if (currentSong + 1 < queue.length) {
      setCurrentSong(() => {
        playSong(currentSong + 1);
        return currentSong + 1;
      });
    } else {
      setCurrentSong(() => {
        playSong(0);
        return 0;
      });
    }
  };

  return (
    <div className='btn-media-container'>
      <Button
        ref={prev}
        content='backward'
        onclick={() => previousSong(currentSong)}
        customClass='btn-media'
      />

      {!isPlaying ? (
        <Button
          content='play'
          ref={playPause}
          onclick={() => playSong(currentSong)}
          customClass='btn-media'
        />
      ) : (
        <Button
          content='pause'
          ref={playPause}
          onclick={() => pauseSong()}
          customClass='btn-media'
        />
      )}
      <Button
        ref={next}
        content='forward'
        onclick={() => nextSong(currentSong)}
        customClass='btn-media'
      />
      <audio id='audio'></audio>
    </div>
  );
};

export default Inputs;
