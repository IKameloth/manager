import React, { Component } from "react";
import Loading from "./Loading";
import Error from "./Error";
import {Main, MainHeader} from "../assets/styled/content";


class InstitutionNew extends Component {
  state = {
    loading: false,
    error: null,
    form: {
      name: "",
      rut: "",
      email: "",
      nemo: "",
      country: "",
      description: "",
      status: false,
      flag: false,
    }
  };

  render() {
    const { error, loading } = this.state;

    if (loading === true) {
        return <Loading />
    };

    if (error) {
        return ( <Error message={error} /> );
    }

    return (
      <React.Fragment>
        <Main id="main">
          <MainHeader>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title">Registrar Institución</h3>
                  </div>
                </div>
              </div>
            </div>
          </MainHeader>

          <div className="columns is-centered" style={{width: "100%"}}>
            <div className="column is-7-desktop is-10-mobile is-offset-1-mobile is-10-tablet is-5-fullhd">
              <div className="container">
  
                <div className="field">
                  <label className="label">Nombre</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" type="text" placeholder="Ingresar Nombre" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                  <p className="help is-danger">Nombre no válido</p>
                </div>
  
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
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" type="email" placeholder="Ingresar Email" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                  <p className="help is-danger">Email no válido</p>
                </div>

                <div className="field">
                  <label className="label">NEMO</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" type="email" placeholder="Ingresar 4 Carácteres" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <p className="help is-danger">NEMO no válido</p>
                </div>

                <div className="field">
                  <label className="label">País</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" type="email" placeholder="Ingresar País" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-flag"></i>
                    </span>
                  </div>
                  <p className="help is-danger">País no válido</p>
                </div>

                <div className="field">
                  <label className="label">Descripción</label>
                  <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger" type="email" placeholder="Ingresar Descripción" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-paragraph"></i>
                    </span>
                  </div>
                  <p className="help is-danger">Descripción no válido</p>
                </div>
                
                <div className="field">
                  <div className="level">
                    <div className="level-left has-text-centered">
                      <div>
                        <p className="heading">Estado</p>
                        <p className="heading">{this.state.form.status.checked ? "1" : "0"}</p>
                      
                      </div>
                    </div>
                    <div className="level-left has-text-centered">
                      <div>
                        <p className="heading">Flag</p>
                        <p className="heading">{this.state.form.flag.checked ? "1" : "0"}</p>
                        <input id="switchRoundedInfo" type="checkbox" name="switchRoundedInfo" class="switch is-rounded is-info" checked="checked"></input>
                      </div>
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
    );
  };
};

export default InstitutionNew;