import React, { useState, useEffect } from 'react';

const CurrentSong = ({ name }) => {
  const [currentName, setcurrentName] = useState('');
  useEffect(() => {
    //   const div = document.querySelector('.current-song-container');
    //   const current = document.createElement('h3');
    //   current.classList.add('current-song');
    setcurrentName(name);
    //   current.innerHTML = currentName;
    //   setInterval(() => {
    //     div.appendChild(current);
    //   }, 10000);
  }, [, currentName]);
  return (
    <div className='current-song-container'>
      <marquee className='current-song'>{currentName}</marquee>
    </div>
  );
};

export default CurrentSong;
