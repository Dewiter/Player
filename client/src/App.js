import React, { useReducer } from 'react';
import Player from './components/player/Player';
import Search from './components/player/Search';
import Playlist from './components/player/Playlist';
import Modal from './components/modal/Modal';
import Logo from './Logo';

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
    volume: 0,
  });

  const closeNotif = () => {
    dispatchNotif({ type: 'CLOSE_MODAL' });
  };

  return (
    <div className='app'>
      <aside className='nav'>
        <Logo />
      </aside>
      <div>
        <div className='search-container'>
          <Search
            notifHandler={dispatchNotif}
            player={player}
            playerHandler={dispatchPlayer}
          />
        </div>
        {player?.currentSong && (
          <h1 className='currentSong'>{player.currentSong.name}</h1>
        )}
        <div className='app-wrapper'>
          <div className='app-container'>
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
      </div>
    </div>
  );
}

export default App;
