import React from 'react';
import Search from './youtube/Search';
import Input from './youtube/Inputs';

const Player = () => {
  return (
    <div className='player'>
      <Search />
      <Input />
    </div>
  );
};

export default Player;
