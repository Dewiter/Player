import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Song from './Song';

const Playlist = ({ queue }) => {
  const { v4: uuidv4 } = require('uuid');
  const [playlist, setPlaylist] = useState([]);
  const playlistRef = useRef(null);

  useEffect(() => {
    setPlaylist((prev) => {
      console.log(prev);
      console.log(queue);
      return queue;
    });
  }, [queue]);

  return (
    <div ref={playlistRef} className='container container-in'>
      <h1>Your Queue</h1>
      {playlist.length === 0 ? (
        <p>Queue is empty</p>
      ) : (
        <TransitionGroup className='songList'>
          {playlist.map((value) => {
            const key = uuidv4();
            return (
              <CSSTransition key={key} timeout={3000} classNames='song'>
                <Song key={key} name={value.name} source={value.source} />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      )}
    </div>
  );
};

export default Playlist;
