import React, { useState } from "react";
import {
  Grid,
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
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import { makeStyles } from "@material-ui/styles";
import EditUserModal from "../EditUserModal";
import ShowDialog from "../RoleDialog";
import { UserType } from "@/app/types";

const useStyles = makeStyles((theme: Theme) => ({
  centered: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "15px",
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
    height: 120,
  },
  backgroundBtn: {
    backgroundColor: "#FFFFFF",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 9px 18px rgba(0, 0, 0, 0.18)",
    borderRadius: 25,
  },
}));

interface Props {
  userData: UserType | undefined;
}

const UserCard = ({ userData }: Props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isBlock, setIsBlock] = useState(false);

  const handleEdit = () => {
    setIsOpen(!isOpen);
  };

  const handleLock = () => {
    setIsBlock(!isBlock);
  };

  const date = userData?.CreatedAt.substring(
    0,
    userData?.CreatedAt.indexOf("T")
  )
    .split("-")
    .reverse()
    .join("-");

  return (
    <>
      <Grid
        item
        xs={12}
        md={4}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            justifyContent: "center",
            maxWidth: 345,
            height: 470,
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow:
              "0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)",
          }}
        >
          <CardContent>
            <div className={classes.centered}>
              <Avatar alt="user" className={classes.avatar}>
                {userData && userData.name.indexOf(" ") > 0
                  ? `${userData.name
                      .split(" ")[0][0]
                      .toUpperCase()}${userData.name
                      .split(" ")[1][0]
                      .toUpperCase()}`
                  : `${userData?.name[0].toUpperCase()}${userData?.name[1].toUpperCase()}`}
              </Avatar>
              <Typography variant="h6">{userData?.dni}</Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
              ></Typography>
            </div>
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
                    <Typography variant="body2">{date}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Empresa
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">Desconocido</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body2" color="textSecondary">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{userData?.email}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>

          <CardActions
            disableSpacing
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div style={{ marginRight: 5 }}>
              <IconButton
                onClick={handleEdit}
                className={classes.backgroundBtn}
                aria-label="edit"
              >
                <EditIcon style={{ color: "#3366FF" }} />
              </IconButton>
            </div>
            <div style={{ marginLeft: 5 }}>
              <IconButton
                onClick={handleLock}
                className={classes.backgroundBtn}
                aria-label="remove"
              >
                <NotInterestedIcon style={{ color: "#FF0000" }} />
              </IconButton>
            </div>
          </CardActions>
        </Card>
      </Grid>
      {/* {isOpen && (
        <EditUserModal
          isOpen={isOpen}
          onCloseModal={handleEdit}
          dni={user?.id || ""}
        />
      )}
      {isBlock && (
        <ShowDialog
          isOpen={isBlock}
          handleCloseDialog={handleLock}
          data={user}
        />
      )} */}
    </>
  );
};

export default UserCard;
