import React from "react";
import { 
  Main,
} from "../assets/styled/content";

const Sensors = () => {
  return (
    <React.Fragment>
      <Main>
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title">Sensores</h3>
                  </div>
                </div>
                <div className="column is-2-fullhd">
                  <button className="button is-primary" id="modal2">Registrar Sensor</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="columns is-centered">
          <div className="column is-7-desktop is-10-mobile is-offset-1-mobile is-10-tablet is-5-fullhd">
            <div className="container">

              <div className="field">
                <label className="label">Código Interno</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-danger" type="text" placeholder="Ingresar Código Interno" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-microchip"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p className="help is-danger">Código Interno no válido</p>
              </div>

              <div className="field">
                <label className="label">Tecnología</label>
                  <div className="columns">
                    <div className="column is-6">
                      <div className="field">
                       <label className="checkbox">
                        <input type="checkbox" defaultChecked />
                        UareU
                      </label>
                      </div>
                    </div>
                    <div className="column is-6">
                      <label className="checkbox">
                        <input type="checkbox" defaultChecked />
                        UareU-gold
                      </label>
                    </div>
                  </div>
              </div>
              <hr></hr>
              <div className="field is-grouped">
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

export default Sensors;