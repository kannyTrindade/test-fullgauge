import React, { useState } from 'react';
import Modal from 'react-modal';
import { useModalStore } from '../../store/modal';
import { useUserStore } from '../../store/user';
import { usePaginationStore } from '../../store/pagination';
import { Container, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Form from '../form';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all linear 0.2s'
  },
};

const closeButtonStyles = {
  position: 'absolute',
  top: 16,
  right: 16,
  background: 'none',
  border: 'none',
  fontWeight: 'bold',
  cursor:'pointer'
}

const ModalComponent = () => {
  const { isOpen, modalType, modalTitle, firstName, lastName, idUser, toggleModal, updateFirstName, updateLastName, clearForm } = useModalStore();
  const { removeUser } = useUserStore();
  const { handlePage } = usePaginationStore();

  function handleClickDelete(id: number) {
    removeUser(id);
    handlePage(1);
    toggleModal();
    clearForm();
  }

  if(modalType != 'Delete'){
    return (
      <Modal ariaHideApp={false} style={modalStyles} isOpen={isOpen} onRequestClose={toggleModal} shouldCloseOnOverlayClick={true}>
        <Container sx={{display: 'flex', maxWidth: '400px', flexDirection: 'column'}}>
        <h2>{modalTitle}</h2>
          <Form type={modalType} id={idUser}/>
        </Container>
        <button style={closeButtonStyles} onClick={toggleModal}>X</button>
      </Modal>
    );
  }
  
  return (
    <Modal ariaHideApp={false} style={modalStyles} isOpen={isOpen} onRequestClose={toggleModal} shouldCloseOnOverlayClick={true}>
      <h2>{modalTitle}</h2>
      <form>
        <h3>Gostaria de Deletar o usuário {firstName} {lastName}? </h3>
        <Button sx={{ float: "right" }} variant="contained" onClick={() => handleClickDelete(idUser)}>Sim</Button>
      </form>
      <button style={closeButtonStyles} onClick={toggleModal}>X</button>
    </Modal>
  );
  
};

export default ModalComponent;