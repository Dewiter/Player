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
    // if (queue.length === 0) {
    //   playPause.current.disabled = true;
    //   prev.current.disabled = true;
    //   next.current.disabled = true;
    // } else {
    //   playPause.current.disabled = false;
    //   prev.current.disabled = false;
    //   next.current.disabled = false;
    // }
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
        playPause.current.classList.remove('playPause-not-pressed');
        playPause.current.classList.add('playPause-pressed');
        playPause.current.style.color = '#578cc5';

        //audio manipulation
        audio.src = queue[index].audio;
        audio.currentTime = currentTime;
        audio.play();
      }
    }
  };

  const pauseSong = () => {
    audio.pause();
    console.log(audio.currentTime);
    setCurrentTime(audio.currentTime);

    //Changing style
    playPause.current.style.color = 'black';
    playPause.current.classList.remove('playPause-pressed');
    playPause.current.classList.add('playPause-not-pressed');
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
    <div>
      <Button
        ref={prev}
        content='fas fa-backward'
        onclick={() => previousSong(currentSong)}
      />

      {!isPlaying ? (
        <Button
          content='fas fa-play'
          ref={playPause}
          onclick={() => playSong(currentSong)}
        />
      ) : (
        <Button
          content='fas fa-pause'
          ref={playPause}
          onclick={() => pauseSong()}
        />
      )}
      <Button
        ref={next}
        content='fas fa-forward'
        onclick={() => nextSong(currentSong)}
      />
      <audio id='audio'></audio>
    </div>
  );
};

export default Inputs;
