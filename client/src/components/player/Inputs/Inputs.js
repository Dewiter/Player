import React from 'react';
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

      console.log('in play');
      playerHandler({ type: 'PLAY' });
    }
  };

  const pauseSong = () => {
    playerHandler({ type: 'PAUSE' });

    playPause.current.classList.remove('btn-pressed');
    playPause.current.classList.add('btn-not-pressed');
  };

  return (
    <div className='btn-media-container'>
      <Button
        ref={prev}
        content='backward'
        onclick={() => playerHandler({ type: 'PREV' })}
        customClass='btn-media, btn-prev-next'
      />

      {!player?.isPlaying ? (
        <Button
          content='play'
          ref={playPause}
          onclick={() => playSong()}
          customClass='btn-media, btn-play'
        />
      ) : (
        <Button
          content='pause'
          ref={playPause}
          onclick={() => pauseSong()}
          customClass='btn-media, btn-play'
        />
      )}
      <Button
        ref={next}
        content='forward'
        onclick={() => playerHandler({ type: 'NEXT' })}
        customClass='btn-media, btn-prev-next'
      />
    </div>
  );
};

export default Inputs;
