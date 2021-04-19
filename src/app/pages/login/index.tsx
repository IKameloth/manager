import React from "react";
import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { StoreState } from "../../store";

import { LoginStyled, LogoImage, LoginImage } from "../../../assets/theme/login";

const Login = () => {
  const { isLoading } = useSelector((state: StoreState) => state.common);

  const history = useHistory();
  
  const onFinish = () => {
    history.push("/");
  };

  return(
    <LoginStyled>
      <form className="form">
        <div className="content">
          <h1 className="title is-1 h1">Autentia<span> Admin</span></h1>
          <h3 className="title is-3">Ingresar</h3>
          <div className="fields">
            <div className="field">
              <label className="label">DNI</label>
              <div className="control has-icons-left has-icons-right">
                <input 
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
                  <select >
                    <option>Seleccionar</option>
                    <option>Chile</option>
                    <option>Chile</option>
                    <option>Chile</option>
                  </select>
                </div>
                <span className="icon is-small is-left">
                  <i className="far fa-flag"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <button type="button" className="button is-link">Ingresar</button>
            </div>
          </div>
          {/* <Forgot href="/">¿Olvido su contraseña?</Forgot> */}
          <br></br>
          <div className="field">
            <span>Copyright 2020</span><br></br>
            <LogoImage/>
          </div>
        </div>
      </form>
      <LoginImage/>
    </LoginStyled>

  );
};

export default Login;