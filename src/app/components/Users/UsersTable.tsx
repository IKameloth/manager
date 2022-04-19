import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowData,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useRolesStyle } from "@/assets/Roles";
import CustomLoadingOverlay from './CustomLoading'
import RemoveRole from './RemoveRole'
import RoleTable from './RoleTable'
import { RoleType, UsersListType } from "@/app/types";
import { Button, List, ListItem, ListItemText } from "@mui/material";

interface Props {
  isLoading: boolean
  usersList: any
  token: string
  changePage: (page: number, offset: number) => void
  setAddRole: (addRole: boolean) => void
}

const UsersTable = ({ isLoading, usersList, changePage, setAddRole }: Props) => {
  const classes = useRolesStyle();
  const dataRows: GridRowsProp = usersList.data;
  const [rows, setRows] = useState(dataRows);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedUser, setSelectedUser] = useState<GridRowData>();
  const [openRoleTable, setOpenRoleTable] = useState<boolean>(false);
  const columns: GridColDef[] = [
    {
      field: "name",
      width: 400,
      align: "left",
      headerName: "Nombre",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <div style={{ marginLeft: 10 }}>{params.row.name}</div>
      ),
    },
    {
      field: "dni",
      width: 200,
      align: "left",
      headerName: "DNI",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => params.row.dni,
    },
    {
      field: "roles",
      width: 100,
      align: "left",
      headerName: "Roles",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => {
        return (
            <Button onClick={() => {
              setSelectedUser(params.row)
              setOpenRoleTable(true)
            }}>
              Ver Roles
            </Button>
        )
      },
    }
  ];
  
  useEffect(() => {
    if (rows != dataRows) {
      setRows(dataRows);
    }
  }, [dataRows]);
  
  useEffect(() => {
    if (rows.length === 0) {
      setRows(rows);
    }
  }, []);
  
  if(openRoleTable && selectedUser){
    return <RoleTable user={selectedUser} isOpen={openRoleTable} setAddRole={setAddRole} closeModal={() => setOpenRoleTable(false)} />
  }

  return (
    <DataGrid
      rowHeight={50}
      className={classes.table}
      disableSelectionOnClick
      components={{
        LoadingOverlay: CustomLoadingOverlay,
      }}
      loading={isLoading}
      autoHeight={true}
      rows={rows}
      getRowId={row => row.dni}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10]}
      paginationMode="server"
      onPageChange={(page) => {
        if(usersList.offset){
          changePage(page, usersList.offset)
        }
        setCurrentPage(2)
      }}
      page={currentPage}
      rowCount={usersList.total}
    />
  );
};

export default UsersTable;
