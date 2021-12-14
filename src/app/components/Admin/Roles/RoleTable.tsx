import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
} from "@material-ui/data-grid";
import { useRolesStyle } from "@/assets/Roles";
import { CustomLoadingOverlay, RemoveRole } from "@/app/components/Admin";

const RolesTable = ({ data }: any) => {
  const classes = useRolesStyle();
  const dataRows: GridRowsProp = data;
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
      renderCell: (params: GridCellParams) =>
        params.row.institution.name === ""
          ? "Undefined"
          : params.row.institution.name,
    },
    {
      field: "country",
      width: 200,
      align: "left",
      headerName: "País",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) =>
        params.row.institution.country === ""
          ? "Undefined"
          : params.row.country,
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
          userId={params.row.id}
          institution={params.row.institution.name}
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
      loading={false}
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 20]}
    />
  );
};

export default RolesTable;
