import { colors } from "@mui/material";
import { makeStyles } from "@mui/styles";
import theme from "../theme";

import purple from "@mui/material/colors/purple";

export const identityStyles = makeStyles(() => ({
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
