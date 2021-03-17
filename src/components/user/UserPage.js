/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Main, MainHeader } from "../../assets/styled/content";
import Loading from "../app/common/Loading";
import Error from "../app/common/Error";
import UsersTable from "./UsersTable";
import UserModal from "./UserModal";
import { connect } from "react-redux";
import * as usersAction from "../../actions/usersAction";
import * as alertAction from "../../actions/alertAction";

const { setAlert } = alertAction
const { getUsersAction, registerRoleAction, cleanerUsersAction } = usersAction;

function Users(props) {
  const [openModal, setOpenModal] = useState(false);

  const { loading, error, users} = props.usersReducer;

  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    console.log("mount users")
    const getUsers = async() => {
      if (!users.length) {
        await props.getUsersAction();
      };
    };
    
    getUsers().catch(null);
  }, []);

  useEffect(() => {
    return () => {
      console.log("unmount user component");
      props.cleanerUsersAction();
    };
  }, []);

  const handleOnSubmit = async (rut, role) => {
    if (rut.trim().length !== 0 && role.trim().length !== 0) {
      const form = { rut: rut, role: [role] };
      setOpenModal(false);
      await registerRoleAction(form);
    } else {
      props.setAlert("Favor llenar los datos requeridos", "warning");
    };
  };

  const showContent = () => {
    if (loading) {
      return <Loading />
    };

    if (error) {
      return <Error message={error} />
    };

    return <UsersTable data={users} />
  };

  return (
    <React.Fragment>
      <Main>
        <MainHeader>
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <h3 className="title is-3">Usuarios</h3>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <p className="control has-icons-left has-icons-right is-hidden">
                    <input className="input" type="text" placeholder="Buscar por RUT o nombre" />
                    <span className="icon is-small is-left">
                      <i className="fal fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>
              <div className="column is-3">
                <button onClick={() => handleToggleModal()} className="button is-primary">Crear nuevo rol</button>
              </div>
              <UserModal 
                openModal={openModal} 
                onClose={handleToggleModal} 
                onSubmit={handleOnSubmit}
              />
            </div>
          </div>
        </MainHeader>
        {
          showContent()
        }
      </Main>
    </React.Fragment>
  );
};

const mapStateToProps = ({ usersReducer, alertsReducer }) => {
  return {
    usersReducer,
    alertsReducer,
  };
};

const mapDispatchToProps = {
  setAlert,
  getUsersAction,
  registerRoleAction,
  cleanerUsersAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);