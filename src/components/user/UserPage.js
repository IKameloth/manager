import React, { useEffect, useState } from "react";
import { Main, MainHeader } from "../../assets/styled/content";
import Loading from "../app/common/Loading";
import Error from "../app/common/Error";
import UsersTable from "./UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction, registerRoleAction } from "../../redux/userDuck";
import UserModal from "./UserModal";

export default function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);
  
  const [openModal, setOpenModal] = useState(false);
  
  const handleToggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleOnSubmit = (rut, role) => {
    if (rut.trim().length !== 0 && role.trim().length !== 0) {
      const form = { rut: rut, role: [role] };
      setOpenModal(false);
      dispatch(registerRoleAction(form));
    } else {
      alert("ERROR: Empty data");
    };
  };

  const users = useSelector(store => store.users.data);
  const loading = useSelector(store => store.users.loading);
  const error = useSelector(store => store.users.error);

  const showContent = () => {
    if (loading) {
      return <Loading />
    };

    if (error) {
      return <Error message={error} />
    };

    if (users?.length > 0) {
      return <UsersTable data={users} />
    };
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
    )
};

