import React from "react";
import {Link} from "react-router-dom";
import "../assets/style/Login.scss";
import ProgressBar from "../components/ProgressBar";
import Logo from "../assets/images/autentia-logo.svg";
import LoginImage from "../assets/images/img-login.svg";
import { useTranslation } from "react-i18next"
import LanguajeSelector from "../components/LanguageSelector"

const Login = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <ProgressBar />
      <main className="login">
        <form className="form">
          <h1 className="title is-1">Autentia<span> Home</span></h1>
          <h3 className="title is-3">{t('title.label')}</h3>
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
          <a className="forgot" href="/">{`${t('password.forget')}`}</a>

          <div className="field submit">
            <div className="control">
              <Link to="/index" className="button is-link">{t('btn.login')}</Link>
            </div>
          </div>

          <div className="form__footer">
            <img className="logo" src={Logo} alt="Autentia Logo"/>
            <span>Copyright 2020</span>
          </div>
        </form>
        <img className="login-image" src={LoginImage} alt="Login"/>
      </main>
    </React.Fragment>
  );
};

export default Login;