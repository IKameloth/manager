import React, {Component} from "react";
import { 
  Main,
  MainHeader
} from "../assets/styled/content";
import RegisterUserModal from "../components/modals/RegisterUserModal";

class Persons extends Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    modalIsOpen: false,
  };

  toggleModal = (e) => {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  }

  render() {
    return (
      <React.Fragment>
        <Main>
          <MainHeader>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title">Personas</h3>
                  </div>
                </div>
                <div className="column is-2-fullhd">
                  <button onClick={this.toggleModal} className="button is-primary" >Registrar Usuario</button>
                  <RegisterUserModal
                    modalIsOpen={this.state.modalIsOpen}
                    onClose={this.toggleModal}
                    // onRegisterUser={this.onRegisterUser}
                  />
                </div>
              </div>
            </div>
          </MainHeader>
  
          <div className="columns is-centered" style={{width: "100%"}}>
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
                <hr></hr>
                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link">Buscar</button>
                  </div>
                </div>
              </div>      
            </div>
          </div>
          
        </Main>
      </React.Fragment>
    )
  };
};

export default Persons;