import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
} from "@mui/x-data-grid";
import { useRolesStyle } from "@/assets/Roles";
import { CustomLoadingOverlay, RemoveRole } from "@/app/components/Admin";
import { RoleType } from "@/app/types";

interface Props {
  isLoading: boolean
  data: [RoleType]
  token: string
}

const RolesTable = ({ isLoading, data, token }: Props) => {
  const classes = useRolesStyle();
  const dataRows = data;
  const [rows, setRows] = useState(dataRows);
  const [pageSize, setPageSize] = useState<number>(5);

  const columns: GridColDef[] = [
    {
      field: "name",
      width: 200,
      align: "left",
      headerName: "Rol",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <div style={{ marginLeft: 10 }}>{params.row.name}</div>
      ),
    },
    {
      field: "institution",
      width: 200,
      align: "left",
      headerName: "Institución",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => params.row.institution.name,
    },
    {
      field: "country",
      width: 200,
      align: "left",
      headerName: "País",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => params.row.institution.country,
    },
    {
      field: "delete",
      width: 100,
      align: "center",
      headerAlign: "left",
      headerName: "Remover",
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <RemoveRole
          roleName={params.row.name}
          userId={params.row.user.id}
          institution={params.row.institution.name}
          country={params.row.institution.country}
          token={token}
        />
      ),
    },
  ];

  useEffect(() => {
    if (rows != dataRows) {
      setRows(dataRows);
    }
  }, [dataRows]);

  useEffect(() => {
    setRows(rows)
  }, []);

  return (
    <DataGrid
      rowHeight={50}
      className={classes.table}
      disableSelectionOnClick
      autoHeight={true}
      components={{
        LoadingOverlay: CustomLoadingOverlay,
      }}
      loading={isLoading}
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 20]}
    />
  );
};

export default RolesTable;
