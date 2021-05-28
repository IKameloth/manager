import React, { useState, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/autentia-logo.svg";
import { StyledBurger } from "../../assets/theme/burger";
import { NavBar, Sidebar } from "../../assets/theme/sidebar";
import { logout } from "../store/common/operations";
import { useDispatch } from "react-redux";

interface NavProps {
  profile: any
}

const Navigation: FunctionComponent<NavProps> = ({
  profile
}) => {
  const [isOpen, setOpen] = useState(false);

  const nameUser = profile.name || 'Unknow';
  const nameLetters = nameUser.trim().split(' ').reduce((acc: any, el: any) => acc + el.charAt(0).toUpperCase(), "").substring(0, 2)

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {
        isOpen && 
        <div className="modal-background" onClick={() => setOpen(false)}></div> 
      }

      <NavBar>
        <Link className="logo" to="/users">
          <img src={Logo} alt="Logo Autentia" />
        </Link>
      </NavBar>
 
      <StyledBurger open={isOpen} onClick={() => setOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      
      <Sidebar open={isOpen}>
        <div className="sidebar-header">
          <h4>Administración de</h4>
          <div className="select" style={{width: "100%"}}>
            <select style={{width: "100%"}}>
              <option value="@AUTENTIAX">@AUTENTIAX</option>
              <option value="BONO">BONO</option>
              <option value="ACEPTA">ACEPTA</option>
            </select>
          </div>
        </div>
        
        <div className="nav" onClick={() => setOpen(false)}>
          {/* className="focus-link" */}
          <Link className="links" to="/">
            <i className="fal fa-house"></i>
            <span>Home</span>
          </Link>

          <Link className="links" to="/admin">
            <i className="fal fa-user-circle"></i>
            <span>Admin Roles</span>
          </Link>

          <Link className="links" to="/users">
            <i className="fal fa-user-friends"></i>
            <span>Usuarios</span>
          </Link>
          
          <Link className="links" to="/institutions">
            <i className="fal fa-building"></i>
            <span>Institución</span>
          </Link>
          
          <Link className="links" to="/persons">
            <i className="fal fa-users"></i>
            <span>Personas</span>
          </Link>
        </div>

        <div className="nav" onClick={() => setOpen(false)}>
          <Link className="links" to="/identities">
            <i className="fal fa-id-card"></i>
            <span>Identidad</span>
          </Link>

          <Link className="links" to="/sensors">
            <i className="fal fa-fingerprint"></i>
            <span>Sensores</span>
          </Link>
        </div>

        <div>
          <div className="footer-profile">
            <span className="profile-avatar">{nameLetters}</span>
            <div>
              <span className="profile-name">{nameUser}</span>
              <span className="profile-role">Role</span>
            </div>
            <button 
              type="button" 
              className="link-logout" 
              onClick={(e) => {e.preventDefault(); handleLogout()}} 
            >
              <i className="fal fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </Sidebar>
    </>
  )
}

export default Navigation;
