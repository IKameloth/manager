import React, { useState } from 'react';
import { Button, Container, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useRolesStyle } from '@/assets/Roles';
import AddIcon from '@material-ui/icons/Add';
import { Table } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";

interface user {
  name: string,
  dni: string
  status: boolean
  // action
};

const originalRows: user[] = [
  { name: 'Pedrito Parra', dni: '10357054-9', status: true },
  { name: 'Natasha Sky', dni: '10826805-0', status: true },
  { name: 'Raul Aurelio', dni: '10913632-8', status: false },
  { name: 'Timmy Turner', dni: '14933645-1', status: true },
  { name: 'Gonzalo Perez', dni: '6267321-4', status: true },
  { name: 'Magyare Matteo', dni: '21833030-4', status: true }
];

export default function Roles() {
  
  const [rows, setRows] = useState<user[]>(originalRows);
  const [searched, setSearched] = useState<string>("");
  const classes = useRolesStyle();

  const requestSearch = (searchedVal: string) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase()) || 
      row.dni.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return(
    <Container>
      <Grid container item xs={12} sm={12} md={12} lg={12} direction="column" alignItems="center">
        <Paper className={classes.paper} >
          <Grid container className={classes.container} spacing={2}>
            <Grid item xs>
              <Typography variant="h4">Admin-Roles</Typography>
              <Typography variant="h4">Usuarios</Typography>
              <Typography variant="body1" style={{marginTop: 6}}>Administración y control de usuarios.</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" size="large" startIcon={<AddIcon />} style={{ borderRadius: 20 }}>Crear usuario</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Paper style={{marginTop: 67}}>
        <SearchBar value={searched} onChange={(searchVal) => requestSearch(searchVal)} onCancelSearch={() => cancelSearch()} placeholder="Buscar..." />
        <TableContainer>
          <Table className="" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="left">Dni</TableCell>
                <TableCell align="left">Estado</TableCell>
                <TableCell align="left">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { rows.map((row) => (
                  <TableRow key={row.dni}>
                    <TableCell component="th" scope="row">{ row.name }</TableCell>
                    <TableCell align="left">{ row.dni }</TableCell>
                    <TableCell align="left">{ row.status }</TableCell>
                    <TableCell align="left">buttons</TableCell>
                  </TableRow>
                )) 
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />

    </Container>
  );
};
