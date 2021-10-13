import React, { useState } from 'react';

const Inputs = ({ queue }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = new Audio();

  const play = () => {
    // setIsPlaying(!isPlaying);
    // if (queue) {
    //   if (isPlaying) {
    //     sound.play();
    //   } else {
    //     console.log('stop');
    //   }
    // }
    console.log(queue);
  };

  return (
    <div>
      <button className='btn-control'>
        <i className='fas fa-backward'></i>
      </button>
      <button className='btn-control' onClick={() => play(isPlaying)}>
        <i className='fas fa-play'></i>
      </button>
      <button className='btn-control'>
        <i className='fas fa-forward'></i>
      </button>
    </div>
  );
};

export default Inputs;
