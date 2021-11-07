import React, { useEffect, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridRowsProp } from '@material-ui/data-grid';
import { Box, Container, Grid, Paper, styled } from '@material-ui/core';
import { useRolesStyle } from '@/assets/Roles';
import { CustomLoadingOverlay, QuickSearchToolbar, ShowStatus, ShowAvatar, ActionButtons, TitleBar, NewUserModal } from '@/app/components/Admin';
import Section from '@/app/components/Section';

import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '@/app/store';
import { setErrorMessage } from '@/app/store/common';
import { useToasts } from 'react-toast-notifications';
import ErrorAlert from '@/app/components/ErrorAlert';

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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    width: '100%',
    maxWidth: 900,
    color: theme.palette.text.secondary,
    borderRadius: 10,
    boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)'
}));

export default function RoleList() {

    const { addToast } = useToasts()
    const dispatch = useDispatch()
    const { common } = useSelector((state: StoreState) => state)
    const { errorMessage } = common

    useEffect(() => {
        errorMessage && dispatch(setErrorMessage(errorMessage))
    }, [errorMessage, dispatch])

    const classes = useRolesStyle();
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState(dataRows);
    const [pageSize, setPageSize] = useState<number>(5);
    const [openModal, setOpenModal] = useState(false)

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

    const handleModal = () => {
        setOpenModal(!openModal)
    }

    const registerNewUser = () => {
        console.log("Register")
    }

    return (
        <Container>
            <Section>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={8}>
                        <TitleBar title="usuarios" subTitle="administración y control de usuarios" btnText="crear usuario" btnAction={handleModal} />
                    
                        <Grid item xs={12} md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Item>
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
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
                { openModal && <NewUserModal isOpen={openModal} closeModal={handleModal} /> }
            </Section>
        </Container>
    );
};