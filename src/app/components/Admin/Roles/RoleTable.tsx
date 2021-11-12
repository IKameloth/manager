import React, {useState, useEffect} from 'react'
import { DataGrid, GridCellParams, GridColDef, GridRowsProp } from '@material-ui/data-grid';
import { useRolesStyle } from '@/assets/Roles';
import { CustomLoadingOverlay, QuickSearchToolbar, RemoveRole } from '@/app/components/Admin';

const RolesTable = ({data}: any) => {
    const classes = useRolesStyle()
    const dataRows: GridRowsProp = data
    const [searchText, setSearchText] = useState('')
    const [rows, setRows] = useState(dataRows);
    const [pageSize, setPageSize] = useState<number>(5)

    const columns: GridColDef[] = [
        { 
            field: 'name', 
            width: 200,
            align:'left',
            headerName: 'Rol', 
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => ( <div style={{ marginLeft: 10 }}>{params.row.name}</div> ),
        },
        { 
            field: 'institution', 
            width: 200,
            align:'left',
            headerName: 'Institución',
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => ( params.row.institution.name )
        },
        { 
            field: 'country', 
            width: 200,
            align:'left',
            headerName: 'País', 
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => ( params.row.country ),
        },
        { 
            field: 'delete', 
            width: 100,
            align:'center',
            headerAlign: 'left',
            headerName: 'Remover', 
            filterable: false,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => ( <RemoveRole user={ params.row.id } /> ),
        },
    ]

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const filteredRows = dataRows.filter((row) => {
            return (row.name.toLowerCase().includes(searchValue.toLowerCase()) || row.dni.toLowerCase().includes(searchValue.toLowerCase()) )
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

export default RolesTable