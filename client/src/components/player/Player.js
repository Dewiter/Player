import React, { useReducer } from 'react';
import Search from './Search';
import Input from './Inputs/Inputs';
import { queryController } from '../../controller/queryController';
import Modal from '../modal/Modal';

const Player = () => {
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
    <div className='container container-out player'>
      {/* <Search handler={dispatch} state={state} /> */}
      <h1>placeholder</h1>
      <Input queue={state.queue} />
      {state.modalState && (
        <Modal
          modalContent={state.modalContent}
          modalType={state.modalType}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Player;
