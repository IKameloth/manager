import styled from "styled-components";
import LogoTest from "../images/img-login-2.svg";
import BgImageTest from "../images/img-login.svg";
import { makeStyles } from '@material-ui/core/styles';

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
  }
}));

export const BGStyled = styled.div`
  width: 100%;
  height: 100%;

  @media screen and (max-width: 599px) {
    display: none;
  };
`;

export const FooterStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-item: flex-start;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  margin-bottom: 3%;
`;

export const LoginImageStyled1 = styled.img.attrs(props => ({
  src: BgImageTest,
  alt: "Autentia"
}))`
  width: 100%;
  height: 100%;
  align-self: center;
`;

export const LoginImageStyled2 = styled.img.attrs(props => ({
  src: LogoTest,
  alt: "Autentia"
}))`
  width: 100%;
  height: 100%;
  align-self: center;

  @media screen and (min-width: 1024px) {
    display: none;
  };
`;
