import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { logout } from "../../store/common/operations";
import { useDispatch } from "react-redux";
import AuthServices from "../../../config/authServices";
import { Redirect } from "react-router-dom";

const Home = () => {
  const authServices = new AuthServices();
  const { common } = useSelector( (state: StoreState) => state );
  // profile deberia tener la data en su estado but no :'v
  const { profile } = common;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!authServices.isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return(
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="field">
            <h3 className="title is-3">Home</h3>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <h4>Data</h4>
            <p>{}</p>
          </div>
          <div>
            <button onClick={(e) => {e.preventDefault(); handleLogout()}} className="button is-link">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;