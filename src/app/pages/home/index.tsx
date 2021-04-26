import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { logout } from "../../store/common/operations";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const Home = () => {
  const { common } = useSelector( (state: StoreState) => state );
  const { profile, isLoggedIn } = common;
  
  console.log("is logged in: ", isLoggedIn);
  console.log("user info: ", profile);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isLoggedIn) {
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
            <p>{profile.email}</p>
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