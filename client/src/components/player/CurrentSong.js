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
      <h3 className='current-song'>{currentName}</h3>
    </div>
  );
};

export default CurrentSong;
