import React, { useReducer, useState } from 'react';
import Player from './components/player/Player';
import Search from './components/player/Search';
import Playlist from './components/player/Playlist';
import Modal from './components/modal/Modal';

import { notifController } from './controller/notifController';
import { playerController } from './controller/playerController';

function App() {
  const audio = document.querySelector('#audio');
  const [notif, dispatchNotif] = useReducer(notifController, {
    notifState: false,
    notifContent: '',
    notifType: '',
  });

  const [player, dispatchPlayer] = useReducer(playerController, {
    currentSong: {},
    queue: [],
    currentTime: 0,
    audio: audio,
    isPlaying: false,
    volume: 0.05,
  });

  const closeNotif = () => {
    dispatchNotif({ type: 'CLOSE_MODAL' });
  };

  return (
    <>
      <div className='app-container'>
        <div className='media'>
          <Search
            notifHandler={dispatchNotif}
            player={player}
            playerHandler={dispatchPlayer}
          />
          <Player player={player} playerHandler={dispatchPlayer} />
        </div>
        <div className='playlist'>
          <Playlist queue={player.queue} />
        </div>
      </div>

      {notif.notifState && (
        <Modal
          modalContent={notif.notifContent}
          modalType={notif.notifType}
          closeModal={closeNotif}
        />
      )}
    </>
  );
}

export default App;
