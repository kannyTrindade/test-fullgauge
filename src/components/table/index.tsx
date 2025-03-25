import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../store/user';
import { usePaginationStore } from "../../store/pagination";
import TableHeader from './header'
import TableItems from "./items";
import { Button, Pagination, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Modal from '../modal';
import { Margin } from '@mui/icons-material';
import ModalComponent from '../modal';
import { useModalStore } from '../../store/modal';
import * as XLSX from 'xlsx';

const Table = () => {

  const { listUsers, filteredResults, isLoading } = useUserStore();
  const { page, pageSize, totalPages, handlePage, setTotalPages} = usePaginationStore();

  const { toggleModal, setModalType, setModalTitle, clearForm } = useModalStore();
  
  function handleClickModalAdd() {
    toggleModal();
    clearForm();
    setModalType('Add');
    setModalTitle('Adicionar Usuário');
  }

  const exportToXLS = () => {
    const ws = XLSX.utils.json_to_sheet(filteredResults);  // Convertendo os dados para uma planilha
    const wb = XLSX.utils.book_new();  // Criando uma nova planilha
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');  // Adicionando a aba "Usuarios"
    XLSX.writeFile(wb, 'usuarios.xlsx');  // Gerando e baixando o arquivo
  };

  useEffect(() => {
    listUsers();
  },[])
  
  useEffect(() => {
    setTotalPages(filteredResults.length);
  },[isLoading])

  const setPages = Math.ceil(filteredResults.length / pageSize);
  let pageContent = filteredResults.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <TableContainer>
        <table style={{width: '100%', minWidth: '550px', margin: '15px 0', borderCollapse: 'collapse'}}>
        <TableHeader />
        <TableBody sx={{minHeight: '400px'}}>
        { filteredResults.length != 0 ? pageContent.map((content, key) =>(
          <TableItems props={content} key={key} />
        ))
        :
          <TableRow >
            <TableCell colSpan={6} sx={{textAlign: 'center'}}>
              Sem resultados disponíveis
            </TableCell>
          </TableRow>
        }
        </TableBody>
        </table>
        
      </TableContainer>
      <Pagination
          color="primary"
          count={totalPages}
          onChange={(event, value) => handlePage(value)}
          page={page}
          hideNextButton={true}
          hidePrevButton={true}
          size="large"
        ></Pagination>
        <Button 
          sx={{margin: 'auto', display: 'block', marginTop: '20px'}} 
          variant="contained" 
          color="secondary" 
          onClick={() => {handleClickModalAdd()}}> 
          Adicionar Usuário
        </Button>
        <Button
        sx={{ margin: 'auto', display: 'block', marginTop: '20px' }}
        variant="contained"
        color="primary"
        onClick={exportToXLS}  
      >Exportar para Excel</Button>
      <ModalComponent />
    </>
  )
}

export default Table