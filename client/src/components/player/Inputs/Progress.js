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
    <div className='progress-container'>
      <div className='progress-bg'>
        <div ref={progressRef} className='progress'></div>
      </div>
    </div>
  );
};

export default Progress;
