import React from 'react';
import Song from './Song';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Playlist = ({ queue }) => {
  const getQueue = () => {
    return queue.map((value) => {
      return (
        <CSSTransition timeout={1000} classNames='song'>
          <Song key={value.key} name={value.name} source={value.source} />
        </CSSTransition>
      );
    });
  };

  return (
    <div className='container container-in'>
      <h1 className='playlist-title'>Your Queue</h1>
      <div className='songList'>
        {queue.length === 0 ? (
          <p>Queue is empty</p>
        ) : (
          <TransitionGroup>{getQueue()}</TransitionGroup>
        )}
      </div>
    </div>
  );
};

export default Playlist;
