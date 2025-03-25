import { Button, TableCell, TableHead, TableRow } from "@mui/material"

const TableHeader = () => {


  return (
    <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Nome</TableCell>
          <TableCell>Sobrenome</TableCell>
          <TableCell>Data de Registro</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
  )
}

export default TableHeader