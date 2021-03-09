import React, {useState} from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/autentia-logo.svg";
import { StyledBurger } from "../../assets/styled/burger";
import { 
  NavBar, 
  Sidebar, 
  SidebarHeader, 
  FooterProfile, 
  ProfileAvatar,
  ProfileName, 
  ProfileRole,
  Nav
} from "../../assets/styled/navigation";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const nameUser = "Camilo Matteo"

  return (
    <React.Fragment>
      {
        open && 
        <div className="modal-background" onClick={() => setOpen(false)}></div> 
      }

      <NavBar>
        <Link className="logo" to="/users">
          <img src={Logo} alt="Logo Autentia" />
        </Link>
      </NavBar>
 
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      
      <Sidebar open={open}>
        <SidebarHeader>
          <h4>Administración de</h4>
          <div className="select" style={{width: "100%"}}>
            <select style={{width: "100%"}}>
              <option value="@AUTENTIAX">@AUTENTIAX</option>
              <option value="BONO">BONO</option>
              <option value="ACEPTA">ACEPTA</option>
            </select>
          </div>
        </SidebarHeader>
        
        <Nav onClick={() => setOpen(false)}>
          {/* className="focus-link" */}
          <Link to="/admin">
            <i className="fal fa-user-circle"></i>
            <span>Admin Roles</span>
          </Link>

          <Link to="/users">
            <i className="fal fa-user-friends"></i>
            <span>Usuarios</span>
          </Link>
          
          <Link to="/institutions">
            <i className="fal fa-building"></i>
            <span>Institución</span>
          </Link>
          
          <Link to="/persons">
            <i className="fal fa-users"></i>
            <span>Personas</span>
          </Link>
        </Nav>

        <Nav onClick={() => setOpen(false)}>
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
              <ProfileName>{nameUser}</ProfileName>
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