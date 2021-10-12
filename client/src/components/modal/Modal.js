import React, { useEffect } from 'react';

const Modal = ({ modalContent, modalType, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);

    document.querySelector('.modal').classList.add(modalType);
  }, [modalType]);

  return (
    <div className='modal'>
      <p>{modalContent}</p>
    </div>
  );
};

export default Modal;
