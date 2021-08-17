import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2962FF',
    },
    secondary: {
      main: '#123BAB',
    },
    background: {
      default: '#F7F9FC',
    },
  },
  typography: {
    h3: {
      fontFamily: 'Roboto',
      fontWeight: 700,
      fontSize: 48,
    },
    h4: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: 48,
      lineHeight: '56px',
    },
    h5: {
      fontFamily: 'Roboto',
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '0.25px',
    },
    h6: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: 24,
      lineHeight: '28px',
    },
    body1: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '18px',
      lineHeight: '28px',
      letterSpacing: '0.5px',
      opacity: '70%',
    },
    subtitle1: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 20,
    },
  }
});

export default theme;
