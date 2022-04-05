import React from "react";
import {
  Button,
  Grid,
  Icon,
  makeStyles,
  Paper,
  SvgIconTypeMap,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { MotionItemUp } from "@/app/components/Motion";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: "auto",
    maxWidth: 900,
    flexGrow: 1,
    borderRadius: 10,
    boxShadow:
      "0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)",
  },
  title: {
    color: "#000000",
    textTransform: "capitalize",
  },
  subTitle: {
    marginTop: 6,
    textTransform: "capitalize",
  },
}));

interface Props {
  title: string;
}

const TitleBarWithoutButton = ({ title }: Props) => {
  const classes = useStyles();
  const viewMobile = useMediaQuery("(max-width:425px)");
  return (
    <Grid item xs={12} md={12}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm
            container
            alignItems="center"
            justifyContent="center"
            style={{ margin: "9px 25px" }}
          >
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <MotionItemUp>
                  <Typography variant="h4" className={classes.title}>
                    {title}
                  </Typography>
                </MotionItemUp>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default TitleBarWithoutButton;
