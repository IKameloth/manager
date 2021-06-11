import React, { useState, FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/autentia-logo.svg";
import { StyledBurger } from "../../assets/theme/burger";
import { NavBar, Sidebar } from "../../assets/theme/sidebar";
import { logout } from "../store/common/operations";
import { useSelector, useDispatch } from "react-redux";
import { StoreState } from "../store";
import { useToasts } from "react-toast-notifications";
import { cleanErrorMessage } from "../store/common";
import { getInstitutions, setCurrentInstitution } from "../store/common/operations";

interface NavProps {
  profile: any,
};

const Navigation: FunctionComponent<NavProps> = ({
  profile,
}) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const { common } = useSelector((state: StoreState) => state);
  const { errorMessage, listInstitutions, currentInstitution } = common;
  const [isOpen, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    if (listInstitutions.length === 0) {
      console.log("RUN!")
      dispatch(getInstitutions());
    };
  }, []);

  useEffect(() => {
    console.log(errorMessage);
    errorMessage?.length > 0 && setVisible(true);
  }, [errorMessage]);

  useEffect(() => {
    if (visible) {
      console.log("VISIBLE",visible)
      addToast(errorMessage, { appearance: 'warning' });
      setVisible(false);
      dispatch(cleanErrorMessage());
    };
  });

  const handleOnClick = () => {
    dispatch(getInstitutions());
  };

  const nameUser = profile.name || 'Unknow';
  const nameLetters = nameUser.trim().split(' ').reduce((acc: any, el: any) => acc + el.charAt(0).toUpperCase(), "").substring(0, 2);

  const handleLogout = () => {
    dispatch(logout());
  };

  console.log(listInstitutions);

  const handlerSelectInstitution = (value: string) => {
    console.log("SELECTED: ", value);
    const objInstit = listInstitutions?.data.find((ele: any) => ele.attributes.name === value );
    console.log("OBJ INSTIT:", objInstit);
    if (objInstit != null || objInstit != undefined) {
      setRoleName('');
      dispatch(setCurrentInstitution(objInstit));
    } else {
      let message = 'Imposible cargar Rol desde la Institucion';
      addToast(message, { appearance: 'warning', autoDismiss: true })
    };
  };

  console.log("CURRENT_INSTIT:", currentInstitution);
  useEffect(() => {
    if (currentInstitution.attributes?.roles?.length > 0) {
      console.log("Entra");
      setRoleName(currentInstitution.attributes?.roles[0].name);
    }
  });

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
          <h4>Administración de:</h4>
            {
              listInstitutions?.length === 0 ? 
                <div className="is-fullwidth">
                  <button style={{marginLeft: 0}} type="button" className="button is-fullwidth" onClick={() => handleOnClick()}>
                    <span className="icon">
                      <i className="fas fa-lg fa-sync-alt"></i>
                    </span>
                  </button> 
                </div> :
                <div className="select" style={{width: "100%"}}>
                  <select style={{width: "100%"}} onChange={({target: {value}}) => handlerSelectInstitution(value)}>
                    <option>Seleccionar</option>
                    {
                      listInstitutions?.data.map(
                        (institution: any) => <option key={institution.id} value={institution.attributes.name}>{institution.attributes.name}</option>
                      )
                    }
                  </select>
                </div>
            }
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
              <span className="profile-role">
                { roleName.toUpperCase() }
              </span>
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
