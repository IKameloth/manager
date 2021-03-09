import React from "react";
import {Link} from "react-router-dom";
import ProgressBar from "../app/common/ProgressBar";
import { Main, Form, H1, Forgot, LogoImage, LoginImage } from "../../assets/styled/login";

const Login = () => {
  const countries = ["CHILE", "ECUADOR", "COLOMBIA", "RDOMINICANA"]
  return (
    <React.Fragment>
      <ProgressBar />
      <Main>
        <Form>
          <div className="content">
            <H1 className="title is-1">Autentia<span> Admin</span></H1>
            <h3 className="title is-3">Ingresar</h3>
            <div className="fields">
              <div className="field">
                <label className="label">DNI</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-primary" type="text" placeholder="Ingresar dni" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-fingerprint"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Contraseña</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-primary" type="password" placeholder="Ingresar contraseña" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">País</label>
                <div className="control has-icons-left has-icons-right">
                  <div className="select is-primary is-fullwidth">
                    <select name="institution">
                      {
                        countries.map((country) => {
                          return <option value={country} key={country}>{country}</option>
                        })
                      }
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="far fa-flag"></i>
                  </span>
                </div>
              </div>
            </div>

            <Forgot href="/">¿Olvido su contraseña?</Forgot>

            <div className="field">
              <Link to="/users" className="button is-link">Ingresar</Link>
            </div>

            <div className="field">
              <span>Copyright 2020</span><br></br>
              <LogoImage/>
            </div>
          </div>
        </Form>
        <LoginImage/>
      </Main>
    </React.Fragment>
  );
};

export default Login;