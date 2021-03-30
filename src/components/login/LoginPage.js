import React, { useState } from "react";
import ProgressBar from "../app/common/ProgressBar";
import { Main, Form, H1, LogoImage, LoginImage } from "../../assets/styled/login";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../actions/auth";
import { setAlert } from "../../actions/alertAction";

const Login = (props) => {
  const countries = ["CHILE", "ECUADOR", "COLOMBIA", "RDOMINICANA"];

  const dispatch = useDispatch();

  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [countryName, setCountryName] = useState("");

  const { isLoggedIn } = useSelector(state => state.auth);

  const handleOnSubmit = (rut, password, countryName) => {
    if (rut.trim().length !== 0 && password.trim().length !== 0 && countryName?.trim().length !== 0) {
      dispatch(login(rut, password, countryName))
        .then(() => {
          props.history.push("/users");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setAlert("Favor rellenar todos los campos", "warning"));
    };
  };

  if (isLoggedIn) {
    return <Redirect to="/users" />;
  };

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
                  <input 
                    value={rut}
                    onChange={({target: {value}}) => setRut(value)}
                    className="input is-primary" 
                    type="text" 
                    placeholder="Ingresar DNI o Rut" 
                    required={true}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-fingerprint"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Contraseña</label>
                <div className="control has-icons-left has-icons-right">
                  <input 
                    value={password}
                    onChange={({target: {value}}) => setPassword(value)}
                    className="input is-primary" 
                    type="password" 
                    placeholder="Ingresar contraseña" 
                    required={true}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">País</label>
                <div className="control has-icons-left has-icons-right">
                  <div className="select is-primary is-fullwidth">
                    <select onChange={({target: {value}}) => setCountryName(value)}>
                      <option>Seleccionar</option>
                      {countries.map((name) => {
                        return <option value={name} key={name}>{name}</option>
                      })}
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="far fa-flag"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <button type="button" onClick={() => handleOnSubmit(rut, password, countryName)} className="button is-link">Ingresar</button>
              </div>
            </div>
            {/* <Forgot href="/">¿Olvido su contraseña?</Forgot> */}
            <br></br>
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