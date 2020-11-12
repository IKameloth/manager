import React from "react";
import {Link} from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { useTranslation } from "react-i18next"
import LanguajeSelector from "../components/LanguageSelector"
import { Main, Form, H1, H3, Forgot, LogoImage, LoginImage, SectionLink } from "../assets/styled/login";

const Login = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <ProgressBar />
      <Main>
        <Form>
          <div className="content">
            <H1 className="title is-1">Autentia<span> Admin</span></H1>
            <H3 className="title is-3">{t('title.label')}</H3>
            <div className="fields">
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
            </div>

            <LanguajeSelector/>
            <Forgot href="/">{`${t('password.forget')}`}</Forgot>

            <SectionLink className="field">
              <div className="control">
                <Link to="/index" className="button is-link">{t('btn.login')}</Link>
              </div>
            </SectionLink>

            <div>
              <LogoImage/>
              <span>Copyright 2020</span>
            </div>
          </div>
        </Form>
        <LoginImage/>
      </Main>
    </React.Fragment>
  );
};

export default Login;