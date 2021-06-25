import React, { useState } from "react";
import { LoginStyled, LogoImage, LoginImage } from "../../../assets/theme/login";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../store";
import { loginRequest } from "../../store/common/operations";
import { Redirect } from "react-router";
import { useToasts } from "react-toast-notifications";
import Modal from "../../components/Modal";

const Login = () => {
  const countries = ["CHILE", "ECUADOR", "COLOMBIA", "RDOMINICANA"];

  const dispatch = useDispatch();
  const { common } = useSelector((state: StoreState) => state);
  const { errorMessage, isLoggedIn } = common;
  const { addToast } = useToasts();
  
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");

  const handleOnSubmit = (e:any, dni: string, password: string, countryName: string) => {
    e.preventDefault();
    if (dni.trim().length !== 0 && password.trim().length !== 0 && countryName?.trim().length !== 0) {
      dispatch(loginRequest(dni, country, password));
    } else {
      let message = "Favor rellenar todos los campos";
      addToast(message, { appearance: 'warning', autoDismiss: true });
    };
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
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
                  value={dni}
                  onChange={({ target: {value} }) => setDni(value) }
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
                  value={password}
                  onChange={({ target: {value} }) => setPassword(value) }
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
                <select onChange={({target: {value}}) => setCountry(value)}>
                  <option>Seleccionar</option>
                  {countries?.map((name) => {
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
              <button type="submit" onClick={(e) => handleOnSubmit(e, dni, password, country)} className="button is-link">Ingresar</button>
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
      <Modal isShown={!!errorMessage} modalContent={errorMessage} typeModal="ERROR"/>
      <LoginImage/>
    </LoginStyled>
  );
};

export default Login;