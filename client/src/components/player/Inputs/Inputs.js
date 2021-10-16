import React, { useEffect } from 'react';
import Button from './Button';
const Inputs = ({ player, playerHandler }) => {
  const playPause = React.createRef();
  const next = React.createRef();
  const prev = React.createRef();

  const playSong = () => {
    if (player.queue.length > 0) {
      //Changing style
      playPause.current.classList.remove('btn-not-pressed');
      playPause.current.classList.add('btn-pressed');
      playPause.current.style.color = '#578cc5';

      playerHandler({ type: 'PLAY' });
    }
  };

  const pauseSong = () => {
    playerHandler({ type: 'PAUSE' });

    //Changing style
    playPause.current.style.color = 'black';
    playPause.current.classList.remove('btn-pressed');
    playPause.current.classList.add('btn-not-pressed');
  };

  return (
    <div className='btn-media-container'>
      <Button
        ref={prev}
        content='backward'
        onclick={() => playerHandler({ type: 'PREV' })}
        customClass='btn-media'
      />

      {!player?.isPlaying ? (
        <Button
          content='play'
          ref={playPause}
          onclick={() => playSong()}
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
        onclick={() => playerHandler({ type: 'NEXT' })}
        customClass='btn-media'
      />
    </div>
  );
};

export default Inputs;
