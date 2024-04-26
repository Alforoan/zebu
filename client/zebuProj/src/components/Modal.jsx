/* eslint-disable react/prop-types */
import React from 'react';
import Modal from 'react-modal';


const MyModal = ({ isOpen, closeModal, modalPosition, handleConfirmDelete }) => {


  const modalContentStyles = {
    position: 'absolute',
    top: `${modalPosition?.top + 30}px`,
    left: `${modalPosition?.left - 100}px`,
    backgroundColor: 'white',
    paddingTop: '0',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingBottom: '25px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    marginBottom: '20px',
    width: '130px',
    height: '80px',
    overflow: 'hidden',

  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{ content: modalContentStyles }}
    >
      <h3 style={{textAlign:'center'}}>You sure?</h3>
      <div style={{display: 'flex'}}>
        <button style={{marginRight:'11px'}} onClick={handleConfirmDelete}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    </Modal>
  );
};

export default MyModal;

