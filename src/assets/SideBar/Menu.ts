import { makeStyles } from "@mui/styles";
import theme from "../theme";

export const MenuStyled = makeStyles(() => ({
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: 25,
    width: 300,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkStyled: {
    textDecoration: 'none',
    color: '#000000',
    opacity: '75%',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));