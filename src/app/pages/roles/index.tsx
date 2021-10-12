import React, { useState } from 'react';
import { Button, Container, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import { useRolesStyle } from '@/assets/Roles';
import AddIcon from '@material-ui/icons/Add';
import { Table } from '@material-ui/core';

interface Column {
  id: 'name' | 'dni' | 'status' | 'action';
  label: string;
  minWidth?: number;
  align?: 'left';
};

const columns: Column[] = [
  { id: 'name', label: 'Nombre', minWidth: 50 },
  { id: 'dni', label: 'Dni', minWidth: 20 },
  { id: 'status', label: 'Estado', minWidth: 40 },
  { id: 'action', label: 'Acción', minWidth: 40 }
];

interface Data {
  name: string;
  dni: string;
  status: boolean;
  action: any;
};

function createData(
  name: string,
  dni: string,
  status: boolean,
  action: any,
): Data {
  return { name, dni, status, action }
};

const rows = [
  createData('Pedrito Parra', '10357054-9', true, <button>action</button>),
  createData('Natasha Sky', '10826805-0', false, <button>action</button>),
  createData('Raul Aurelio', '10913632-8', true, <button>action</button>),
  createData('Timmy Turner', '14933645-1', false, <button>action</button>),
  createData('Gonzalo Perez', '6267321-4', false, <button>action</button>),
  createData('Magyare Matteo', '21833030-4', true, <button>action</button>),
  createData('Aloy Windstorm', '5863955-9', true, <button>action</button>),
  createData('Ramza Lion', '21609342-9', true, <button>action</button>),
  createData('Pablo Escobar', '23510260-9', false, <button>action</button>),
  createData('Renato Pianato', '38795379-5', true, <button>action</button>),
  createData('Michi Spil', '26390172-K', true, <button>action</button>),
  createData('Arnold swatzh', '20593037-K', true, <button>action</button>),
  createData('Mikaela', '2229173-4', false, <button>action</button>),
  createData('Roberto Mendez', '15611188-0', true, <button>action</button>),
  createData('Anibal Mellado', '20272721-2', true, <button>action</button>),
];

export default function Roles() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searched, setSearched] = useState<string>("");
  const classes = useRolesStyle();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
        <TableContainer style={{maxHeight: 440}}>
          <Table stickyHeader className="" aria-label="simple table">
            <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            </TableHead>
            <TableBody>
              { rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                      { columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id}>
                            { value }
                          </TableCell>
                        )
                      }) }
                    </TableRow>
                  )
                })              
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <br />

    </Container>
  );
};
