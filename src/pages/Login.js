import React from "react";
import {Link} from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Logo from "../assets/images/autentia-logo.svg";
import LoginImageB from "../assets/images/img-login.svg";
import { useTranslation } from "react-i18next"
import LanguajeSelector from "../components/LanguageSelector"
import styled from 'styled-components'

const Login = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <ProgressBar />
      <Main>
        <Form>
          <H1 className="title is-1">Autentia<span> Home</span></H1>
          <H3 className="title is-3">{t('title.label')}</H3>
          <div className="field">
            <label className="label">{t('dni.label')}</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-danger" type="email" placeholder={`${t('dni.placeholder')}`}/>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p className="help is-danger">{t('dni.invalid')}</p>
          </div>

          <div className="field">
            <label className="label">{t('password.label')}</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-danger" type="password" placeholder={`${t('password.placeholder')}`}/>
              <span className="icon is-small is-left">
                <i className="fas fa-fingerprint"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            <p className="help is-danger">{t('password.invalid')}</p>
          </div>

          <LanguajeSelector/>
          <Forgot href="/">{`${t('password.forget')}`}</Forgot>

          <div className="field" style={{marginBottom: "12rem"}}>
            <div className="control">
              <Link to="/index" className="button is-link">{t('btn.login')}</Link>
            </div>
          </div>

          <div>
            <LogoImage src={Logo} alt="Autentia Logo"/>
            <span>Copyright 2020</span>
          </div>
        </Form>
        <LoginImage src={LoginImageB} alt="Login"/>
      </Main>
    </React.Fragment>
  );
};

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background: #f7f9fc;
  display: grid;
  grid-template-columns: 1fr;
  
  @media screen and (min-width: 40em) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 72em) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

const H1 = styled.h1`
  margin-top: 8rem;
  margin-bottom: 6rem !important;
  span {
    color: #2962ff;
  }
`;

const H3 = styled.h3`
  margin-bottom: 2rem !important;
`;

const Form = styled.form`
  grid-column: initial;
  background: #fff;
  padding-left: 3.125vw;
  padding-right: 3vw;

  @media screen and (min-width: 40em) {
    grid-column: 1 / 3;
  }
  @media screen and (min-width: 72em) {
    grid-column: 1 / span 3;
  }
`;

const LoginImage = styled.img`
  width: 100%;
  grid-column: initial;
  align-self: center;
  display: none;
  @media screen and (min-width: 40em) {
    grid-column: 3 / 5;
    display: inline;
    object-fit: cover;
    height: 70%;
    object-position: 2vw;
  }
  @media screen and (min-width: 72em) {
    grid-column: 4 / last-line;
    display: inline;
  }
`;

const Forgot = styled.a`
  margin-top: 0.5rem;
  margin-bottom: 2.5rem;
  display: inline-block;
`;

const LogoImage = styled.img`
  display: block;
  margin-bottom: 1rem;
`;

export default Login;