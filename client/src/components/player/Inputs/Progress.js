import React, { useRef } from 'react';

const Progress = ({ player, playerHandler }) => {
  const progressRef = useRef(null);
  player.audio.addEventListener('timeupdate', () => {
    progressRef.current.style.width =
      (player.audio.currentTime / player.audio.duration) * 100 + '%';
    if (player.audio.currentTime >= player.audio.duration) {
      playerHandler({ type: 'NEXT' });
    }
  });
  return (
    <div className='container-out progress-container'>
      <div ref={progressRef} className='progress'></div>
    </div>
  );
};

export default Progress;
