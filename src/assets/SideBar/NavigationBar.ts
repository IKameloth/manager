import { makeStyles } from "@mui/styles";
import theme from "../theme";
import Logo from "../images/autentia-logo.svg";

export const navigationBar = makeStyles(() => ({
appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  primary: {
    color: theme.palette.primary.main
  },
  img: {
    backgroundImage: `url(${Logo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: 160,
    height: 30,
  },
}));
