import React, { useState } from "react";
import { LoginStyled, LogoImage, LoginImage } from "../../../assets/theme/login";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../../store";
import { loginRequest } from "../../store/common/operations";
import SuperModal from "../../components/SuperModal";

const Login = () => {
  const countries = ["CHILE", "ECUADOR", "COLOMBIA", "RDOMINICANA"];
  const dispatch = useDispatch();
  const { common } = useSelector((state: StoreState) => state);
  const { errorMessage } = common;
  
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");

  const handleOnSubmit = (dni: string, password: string, countryName: string) => {
    if (dni.trim().length !== 0 && password.trim().length !== 0 && countryName?.trim().length !== 0) {
      dispatch(loginRequest(dni, country, password));
    } else {
      alert("Favor rellenar todos los campos");
    };
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
              <button type="submit" onClick={() => handleOnSubmit(dni, password, country)} className="button is-link">Ingresar</button>
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
      <SuperModal open={ !!errorMessage } message={ errorMessage } />
    </LoginStyled>
  );
};

export default Login;