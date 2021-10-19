import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TextField, Container, Grid, Paper, Typography, Button, Card, Avatar, CardContent, CardActions, makeStyles, TableRow, Table, TableHead, TableBody, TableCell, FormControlLabel, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { DataGrid, GridCellParams, GridColDef, GridRowsProp } from "@material-ui/data-grid";
import { ActionButtons, CustomLoadingOverlay } from "@/app/components/Admin";
import EditIcon from "@material-ui/icons/Edit";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Autocomplete from '@material-ui/lab/Autocomplete';

const dataRows = [
    { id: 1, role: 'JP', institution: '@AUTENTIAX' },
    { id: 2, role: 'Admin', institution: '@AUTENTIAX' },
    { id: 3, role: 'Oper', institution: '@AUTENTIAX' },
    { id: 4, role: 'Opersensor', institution: '@AUTENTIAX' },
    { id: 5, role: 'ServiceDesk', institution: '@AUTENTIAX' },
    { id: 6, role: 'Jefe', institution: '@AUTENTIAX' },
    { id: 7, role: 'Junior', institution: '@AUTENTIAX' },
    { id: 8, role: 'Senior', institution: '@AUTENTIAX' },
];

const columns: GridColDef[] = [
    { 
        field: 'role', 
        width: 300,
        align:'left',
        headerName: 'Rol', 
        renderCell: (params: GridCellParams) => ( params.row.role ),
    },
    { 
        field: 'institution', 
        width: 285,
        align:'left',
        headerName: 'Institución',
        renderCell: (params: GridCellParams) => ( params.row.dni )
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

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 900,
        borderRadius: '10px',
        boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)',
    },
    container: {
        alignItems: 'center',
        margin: '9px 25px 8px 25px'
    },
    miniTable: {
        marginTop: 15,
        border: 'none',
        height: 120,
    },
    table: {
        border: 'none',
        height: 400,
        '& .MuiDataGrid-columnsContainer': {
          padding: '10px',
          color: 'rgba(0, 0, 0, 0.55)',
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiFormControl-root': {
          width: 180,
          height: 36,
          padding: '6px 9px 6px 8px',
          borderRadius: 10,
          marginTop: theme.spacing(1),
          color: '#1A75FF',
        },
        '& .MuiDataGrid-footerContainer': {
          justifyContent: 'center',
        },
        '& .MuiTablePagination-root': {
          color: 'rgba(0, 0, 0, 0.55)',
        },
        '& .MuiDataGrid-columnHeaderDraggableContainer': {
          width: 'auto',
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-main': {
          marginTop: theme.spacing(1),
        },
        '& .MuiChip-deleteIcon': {
            color: '#FF0000',
        },
        '& .MuiChip-label': {
            fontWeight: 'bold',
            fontSize: 13,
        },
        '& MuiAutocomplete-input': {
            backgroundColor: "#FFFFFF"
        },
    },
    centerElements: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '15px'
    },
    avatar: {
        width: 95,
        height: 95,
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 9px 18px rgba(0, 0, 0, 0.18)",
        marginBottom: 10,
    },
    backgroundBtn: {
        backgroundColor: "#FFFFFF", 
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 9px 18px rgba(0, 0, 0, 0.18)", 
        borderRadius: 25
    },
}));

interface RouteParams {
    dni: string
}

export default function RolesDetail() {
    const classes = useStyles();
    const { dni } = useParams<RouteParams>();
    const [rows, setRows] = useState(dataRows);
    const [pageSize, setPageSize] = useState<number>(5);
    const [searchText, setSearchText] = useState("");

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const filteredRows = dataRows.filter((row) => {
            return Object.keys(row).some((field) => {
                return field.toString();
            });
        });
        setRows(filteredRows);
    };

    return (
        <Container>
            <Grid container item xs={12} sm={12} md={12} lg={12} direction="column" alignItems="center">
                <Paper className={classes.paper} >
                    <Grid container className={classes.container} spacing={2}>
                        <Grid item xs>
                            <Typography variant="h4">Roles</Typography>
                            <Typography variant="body1" style={{marginTop: 6}}>Administración y control de roles.</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" size="large" startIcon={<AddIcon />} style={{ borderRadius: 20 }}>Crear rol</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2} alignItems="center" style={{ marginTop: 68 }}>
                <Grid item xs={4} >
                    <Card style={{ maxWidth: 345, height: 450, backgroundColor: "#ffffff", borderRadius: '10px', boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)' }}>
                        <CardContent>
                            <div className={ classes.centerElements }>
                                <Avatar alt="user" className={ classes.avatar }>PP</Avatar>
                                <Typography variant="h6">Pepe Pepe</Typography>
                                <Typography variant="subtitle2" color="textSecondary">QA</Typography>
                            </div>
                            <Table className={classes.miniTable}>
                                <TableHead></TableHead>
                                <TableBody>
                                    <TableRow style={{ borderTop: "1px solid #E0E0E0" }}>
                                        <TableCell>
                                            <Typography variant="body2" color="textSecondary">Fecha de registro</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">22 Enero 2021</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body2" color="textSecondary">Empresa</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">Autentia SA</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="body2" color="textSecondary">Email</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">ppepe@autentia.cl</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardActions style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FormControlLabel
                                className={classes.backgroundBtn}
                                label=""
                                control={
                                    <IconButton color="secondary" aria-label="editar">
                                        <EditIcon style={{ color: '#3366FF' }} />
                                    </IconButton>
                                }
                            />
                            <FormControlLabel
                                className={classes.backgroundBtn}
                                label=""
                                control={
                                    <IconButton color="secondary" aria-label="deshabilitar">
                                        <NotInterestedIcon style={{ color: '#FF0000' }} />
                                    </IconButton>
                                }
                            />
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={8} style={{ height: 430, backgroundColor: "#ffffff", borderRadius: '10px', boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)', }}>
                    <DataGrid 
                        className={classes.table}
                        rowHeight={50}
                        disableSelectionOnClick
                        components={{ 
                            Toolbar: LimitTag,
                            LoadingOverlay: CustomLoadingOverlay,
                        }}
                        loading={false}
                        rows={rows} 
                        columns={columns} 
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20]}
                        componentsProps={{
                            toolbar: {
                                value: searchText,
                                onChange: (e: any) => requestSearch(e.target.value),
                                clearSearch: () => requestSearch(""),
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

function LimitTag() {
    return(
        <Autocomplete
            style={{ marginBottom: 20 }}
            multiple
            limitTags={2}
            id="tags-outlined"
            options={dataRows}
            getOptionLabel={(option) => option.role}
            filterSelectedOptions
            renderInput={(params) => (
            <TextField
                style={{ width: 'auto', marginLeft: 10}}
                {...params}
                variant="outlined"
                label="Tags"
                placeholder="Roles"
            />
            )}
        />
    );
};