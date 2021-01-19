import React, {Component} from "react";
import { 
  Main,
  MainHeader
} from "../assets/styled/content";
import RegisterAdminRolesModal from "../components/modals/RegisterAdminRolesModal";
import AdminRolesTable from "../components/tables/AdminRolesTable";

class AdminRoles extends Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    modalIsOpen: false
  }

  toggleModal = (e) => {
    e.preventDefault();
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  };
  
  render(){
    return (
      <React.Fragment>
        <Main id="main">
          <MainHeader>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title">Admin Roles</h3>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input className="input" type="text" placeholder="Buscar por RUT o nombre" />
                      <span className="icon is-small is-left">
                        <i className="fal fa-search"></i>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="column is-2-fullhd">
                  <button onClick={this.toggleModal} className="button is-primary">Crear Rol</button>
                  <RegisterAdminRolesModal modalIsOpen={this.state.modalIsOpen} onClose={this.toggleModal} />
                </div>
              </div>
            </div>
          </MainHeader>
          <AdminRolesTable/>
        </Main>
      </React.Fragment>
    )
  }
};

export default AdminRoles;