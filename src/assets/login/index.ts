import { Box } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    borderRadius: 200,
    margin: theme.spacing(3, 0, 2),
  },
  footer: {
    backgroundColor: '#f1f1f1',
    width: '100%',
    height: 300,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  }
}));

export const Footer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItem: 'flex-start',
  justifyContent: 'flex-end',
  position: 'absolute',
  bottom: 0,
  marginBottom: '3%'
});