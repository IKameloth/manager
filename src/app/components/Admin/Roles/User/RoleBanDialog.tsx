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
} from "@material-ui/core";
import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { banUser } from "@/app/store/admin";
import { toast } from "react-hot-toast";
import { UserType } from "@/app/types";

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
          ? toast.success("Usuario habilitado")
          : toast.success("Usuario Deshabilitado");
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
      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
}
