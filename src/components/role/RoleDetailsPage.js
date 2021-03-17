/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Loading from "../app/common/Loading";
import Error from "../app/common/Error";
import {Main, MainHeader} from "../../assets/styled/content";
import {Link} from "react-router-dom";
import RoleList from "./RoleList";
import UserInfo from "./UserInfo";
import { connect } from "react-redux";
import UserModal from "../user/UserModal";
import * as alertAction from "../../actions/alertAction";
import * as rolesAction from "../../actions/rolesAction";

const { setAlert } = alertAction;
const { getUserDataAction, cleanerRolesAction, removeRoleAction, asignRoleAction, updateRolesAction } = rolesAction;

function RoleDetails(props) {
  const [modalForAssign, setModalForAssign] = useState(false);
  const { loading, error, userData, reload } = props.rolesReducer;

  const getInitUsers = async() => {
    if (!userData.length) {
      await props.getUserDataAction(props.match.params.userID);
    };
  };

  useEffect(() => {
    console.log("did-mount role component");
    getInitUsers().catch(null);
  }, []);

  useEffect(() => {
    return () => {
      console.log("will-unmount role component");
      props.cleanerRolesAction();
    };
  }, []);

  useEffect(() => {
    if (userData.length === 0 && reload) {
      console.log("did-update role component");
      getInitUsers().catch(null);
    };
  }, [userData]);


  const toggleModalAsign = () => {
    setModalForAssign(!modalForAssign);
  };

  const handleOnSubmit = (rut, role) => {
    const reData = {
      user: rut,
      name: role
    };

    props.asignRoleAction(reData);
    setModalForAssign(false);
  };

  const handleRemoveModal = (roleObj) => {
    props.removeRoleAction(roleObj);
  };

  const showContent = () => {
    if (loading) {
      return <Loading />
    };

    if (error) {
      return <Error message={error} />
    };

    return (
      <RoleList 
        {...userData} 
        onSubmit={handleRemoveModal} 
      />
    );
  };

  return(
    <>
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
            <div className="container">
              <UserInfo {...userData} />
              {showContent()}
            </div>
            <div className="level is-centered">
              <div className="level-item">
                { userData.length !== 0 ? <button onClick={() => toggleModalAsign()} className="button is-info is-outlined is-small">Asignar Rol</button> : null}
              </div>
            </div>
            <UserModal
              openModal={modalForAssign} 
              onClose={toggleModalAsign} 
              onSubmit={handleOnSubmit}
            />
          </div>
        </div>
      </Main>
    </>
  );
};

const mapStateToProps = ({ rolesReducer }) => ({
  rolesReducer: rolesReducer
});

const mapDispatchToProps = {
  setAlert,
  getUserDataAction,
  cleanerRolesAction,
  removeRoleAction,
  asignRoleAction,
  updateRolesAction
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleDetails);