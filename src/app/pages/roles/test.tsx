import React, { useEffect, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridOverlay, GridRowsProp } from '@material-ui/data-grid';
import { Avatar, Button, Chip, Container, FormControlLabel, Grid, IconButton, LinearProgress, Paper, TextField, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from "@material-ui/icons/Edit";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { useRolesStyle } from '@/assets/Roles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AddIcon from '@material-ui/icons/Add';

const dataRows: GridRowsProp = [
    { id: 1, name: 'Natasha Sky', dni: '10826805-0', status: true },
    { id: 2, name: 'Raul Aurelio', dni: '10913632-8', status: false },
    { id: 3, name: 'Aloy Windstorm', dni: '5863955-9', status: true },
    { id: 4, name: 'Arnold swatzh', dni: '20593037-K', status: false },
    { id: 5, name: 'Roberto Mendez', dni: '15611188-0', status: false },
    { id: 6, name: 'Anibal Mellado', dni: '20272721-2', status: true },
    { id: 7, name: 'Gonzalo Perez', dni: '6267321-4', status: false },
    { id: 8, name: 'Timmy Turner', dni: '14933645-1', status: true },
];

const columns: GridColDef[] = [
    { 
        field: 'name', 
        width: 300,
        align:'left',
        headerName: 'Nombre', 
        renderCell: (params: GridCellParams) => ( <ShowAvatarName index={params.row} /> ),
    },
    { 
        field: 'dni', 
        width: 285,
        align:'left',
        headerName: 'Dni',
        renderCell: (params: GridCellParams) => ( params.row.dni )
    },
    { 
        field: 'status', 
        width: 200,
        align:'left',
        headerName: 'Estado', 
        type: 'boolean',
        renderCell: (params: GridCellParams) => ( <ShowStatus index={params.row} /> ),
    },
    { 
        field: 'action', 
        width: 100,
        align:'left',
        headerAlign: 'left',
        headerName: 'Acción', 
        type: 'actions',
        renderCell: (params: GridCellParams) => ( <MatEdit index={params.row} /> ),
    }
];

interface SearchTool {
    clearSearch: () => void;
    onChange: () => void;
    value: string;
};

export default function Test() {
    const classes = useRolesStyle();
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState(dataRows);
    const [pageSize, setPageSize] = useState<number>(5);

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataRows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    useEffect(() => {
        setRows(rows);
    }, [rows]);

    return (
        <Container>
            <Grid container item xs={12} sm={12} md={12} lg={12} direction="column" alignItems="center">
                <Paper className={classes.paper} >
                    <Grid container className={classes.container} spacing={2}>
                        <Grid item xs>
                            <Typography variant="h4">Usuarios</Typography>
                            <Typography variant="body1" style={{marginTop: 6}}>Administración y control de usuarios.</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" size="large" startIcon={<AddIcon />} style={{ borderRadius: 20 }}>Crear usuario</Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.paper} style={{marginTop: 67}} >
                
                    <DataGrid 
                        rowHeight={50}
                        className={classes.table}
                        disableSelectionOnClick
                        components={{ 
                            Toolbar: QuickSearchToolbar,
                            LoadingOverlay: CustomLoadingOverlay,
                        }}
                        loading={false}
                        rows={rows} 
                        columns={columns} 
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20]}
                        componentsProps= {{
                            toolbar: {
                                value: searchText,
                                onChange: (e: any) => requestSearch(e.target.value),
                                clearSearch: () => requestSearch(''),
                            },
                        }}
                        />
                
                </Paper>
            </Grid>
        </Container>
    );
};

const ShowStatus = ({index}: any) => {
    let status = index.status;
    return ( 
        <div>
            { status ?
                <Chip label="Activo" style={{ color: "#209E25", backgroundColor: '#C2FFCC' }} /> :
                <Chip label="Inactivo" style={{ color: "#FFA31A", backgroundColor: '#FFF6E8' }} />
            }
        </div>
    );
};

const ShowAvatarName = ({index}: any) => {
    const classes = useRolesStyle();
    let name = index.name;
    return (
        <div className={classes.avatarName}>
            <Avatar style={{ marginLeft: 10, backgroundColor: '#2962FF'}}>
                {`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`}
            </Avatar>
            <label style={{marginLeft: 20}}>{name}</label>
        </div>
    )
};

const MatEdit = ({ index }: any) => {
    const handleEditClick = () => {
      console.log(index.dni);
    };
  
    return (
        <div style={{ cursor: "pointer" }} >
            <FormControlLabel
              label=""
              control={
                <IconButton
                  color="secondary"
                  aria-label="editar"
                  onClick={handleEditClick}
                >
                  <EditIcon style={{ color: '#3366FF' }} />
                </IconButton>
              }
            />
            { index.status ?
                <FormControlLabel
                label=""
                control={
                    <IconButton
                    color="secondary"
                    aria-label="deshabilitar"
                    onClick={handleEditClick}
                    >
                    <NotInterestedIcon style={{ color: '#FF0000' }} />
                    </IconButton>
                }
                /> :
                <FormControlLabel
                label=""
                control={
                    <IconButton
                    color="secondary"
                    aria-label="habilitar"
                    onClick={handleEditClick}
                    >
                    <CheckCircleOutlineIcon style={{ color: '#209E25' }} />
                    </IconButton>
                }
                />
            }
        </div>
    );
};

function escapeRegExp(value: string) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

function QuickSearchToolbar(props: SearchTool) {
    return(
        <TextField
            style={{ marginLeft: 10 }}
            variant="outlined"
            value={props.value}
            onChange={props.onChange}
            placeholder="Buscar..."
            InputProps={{
                startAdornment: <SearchIcon fontSize="small" style={{ color: '#1A75FF'}} />,
                endAdornment: (
                    <IconButton
                        title="Clear"
                        aria-label="Clear"
                        size="small"
                        style={{ visibility: props.value ? 'visible' : 'hidden' }}
                        onClick={props.clearSearch}
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>
                ),
            }}
        />
    );
};

function CustomLoadingOverlay() {
    return(
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );
};