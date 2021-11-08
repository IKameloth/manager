import React, {useState, useEffect} from 'react'
import { DataGrid, GridCellParams, GridColDef, GridRowsProp } from '@material-ui/data-grid';
import { useRolesStyle } from '@/assets/Roles';
import { CustomLoadingOverlay, QuickSearchToolbar, ShowStatus, ShowAvatar, ActionButtons, TitleBar, NewUserModal } from '@/app/components/Admin';

const UsersTable = ({data}: any) => {
    const classes = useRolesStyle()
    const dataRows: GridRowsProp = data?.length > 0 ? data : []
    const [searchText, setSearchText] = useState('')
    const [rows, setRows] = useState(dataRows);
    const [pageSize, setPageSize] = useState<number>(5)

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
    ]

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = dataRows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    }

    useEffect(() => {
        setRows(rows);
    }, [rows])

    return (
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
    )
}

function escapeRegExp(value: string) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default UsersTable