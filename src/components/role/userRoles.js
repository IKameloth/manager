import React, { useEffect } from "react";
import { Main, MainHeader } from "../../assets/styled/content";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAction } from "../../redux/roleDuck";
import Error from "../app/common/Error";
import Loading from "../app/common/Loading";
import {Link} from "react-router-dom";
import RolesFromUser from "./RolesFromUser";
// import RegisterUserRolesModal from "../user/UserModal";

export default function UserRoles() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserDataAction());
  }, [dispatch]);

  const userData = useSelector(store => store.roles.userData);
  const loading = useSelector(store => store.roles.loading);
  const error = useSelector(store => store.roles.error);

  const showContent = () => {
    if (loading) {
      return <Loading />
    };

    if (error) {
      return <Error />
    };

    if (userData?.length > 0) {
      return (
        <div className="container">
          <RolesFromUser 
            userData={userData}  
          />
        </div>
      );
    };
  };

  return(
    <React.Fragment>
      <Main id="main">
        <MainHeader>
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <h3 className="title">Roles de Usuario</h3>
                </div>
              </div>
            </div>
            <div className="level is-mobile">
              <div className="level-left has-text-centered">
                <Link to="/users" className="button is-light is-small">
                  <span className="icon">
                  <i className="fas fa-arrow-circle-left"></i>
                  </span>
                  <span>Volver</span>
                </Link>
              </div>
            </div>
          </div>
        </MainHeader>

        <div className="columns is-centered" style={{width: "100%"}}>
          <div className="column is-7-desktop is-11-mobile is-offset-1-mobile is-10-tablet is-5-fullhd">
            {
              showContent()
            }
            <div className="level is-centered">
              <div className="level-item">
                <button className="button is-info is-outlined is-small">Asignar Rol</button>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </React.Fragment>
  );
};
