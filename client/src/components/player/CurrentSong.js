import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const CurrentSong = ({ name, pp }) => {
  const [currentName, setcurrentName] = useState('');
  useEffect(() => {
    setcurrentName(name);
  }, [, currentName]);
  return (
    <div className='current-song-container'>
      {/* <img src={pp} alt='' /> */}
      <Marquee gradient={false} className='current-song'>
        {currentName}
      </Marquee>
    </div>
  );
};

export default CurrentSong;
