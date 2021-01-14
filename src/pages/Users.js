import React, {Component} from "react";
import { 
  Main,
  MainHeader,
  TableMain, THead, TBody,
  BodyFooter,
  FooterResults,
  FooterPagination,
  FooterTotal,
  InputGroup,
  InputPrepend,
  InputAppend
} from "../assets/styled/content";
import RegisterUserRolesModal from "../components/modals/RegisterUserRolesModal";


class Users extends Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    modalIsOpen: false
  };

  toggleModal = (e) => {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  };

  render(){
    return (
      <React.Fragment>
        <Main>
          <MainHeader>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title is-3">Usuarios</h3>
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
                  <button onClick={this.toggleModal} className="button is-primary">Crear nuevo rol</button>
                  <RegisterUserRolesModal modalIsOpen={this.state.modalIsOpen} onClose={this.toggleModal} />
                </div>
              </div>
            </div>
          </MainHeader>
          
          <TableMain className="table">
            <THead>
              <tr>
                <th>Nombre</th>
                <th>Rut</th>
                <th>Rol</th>
                <th></th>
              </tr>
            </THead>
            <TBody>
              <tr>
                <td><a href="/" title="AutentiaX">AutentiaX</a></td>
                <td>15.156.887-6</td>
                <td data-rol="role">
                  <span className="tag is-light">Admin</span>
                  <span className="tag is-light">Admin</span>
                  <span className="tag is-light">Admin</span>
                  <span className="tag is-light" data-tooltip="Admin, Verificador, Elemento 1, Elemento 2">+5</span>
                </td>
                <td>
                  <div className="buttons are-small">
                    <button className="button is-info is-inverted" data-role="modal">Asignar rol</button>
                    <button className="button is-danger is-inverted">Eliminar</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td><a href="/" title="AutentiaX">AutentiaX</a></td>
                <td>15.156.887-6</td>
                <td data-rol="role">
                  <span className="tag is-light">Admin</span>
                  <span className="tag is-light">Admin</span>
                  <span className="tag is-light">Admin</span>
                  <span className="tag is-light" data-tooltip="Admin, Verificador, Elemento 1, Elemento 2">+5</span>
                </td>
                <td>
                  <div className="buttons are-small">
                    <button className="button is-info is-inverted" data-role="modal">Asignar rol</button>
                    <button className="button is-danger is-inverted">Eliminar</button>
                  </div>
                </td>
              </tr>
              <tr>
                <td><a href="/" title="AutentiaX">I-med</a></td>
                <td><span>15.789.988-6</span></td>
                <td data-rol="role"><span className="tag is-light">Admin</span></td>
                <td>
                  <div className="buttons are-small">
                    <button className="button is-info is-inverted" data-role="modal">Asignar rol</button>
                    <button className="button is-danger is-inverted">Eliminar</button>
                  </div>
                </td>
              </tr>
            </TBody>
          </TableMain>
  
          <BodyFooter>
            <FooterResults>
              <p>Mostrando</p>
              <InputGroup>
                <InputPrepend>
                  <i className="input-group-text fas fa-chevron-left"></i>
                </InputPrepend>
                <input className="input-group-number" defaultValue="20" />
                <InputAppend>
                  <i className="input-group-text fas fa-chevron-right"></i>
                </InputAppend>
              </InputGroup>
            </FooterResults>
            <FooterPagination>
              <a className="btn btn-white" href="/">
                <i className="fas fa-chevron-double-left"></i>
              </a>
              <InputGroup>
                <InputPrepend>
                  <i className="input-group-text fas fa-chevron-left"></i>
                </InputPrepend>
                <p><span>1</span> de 25</p>
                <InputAppend>
                  <i className="input-group-text fas fa-chevron-right"></i>
                </InputAppend>
              </InputGroup>
              <a className="btn btn-white" href="/">
                <i className="fas fa-chevron-double-right"></i>
              </a>
            </FooterPagination>
            <FooterTotal>
              <p>Mostrando 1 - 20 de 150 resultados</p>
            </FooterTotal>
          </BodyFooter>
        
        </Main>
      </React.Fragment>
    )
  }
};

export default Users;