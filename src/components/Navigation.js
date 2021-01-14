import React, {useState} from "react";
import styled from "styled-components";
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


const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  left: 20px;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 2;

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? "red" : "#2962ff"};
    border-color: transparent;
    transform-origin: 1px;
    transition: all 0.3s linear;
    display: none;

    @media (max-width: 768px) {
      display: flex;
    }

    &:nth-child(1) {
      transform: ${({open}) => open ? "rotate(45deg)" : "rotate(0)"};
    }

    &:nth-child(2) {
      transform: ${({open}) => open ? "translateX(100%)" : "translateX(0)"};
      opacity: ${({open}) => open ? 0 : 1};
    }

    &:nth-child(3) {
      transform: ${({open}) => open ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`;

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      { open && 
        <div className="modal-background" style={{zIndex: 1}} onClick={() => setOpen(false)}></div> 
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
        
        <Nav>
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