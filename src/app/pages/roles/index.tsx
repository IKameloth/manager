import React, { useEffect, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridRowsProp } from '@material-ui/data-grid';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { useRolesStyle } from '@/assets/Roles';
import AddIcon from '@material-ui/icons/Add';
import { CustomLoadingOverlay, QuickSearchToolbar, ShowStatus, ShowAvatar, ActionButtons } from '@/app/components/Admin';

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
        renderCell: (params: GridCellParams) => ( <ShowAvatar name={params.row.name} /> ),
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
        renderCell: (params: GridCellParams) => ( <ShowStatus status={params.row.status} /> ),
    },
    { 
        field: 'action', 
        width: 100,
        align:'left',
        headerAlign: 'left',
        headerName: 'Acción', 
        type: 'actions',
        renderCell: (params: GridCellParams) => ( <ActionButtons user={ params.row } /> ),
    }
];

function escapeRegExp(value: string) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export default function RoleList() {
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
                <Paper className={classes.paper} style={{marginTop: 68}} >
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