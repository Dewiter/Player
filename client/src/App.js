import React, { useReducer } from 'react';
import Player from './components/player/Player';
import Search from './components/player/Search';
import Playlist from './components/player/Playlist';
import Modal from './components/modal/Modal';

import { queryController } from './controller/queryController';

function App() {
  const [state, dispatch] = useReducer(queryController, {
    queue: [],
    modalState: false,
    modalContent: '',
    modalType: '',
  });

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <>
      <div className='app-container'>
        <div className='media'>
          <Search handler={dispatch} state={state} />
          <Player queue={state.queue} />
        </div>
        <div className='playlist'>
          <Playlist queue={state.queue} />
        </div>
      </div>

      {state.modalState && (
        <Modal
          modalContent={state.modalContent}
          modalType={state.modalType}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default App;
