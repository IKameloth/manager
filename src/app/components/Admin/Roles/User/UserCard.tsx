import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CardActions,
  IconButton,
  Theme,
  Box,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/styles";
import EditUserModal from "./EditUserModal";
import RoleBanDialog from "./RoleBanDialog";
import Loader from "@/app/components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "@/app/store";
import { getUser } from "@/app/store/admin";
import { UserType } from "@/app/types";

const useStyles = makeStyles((theme: Theme) => ({
  centered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 107,
  },
  avatar: {
    width: 95,
    height: 95,
    backgroundColor: theme.palette.primary.main,
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 9px 18px rgba(0, 0, 0, 0.18)",
    marginBottom: 5,
  },
  miniTable: {
    marginTop: 15,
    border: "none",
    height: 150,
  },
  backgroundBtn: {
    backgroundColor: "#FFFFFF",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 9px 18px rgba(0, 0, 0, 0.18)",
    borderRadius: 25,
  },
  card: {
    maxWidth: 345,
    width: 345,
    height: 470,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    display: "flex",
    boxShadow:
      "0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)",
  },
}));

interface Props {
  userID: string;
  token: string;
  returnUser: (userData?: UserType) => void;
}

export default function UserCard({ userID, token, returnUser }: Props) {
  const dispatcher = useDispatch();
  const { admin } = useSelector((state: StoreState) => state);
  const { user } = admin;

  const classes = useStyles();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenBan, setIsOpenBan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(user);

  const getAsyncUser = async () => {
    setIsLoading(true);
    await dispatcher(getUser(userID, token));
    setIsLoading(false);
  };

  useEffect(() => {
    getAsyncUser();
  }, []);

  useEffect(() => {
    setUserInfo(user);
    returnUser(user);
  }, [user]);

  const handleEditModal = () => {
    setIsOpenEdit(!isOpenEdit);
  };

  const handleBanModal = () => {
    setIsOpenBan(!isOpenBan);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        {isLoading ? (
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexDirection="column"
          >
            <Loader />
          </Box>
        ) : (
          <>
            <Box
              alignItems="center"
              justifyContent="center"
              display="flex"
              flexDirection="column"
            >
              <Avatar alt="user" className={classes.avatar}>
                {userInfo && userInfo.name.indexOf(" ") > 0
                  ? `${userInfo.name
                      .split(" ")[0][0]
                      .toUpperCase()}${userInfo.name
                      .split(" ")[1][0]
                      .toUpperCase()}`
                  : `${userInfo?.name[0].toUpperCase()}${userInfo?.name[1].toUpperCase()}`}
              </Avatar>
              <Typography variant="h6">
                {userInfo?.dni.toUpperCase()}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {userInfo?.name
                  .charAt(0)
                  .toUpperCase()
                  .concat(userInfo?.name.substring(1))}
              </Typography>
            </Box>
            <Box alignItems="center" justifyContent="center">
              <CardActions className={classes.centered}>
                <IconButton
                  onClick={handleEditModal}
                  className={classes.backgroundBtn}
                  aria-label="edit"
                >
                  <EditIcon style={{ color: "#3366FF" }} />
                  <Typography variant="body2">Editar</Typography>
                </IconButton>
                {userInfo?.status === true ? (
                  <IconButton
                    onClick={handleBanModal}
                    className={classes.backgroundBtn}
                    aria-label="ban"
                  >
                    <NotInterestedIcon style={{ color: "#FF0000" }} />
                    <Typography variant="body2">Deshabiliar</Typography>
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={handleBanModal}
                    className={classes.backgroundBtn}
                    aria-label="ban"
                  >
                    <CheckCircleOutlineIcon style={{ color: "#209E25" }} />
                    <Typography variant="body2">Habilitar</Typography>
                  </IconButton>
                )}
              </CardActions>
            </Box>
            <Table className={classes.miniTable}>
              <TableHead></TableHead>
              <TableBody>
                <TableRow style={{ borderTop: "1px solid #E0E0E0" }}>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Fecha de registro
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {userInfo?.CreatedAt.substring(
                        0,
                        userInfo?.CreatedAt.indexOf("T")
                      )
                        .split("-")
                        .reverse()
                        .join("-")}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{userInfo?.email}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
      {isOpenEdit && (
        <EditUserModal
          isOpen={isOpenEdit}
          onClose={handleEditModal}
          user={userInfo}
          token={token}
        />
      )}

      {isOpenBan && (
        <RoleBanDialog
          isOpen={isOpenBan}
          onClose={handleBanModal}
          user={userInfo}
          token={token}
        />
      )}
    </Card>
  );
}
