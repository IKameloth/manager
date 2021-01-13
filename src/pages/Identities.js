import React from "react";
import { 
  Main,
} from "../assets/styled/content";

const Identities = () => {
  return (
    <React.Fragment>
      <Main>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h3 className="title">Identidad</h3>
            </div>
          </div>
        </section>

        <div className="columns is-centered">
          <div className="column is-7-desktop is-10-mobile is-offset-1-mobile is-10-tablet is-5-fullhd">
            <div className="container">

              <div className="field">
                <label className="label">Rut</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-danger" type="text" placeholder="Ingresar Rut" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-fingerprint"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p className="help is-danger">Rut no válido</p>
              </div>

              <div className="field">
                <label className="label">Tipo de Verificación</label>
                <div className="control has-icons-left has-icons-right">
                  <div className="select is-primary">
                    <select>
                      <option>Verificacion</option>
                      <option>Cédula Nueva</option>
                      <option>Cédula Antigua</option>
                      <option>Cédula y BD</option>
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-check"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
              </div>
              <hr></hr>
              <div className="field">
                <div className="control">
                  <button className="button is-link">Consultar</button>
                </div>
              </div>
            </div>      
          </div>
        </div>
        
      </Main>
    </React.Fragment>
  )
};

export default Identities;