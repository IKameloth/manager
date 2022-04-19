import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MotionItemUp } from "../Motion";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../Loader";
import { LogonTypes } from "@/app/helper/LogonTypes";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExtensionIcon from "@mui/icons-material/Extension";
import CodeIcon from "@mui/icons-material/Code";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { AutentiaUserType } from "@/app/types";
import { useHistory } from "react-router-dom";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import RemoveRole from "./RemoveRole";

interface IForm {
  serial: string;
  institution: string;
  location: string;
  locationCode: string;
  logonType: number;
  technology: string;
}

interface Props {
  data?: AutentiaUserType;
  title: string;
}

export default function FormView({
  data,
  title
}: Props) {
  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Rol',
      width: 150
    },
    {
      field: 'institution',
      headerName: 'Institución',
      width: 150
    },
    {
      field: 'institution_dni',
      headerName: 'DNI Institución',
      width: 150
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
      renderCell: (params: GridCellParams) => <RemoveRole roleName={params.row.name} userDNI={data? data.dni: ''} />,
    },
  ];
  const history = useHistory()
  if(!data){
    return <Card>Usuario no encontrado</Card>
  }
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <MotionItemUp>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField id="name-basic" label="Nombre" variant="filled" disabled value={data?.name} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField id="dni-basic" label="DNI" variant="filled" disabled value={data?.dni} />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField id="email-basic" label="E-mail" variant="filled" disabled value={data?.email} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <DataGrid
                rows={data.roles}
                autoHeight={true}
                columns={columns}
                getRowId={(row) => row.name}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Grid>
          </Grid>
        </MotionItemUp>
      </CardContent>
      <CardActions style={{ padding: 16, justifyContent: "center" }}>
        <Fab
          variant="extended"
          color="primary"
          size="medium"
          onClick={() => history.replace('/users/roles/add')}
        >
          <AddIcon />
          Agregar Rol
        </Fab>
      </CardActions>
    </Card>
  );
}
