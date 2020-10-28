import React from "react";
import ProgressBar from "../components/ProgressBar";
import { 
  Navigation, 
  LogoNavBar, 
  Main, 
  SideBar, 
  FooterProfile, 
  ProfileAvatar, 
  ProfileName,
  ProfileRole,
  SideBarHeader,
  H4,
  Nav,
  NavLink,
  I
} from "../assets/styled/dashboard";

const Dashboard = () => {
  return (
    <React.Fragment>
      <ProgressBar />
      <Navigation>
        <LogoNavBar />
      </Navigation>
      <SideBar>
        <SideBarHeader>
          <H4>Administración de</H4>
          <div className="select" style={{width: "100%"}}>
            <select style={{width: "100%"}}>
              <option value="@AUTENTIAX">@AUTENTIAX</option>
              <option value="AUTENTIA">AUTENTIA</option>
            </select>
          </div>
        </SideBarHeader>

        <Nav>
          <NavLink className="active" href="/">
            <I className="fal fa-user-friends"></I>
            <span>Usuarios</span>
          </NavLink>
          <NavLink href="/">
            <I className="fal fa-building"></I>
            <span>Institución</span>
          </NavLink>
          <NavLink href="/">
            <I className="fal fa-users"></I>
            <span>Personas</span>
          </NavLink>
        </Nav>
        <Nav>
          <NavLink href="/">
            <I className="fal fa-id-card"></I>
            <span>Identidad</span>
          </NavLink>
          <NavLink href="/">
            <I className="fal fa-fingerprint"></I>
            <span>Sensores</span>
          </NavLink>
        </Nav>

        <div className="sidebar__footer">
          <FooterProfile>
            <ProfileAvatar>CB</ProfileAvatar>
            <div className="profile__data">
              <ProfileName>Erick Matteo</ProfileName>
              <ProfileRole>Administrador</ProfileRole>
            </div>
            <a href="/">
              <I className="fal fa-sign-out-alt"></I>
            </a>
          </FooterProfile>
        </div>
      </SideBar>
      
      <main className="main">
        <div className="main__header">
          <h3 className="title is-3">Usuarios</h3>
          <div className="field" style={{marginLeft: "auto"}}>
            <p className="control has-icons-left has-icons-right">
              <input className="input" type="text" placeholder="Buscar por RUT o nombre" />
              <span className="icon is-small is-left">
                <i className="fal fa-search"></i>
              </span>
            </p>
          </div>
          <button className="button is-primary" id="modal2" style={{marginLeft: "16px"}}>Crear rol</button>
        </div>
        <table className="table main__content">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rut</th>
              <th>Rol</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
        <div className="body__footer">
          <div className="footer__results">
            <p>Mostrando</p>
            <div className="input-group">
              <div className="input-group-prepend">
                <i className="input-group-text fas fa-chevron-left"></i>
              </div>
              <input className="input-group-number" defaultValue="20" />
              <div className="input-group-append">
                <i className="input-group-text fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
          <div className="footer__pagination">
            <a className="btn btn-white" href="/">
              <i className="fas fa-chevron-double-left"></i>
            </a>
            <div className="input-group">
              <div className="input-group-prepend">
                <i className="input-group-text fas fa-chevron-left"></i>
              </div>
              <p><span>1</span> de 25</p>
              <div className="input-group-append">
                <i className="input-group-text fas fa-chevron-right"></i>
              </div>
            </div>
            <a className="btn btn-white" href="/">
              <i className="fas fa-chevron-double-right"></i>
            </a>
          </div>
          <div className="footer__total">
            <p>Mostrando 1 - 20 de 150 resultados</p>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};


export default Dashboard;