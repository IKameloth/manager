import React from "react";
import ProgressBar from "../components/ProgressBar";
import "../assets/style/Dashboard.scss";

const Dashboard = () => {
  return (
    <React.Fragment>
      <ProgressBar />
      <nav className="navigation">
        <img className="logo" src="https://console-dev.autentia.cl/assets/autentia-logo-8fd24211ef9c763a935fd9e9544ed71e7ccaf7baed2fd53877c574275ece3712.svg" alt="Autentia Logo" />
      </nav>
      <div className="sidebar">
        <div className="sidebar__header">
          <h4>Administración de</h4>
          <div className="select" style={{width: "100%"}}>
            <select style={{width: "100%"}}>
              <option value="@AUTENTIAX">@AUTENTIAX</option>
              <option value="AUTENTIA">AUTENTIA</option>
            </select>
          </div>
        </div>
        <nav className="nav">
          <a className="nav__link active" href="/">
            <i className="fal fa-user-friends"></i>
            <span>Usuarios</span>
          </a>
          <a className="nav__link" href="/">
            <i className="fal fa-building"></i>
            <span>Institución</span>
          </a>
          <a className="nav__link" href="/">
            <i className="fal fa-users"></i>
            <span>Personas</span>
          </a>
        </nav>
        <nav className="nav">
          <a className="nav__link" href="/">
            <i className="fal fa-id-card"></i>
            <span>Identidad</span>
          </a>
          <a className="nav__link" href="/">
            <i className="fal fa-fingerprint"></i>
            <span>Sensores</span>
          </a>
        </nav>
        <div className="sidebar__footer">
          <div className="footer__profile">
            <span className="profile__avatar">CB</span>
            <div className="profile__data">
              <span className="profile__name">Camilo Bravo</span>
              <span className="profile__role">Administrador</span>
            </div>
            <a href="/">
              <i className="fal fa-sign-out-alt"></i>
            </a>
          </div>
        </div>
      </div>
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