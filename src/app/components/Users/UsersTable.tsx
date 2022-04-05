import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
} from "@material-ui/data-grid";
import { useRolesStyle } from "@/assets/Roles";
import CustomLoadingOverlay from './CustomLoading'
import RemoveRole from './RemoveRole'
import { UsersListType } from "@/app/types";
import { List, ListItem, ListItemText } from "@material-ui/core";

interface Props {
  isLoading: boolean
  usersList: any
  changePage: (page: number, offset: number) => void
}

const UsersTable = ({ isLoading, usersList, changePage }: Props) => {
  const classes = useRolesStyle();
  const dataRows: GridRowsProp = usersList.data;
  const [rows, setRows] = useState(dataRows);
  const [pageSize, setPageSize] = useState<number>(10);
  const columns: GridColDef[] = [
    {
      field: "name",
      width: 200,
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
      width: 400,
      align: "left",
      headerName: "Roles",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => {
        return (
          <List>
            {params.row.roles.map((role:any) => {
              return(
                <ListItem
                  key={role.name + Math.random()} >
                    <ListItemText primary={role.name} />
                    <RemoveRole userDNI={params.row.dni} roleName={role} />
                </ListItem>
              )})}
          </List>
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

  return (
    <DataGrid
      className={classes.table}
      disableSelectionOnClick
      components={{
        LoadingOverlay: CustomLoadingOverlay,
      }}
      loading={isLoading}
      rows={rows}
      getRowId={row => row.dni}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[10]}
      paginationMode="server"
      onPageChange={(page) => {
        if(usersList.offset)
          changePage(page, usersList.offset)
      }}
      rowCount={usersList.total}
    />
  );
};

export default UsersTable;
