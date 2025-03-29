import React, { useState } from 'react';
import Modal from 'react-modal';
import { useModalStore } from '../../store/modal';
import { useUserStore } from '../../store/user';
import { usePaginationStore } from '../../store/pagination';
import { Container, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Form from '../form';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

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

const closeButtonStyles: any = {
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
  const { resetPagination } = usePaginationStore();

  function handleClickDelete(id: number) {
    removeUser(id);
    resetPagination();
    toggleModal();
    clearForm();
  }

  if(modalType != 'Delete'){
    return (
      <Modal ariaHideApp={false} style={modalStyles} isOpen={isOpen} onRequestClose={toggleModal} shouldCloseOnOverlayClick={true}>
        <Container sx={{display: 'flex', maxWidth: '400px', flexDirection: 'column'}}>
        <h2 style={{'marginTop': '0'}}>{modalTitle}</h2>
          <Form type={modalType} id={idUser}/>
        </Container>
        <button data-testid="closeBtn" style={closeButtonStyles} onClick={toggleModal}><CancelRoundedIcon /></button>
      </Modal>
    );
  }
  
  return (
    <Modal ariaHideApp={false} style={modalStyles} isOpen={isOpen} onRequestClose={toggleModal} shouldCloseOnOverlayClick={true}>
      <form>
        <h3 style={{'marginTop': '0'}}>Gostaria de Deletar o usuário {firstName} {lastName}? </h3>
        <div className='cancelButtonsContainer'>
          <Button color="primary"variant="contained" onClick={toggleModal}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={() => handleClickDelete(idUser)}>Sim</Button>
        </div>
      </form>
      
      <button data-testid="closeBtn" style={closeButtonStyles} onClick={toggleModal}><CancelRoundedIcon /></button>
    </Modal>
  );
  
};

export default ModalComponent;