import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useRolesStyle } from "@/assets/Roles";
import {
  CustomLoadingOverlay,
  QuickSearchToolbar,
  ShowAvatar,
  ActionButtons,
  ShowConfirm,
  ShowStatus,
} from "@/app/components/Admin";
import { Capitalize } from "@/app/helper/Capitalize";

interface Props {
  isLoading: boolean;
  data: any;
}

const UsersTable = ({ isLoading, data }: Props) => {
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
        <ShowAvatar name={Capitalize(params.row.name)} />
      ),
    },
    {
      field: "dni",
      width: 250,
      align: "left",
      headerName: "Dni",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => params.row.dni.toUpperCase(),
    },
    {
      field: "validated",
      width: 200,
      align: "left",
      headerName: "Cta Verificada",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <ShowConfirm confirm={params.row.validated} />
      ),
    },
    {
      field: "status",
      width: 200,
      align: "left",
      headerName: "Estado",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <ShowStatus status={params.row.status} />
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
      autoHeight={true}
      components={{
        Toolbar: QuickSearchToolbar,
        LoadingOverlay: CustomLoadingOverlay,
      }}
      loading={isLoading}
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 20]}
      componentsProps={{
        toolbar: {
          value: searchText,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => requestSearch(e.target.value),
          clearSearch: () => requestSearch(""),
        },
      }}
    />
  );
};

export default UsersTable;
