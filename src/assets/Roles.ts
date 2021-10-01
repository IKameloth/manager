import { makeStyles } from '@material-ui/core';

export const useRolesStyle = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 900,
    borderRadius: '10px',
    boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)',
  },
  container: {
    alignItems: 'center',
    margin: '9px 25px 8px 25px'
  }
}));
