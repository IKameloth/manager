import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  styled,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "@/app/store";
import {
  setErrorMsg,
} from "@/app/store/admin/operations";
import Loader from "../Loader";
import { MotionContainer, MotionItemUp } from "../Motion";
import Alerts from "../Alerts";
import RemoveRole from "./RemoveRole";
import { DataGrid, GridCellParams, GridColDef, GridRowData } from "@mui/x-data-grid";
import CustomLoadingOverlay from "./CustomLoading";
import { useRolesStyle } from "@/assets/Roles";

type Props = {
  isOpen: boolean
  user: GridRowData
  closeModal: () => void
  setAddRole: (addRole: boolean) => void
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
}));

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = ({ children, onClose, ...other }: DialogTitleProps) => {

  return (
    <DialogTitle style={{ textAlign: "center", width: '80%', textTransform: 'capitalize' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#000000",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const RoleTable = ({ isOpen, closeModal, user, setAddRole }: Props) => {
  const dispatcher = useDispatch();
  const classes = useRolesStyle();
  const { admin, common } = useSelector((state: StoreState) => state);
  const { errorMessage } = admin;

  useEffect(()=> {
    if(errorMessage !== '')
      Alerts({
        message: errorMessage,
        icon: "error",
      });
  },[errorMessage])

  const dataRows = user.roles;

  const columns: GridColDef[] = [
    {
      field: "name",
      width: 300,
      align: "left",
      headerName: "Rol",
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <div style={{ marginLeft: 10 }}>{params.row.name}</div>
      ),
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
      renderCell: (params: GridCellParams) => <RemoveRole roleName={params.row.name} userDNI={user.dni} />,
    },
  ];

  return (
    <MotionContainer>
      <Modal open={isOpen} onClose={closeModal} closeAfterTransition >
          <BootstrapDialog
            onClose={closeModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            fullWidth
          >
            <MotionItemUp>
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={closeModal}
              >
                Roles de {user.name.toLowerCase()}
              </BootstrapDialogTitle>
            </MotionItemUp>
            <DialogContent dividers>
                <DataGrid
                    className={classes.modalTable}
                    rowHeight={50}
                    autoHeight={true}
                    disableSelectionOnClick
                    components={{
                        LoadingOverlay: CustomLoadingOverlay,
                    }}
                    getRowId={(row) => row.name}
                    columns={columns}
                    rowsPerPageOptions={[10, 20, 100]}
                    rows={dataRows}
                    />
            </DialogContent>
            <DialogActions>
              <MotionItemUp>
                <Button color="primary" onClick={() => {
                      closeModal()
                      setAddRole(true)
                }}>
                  Agregar rol
                </Button>
              </MotionItemUp>
            </DialogActions>
          </BootstrapDialog>
      </Modal>
    </MotionContainer>
  );
};

export default RoleTable;
