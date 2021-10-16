import React, { useState } from 'react';

const Volume = ({ playerHandler }) => {
  const [volume, setVolume] = useState(0);
  const updateVolume = (e) => {
    setVolume(e.target.volume);
    playerHandler({ type: 'VOLUME', payload: e.target.value / 100 });
  };
  return (
    <input value={volume} onChange={(e) => updateVolume(e)} type='range' />
  );
};

export default Volume;
