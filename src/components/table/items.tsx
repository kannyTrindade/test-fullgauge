import { useState } from 'react';
import Button from '@mui/material/Button';
import { useUserStore } from '../../store/user';
import { useModalStore } from '../../store/modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ButtonGroup, TableCell, TableRow } from '@mui/material';

type Props = { 
  props: {
    id: string,
    first_name: string,
    last_name: string,
    register_on: string
  }
}

const TableItems = (props: Props, key: number) => {

  let user = props.props;

  const { toggleModal, setModalType, setModalTitle, setUserProps } = useModalStore();

  function handleClickModalDelete(id: string, first_name: string, last_name: string, modalType : string) {
    toggleModal();
    setModalType(modalType);
    setModalTitle('');
    setUserProps(first_name, last_name, id);
  }

  function handleClickModalEdit(id: string, first_name : string, last_name: string, modalType : string) {
    toggleModal();
    setModalType(modalType);
    setModalTitle('Editar Usuário');
    setUserProps(first_name, last_name, id);
  }

  return (
    <>
    <TableRow key={key}>
      <TableCell></TableCell>
      <TableCell>{user.first_name}</TableCell>
      <TableCell>{user.last_name}</TableCell>
      <TableCell>{user.register_on}</TableCell>
      <TableCell sx={{textAlign: 'right'}}>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button data-testid="deleteButton" color="error" onClick={() => handleClickModalDelete(user.id, user.first_name, user.last_name, 'Delete')}><DeleteOutlineIcon fontSize="small" /></Button>
        <Button data-testid="editButton" color="primary" onClick={() => handleClickModalEdit(user.id, user.first_name, user.last_name, 'Edit')}><EditIcon fontSize="small" /></Button>
      </ButtonGroup>
      </TableCell>
      </TableRow>
    </>
  )
}

export default TableItems