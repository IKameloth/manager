import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../assets/styled/navigation";
import Logo from "../assets/images/autentia-logo.svg";

const Navigation = () => {
  return (
    <React.Fragment>
      <NavBar>
        <Link className="logo" to="/index">
          <img src={Logo} alt="Logo Autentia" />
        </Link>
      </NavBar>
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
          
          <a className="nav__link" href="/institution.html">
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
            
            <a href="/login.html"><i className="fal fa-sign-out-alt"></i></a>
          </div>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Navigation;