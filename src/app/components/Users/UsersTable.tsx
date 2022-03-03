import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
} from "@material-ui/data-grid";
import { useRolesStyle } from "@/assets/Roles";
import { CustomLoadingOverlay, RemoveRole } from "@/app/components/Admin";
import { UsersListType } from "@/app/types";

interface Props {
  isLoading: boolean;
  usersList: any;
  changePage: (offset: number) => void;
}

const UsersTable = ({ isLoading, usersList, changePage }: Props) => {
  const classes = useRolesStyle();
  const dataRows: GridRowsProp = usersList.data;
  const [rows, setRows] = useState(dataRows);
  console.log("ROWS", rows, usersList)
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
      width: 200,
      align: "left",
      headerName: "Roles",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => params.row.roles.map((role:any) => role.name),
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
      rowHeight={50}
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
      onPageChange={() => changePage(usersList.offset)}
      rowCount={usersList.total}
    />
  );
};

export default UsersTable;
