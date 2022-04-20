import React from "react";
import {
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MotionItemUp } from "@/app/components/Motion";
import theme from "@/assets/theme";

const useStyles = makeStyles(() => ({
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
  subTitle: string;
  btnText?: string;
  btnAction?: () => void;
  icon?: React.ReactElement;
}

const TitleBar = ({ title, subTitle, btnText, btnAction, icon }: Props) => {
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
                  <Typography variant="body1" className={classes.subTitle}>
                    {subTitle}.
                  </Typography>
                </MotionItemUp>
              </Grid>
            </Grid>
            <Grid item style={{ marginTop: viewMobile ? "10px" : "0px" }}>
              {btnText && btnAction && (
                <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={icon}
                style={{ borderRadius: 20 }}
                onClick={btnAction}
              >
                {btnText}
              </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default TitleBar;
