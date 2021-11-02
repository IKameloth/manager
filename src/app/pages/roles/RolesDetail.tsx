import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { TextField, Container, Grid, Paper, makeStyles, Box, styled } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColDef, GridRowsProp } from "@material-ui/data-grid";
import { ActionButtons, CustomLoadingOverlay, NewRoleModal } from "@/app/components/Admin";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TitleBar, UserCard } from "@/app/components/Admin";

const dataRows = [
    { id: 1, role: 'JP', institution: '@AUTENTIAX', country: "CHILE" },
    { id: 2, role: 'Admin', institution: '@AUTENTIAX', country: "CHILE" },
    { id: 3, role: 'Oper', institution: '@AUTENTIAX', country: "CHILE" },
    { id: 4, role: 'Opersensor', institution: '@AUTENTIAX', country: "CHILE" },
    { id: 5, role: 'ServiceDesk', institution: '@AUTENTIAX', country: "CHILE" },
    { id: 6, role: 'Jefe', institution: '@AUTENTIAX', country: "CHILE" },
    { id: 7, role: 'Junior', institution: '@AUTENTIAX', country: "CHILE" },
    { id: 8, role: 'Senior', institution: '@AUTENTIAX', country: "CHILE" },
];

const columns: GridColDef[] = [
    { 
        field: 'role', 
        width: 200,
        align:'left',
        headerName: 'Rol', 
        renderCell: (params: GridCellParams) => ( <div style={{ marginLeft: 10 }}>{params.row.role}</div> ),
    },
    { 
        field: 'institution', 
        width: 200,
        align:'left',
        headerName: 'Institución',
        renderCell: (params: GridCellParams) => ( params.row.dni )
    },
    {
        field: 'country',
        width: 200,
        align: 'left',
        headerName: 'País',
        renderCell: (params: GridCellParams) => ( params.row.country )
    },
    { 
        field: 'action', 
        width: 150,
        align:'left',
        headerName: 'Acción', 
        type: 'actions',
        renderCell: (params: GridCellParams) => ( <ActionButtons user={ params.row } /> ),
    }
];

const useStyles = makeStyles((theme) => ({
    paper: {
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
        height: 434,
        '& .MuiDataGrid-columnHeaderTitleContainer': {
            padding: 0
        },
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
        '& .MuiAutocomplete-input': {
            backgroundColor: "#FFFFFF"
        },
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    borderRadius: 10,
    boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)'
}));

interface RouteParams {
    dni: string
}

export default function RolesDetail() {
    // const { dni } = useParams<RouteParams>();
    const classes = useStyles();
    const [rows, setRows] = useState(dataRows);
    const [pageSize, setPageSize] = useState<number>(5);
    const [searchText, setSearchText] = useState("");
    const [isOpen, setIsOpen] = useState(false)

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const filteredRows = dataRows.filter((row) => {
            return Object.keys(row).some((field) => {
                return field.toString();
            });
        });
        setRows(filteredRows);
    };

    const handleCreateRoleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={8}>

                    <TitleBar title="roles" subTitle="administración y control de roles" btnText="crear rol" btnAction={handleCreateRoleModal} />
                    <UserCard dni="18586460-K" name="Pepe Pedro" email="ppedro@autentia.cl" institution="IMED" job="QA" registeredDate="23 OCT 1992" /> {/* change this to user obj type */}
                    <Grid item xs={12} md={8} >
                        <Item>
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
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            { isOpen && <NewRoleModal isOpen={isOpen} onCloseModal={handleCreateRoleModal} /> }
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