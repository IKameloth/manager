import { makeStyles } from "@material-ui/core";

const drawerWidth = 330;

export const SideBar = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    ...theme.mixins.toolbar,
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '21px',
    marginBottom: '21px',
  },
  containerParams: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonBase: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    maxWidth: '70%',
  },
}));
