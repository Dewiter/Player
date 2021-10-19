import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const CurrentSong = ({ name }) => {
  const [currentName, setcurrentName] = useState('');
  useEffect(() => {
    setcurrentName(name);
  }, [, currentName]);
  return (
    <div className='current-song-container'>
      <Marquee className='current-song'>{currentName}</Marquee>
    </div>
  );
};

export default CurrentSong;
