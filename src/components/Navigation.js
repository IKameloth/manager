import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/autentia-logo.svg";
import { 
  NavBar, 
  Sidebar, 
  SidebarHeader, 
  FooterProfile, 
  ProfileAvatar,
  ProfileName, 
  ProfileRole,
  Nav
} from "../assets/styled/navigation";

const Navigation = () => {
  return (
    <React.Fragment>
      <NavBar>
        <Link className="logo" to="/index">
          <img src={Logo} alt="Logo Autentia" />
        </Link>
      </NavBar>

      <Sidebar>
        <SidebarHeader>
          <h4>Administración de</h4>
          <div className="select" style={{width: "100%"}}>
            <select style={{width: "100%"}}>
              <option value="@AUTENTIAX">@AUTENTIAX</option>
              <option value="AUTENTIA">AUTENTIA</option>
            </select>
          </div>
        </SidebarHeader>
        
        <Nav>
          <Link to="/index" className="focus-link">
            <i className="fal fa-user-friends"></i>
            <span>Usuarios</span>
          </Link>
          
          <Link to="/index">
            <i className="fal fa-building"></i>
            <span>Institución</span>
          </Link>
          
          <Link to="/persons">
            <i className="fal fa-users"></i>
            <span>Personas</span>
          </Link>
        </Nav>

        <Nav>
          <Link to="/identities">
            <i className="fal fa-id-card"></i>
            <span>Identidad</span>
          </Link>

          <Link to="/sensors">
            <i className="fal fa-fingerprint"></i>
            <span>Sensores</span>
          </Link>
        </Nav>

        <div>
          <FooterProfile>
            <ProfileAvatar>CB</ProfileAvatar>
            <div>
              <ProfileName>Camilo Bravo</ProfileName>
              <ProfileRole>Administrador</ProfileRole>
            </div>
            <Link to="/login">
              <i className="fal fa-sign-out-alt"></i>
            </Link>
          </FooterProfile>
        </div>

      </Sidebar>
    </React.Fragment>
  )
}

export default Navigation;