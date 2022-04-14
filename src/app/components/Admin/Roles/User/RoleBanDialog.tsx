import React, { Dispatch } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { banUser } from "@/app/store/admin";
import { UserType } from "@/app/types";
import Alerts from "@/app/components/Alerts";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
  },
}));

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user?: UserType;
  token: string;
}

export default function RoleBanDialog({ isOpen, onClose, user, token }: Props) {
  const dispatch = useDispatch();

  const handleBanUser = async () => {
    if(user){
      const resp: any = await dispatch(banUser(user.dni, !user.status, token));
      if ("status" in resp) {
        resp.status === true
          ? Alerts({
            message: "Usuario habilitado",
            icon: "success",
          })
          : Alerts({
            message: "Usuario Deshabilitado",
            icon: "success",
          });
      }
    }
    onClose();
  };

  if(!user){
    onClose();
    return <></>
  }

  return (
    <>
      <StyledDialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ width: 250 }}>
          <DialogTitle
            id="alert-dialog-title"
            style={{ textAlign: "center" }}
          >
            {user.status ? (
              <Typography
                component="span"
                variant="h6"
                style={{ fontSize: 18 }}
              >
                Desactivar cuenta
              </Typography>
            ) : (
              <Typography
                component="span"
                variant="h6"
                style={{ fontSize: 18 }}
              >
                Reactivar cuenta
              </Typography>
            )}
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="alert-dialog-description"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                component="span"
                variant="body2"
                style={{ color: "#000000" }}
              >
                {user.name}
              </Typography>
              <Typography
                component="span"
                variant="body2"
                style={{ color: "#000000" }}
              >
                {user.dni}
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              onClick={handleBanUser}
              autoFocus
              style={{ color: `${user.status ? "#FF0000" : "#209E25"}` }}
            >
              {user.status ? "Desactivar" : "Activar"}
            </Button>
          </DialogActions>
        </div>
      </StyledDialog>
    </>
  );
}
