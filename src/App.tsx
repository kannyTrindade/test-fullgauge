import React from 'react';
import Table from "./components/table";
import { Container, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './components/navbar';
import './styles/App.css'
import ModalComponent from "./components/modal";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Table />
      </Container>
    </>
    
  );
}

export default App;