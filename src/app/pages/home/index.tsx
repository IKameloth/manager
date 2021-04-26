import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";
import { Redirect } from "react-router-dom";
import { MainStyled } from "../../../assets/theme/container";
import NavBar from "../../components/Navbar";

const Home = () => {
  const { common } = useSelector( (state: StoreState) => state );
  const { profile, isLoggedIn } = common;
  
  console.log("is logged in: ", isLoggedIn);
  console.log("user info: ", profile);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return(
    <>
      <NavBar />
      <MainStyled>
        <div className="main-header">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <h3 className="title">Home</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="columns is-centered" style={{width: "100%"}}>
          <div className="column is-7-desktop is-10-mobile is-offset-1-mobile is-10-tablet is-5-fullhd">
            <div className="container">
              <div className="field"></div>
            </div>      
          </div>
        </div>
      </MainStyled>
    </>
  );
};

export default Home;