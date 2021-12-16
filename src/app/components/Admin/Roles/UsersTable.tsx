import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
} from "@material-ui/data-grid";
import { useRolesStyle } from "@/assets/Roles";
import {
  CustomLoadingOverlay,
  QuickSearchToolbar,
  ShowValidate,
  ShowAvatar,
  ActionButtons,
  TitleBar,
  NewUserModal,
} from "@/app/components/Admin";

const UsersTable = ({ data, loading }: any) => {
  const classes = useRolesStyle();
  const dataRows: GridRowsProp = data;
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState(dataRows);
  const [pageSize, setPageSize] = useState<number>(5);

  const columns: GridColDef[] = [
    {
      field: "name",
      width: 300,
      align: "left",
      headerName: "Nombre",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <ShowAvatar name={params.row.name} />
      ),
    },
    {
      field: "dni",
      width: 285,
      align: "left",
      headerName: "Dni",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => params.row.dni,
    },
    {
      field: "validate_at",
      width: 200,
      align: "left",
      headerName: "Validación",
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <ShowValidate validate={params.row.validated} />
      ),
    },
    {
      field: "edit",
      width: 100,
      align: "center",
      headerAlign: "left",
      headerName: "Editar",
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <ActionButtons userId={params.row.id} />
      ),
    },
  ];

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const filteredRows = dataRows.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.dni.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  useEffect(() => {
    if (rows != dataRows) {
      setRows(rows);
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
        Toolbar: QuickSearchToolbar,
        LoadingOverlay: CustomLoadingOverlay,
      }}
      loading={loading}
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
        },
      }}
    />
  );
};

export default UsersTable;
