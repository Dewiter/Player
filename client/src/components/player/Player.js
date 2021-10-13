import React, { useReducer } from 'react';
import Search from './Search';
import Input from './Inputs';
import { controller } from '../../controller';
import Modal from '../modal/Modal';

const Player = () => {
  const [state, dispatch] = useReducer(controller, {
    queue: [],
    modalState: false,
    modalContent: '',
    modalType: '',
  });

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <div className='player'>
      <Search handler={dispatch} state={state} />
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
