import React from "react";
import ProgressBar from "../components/ProgressBar";
import Navigation from "../components/Navigation";
import Content from "../components/Content";

const Dashboard = () => {
  return (
    <React.Fragment>
      <ProgressBar />
      <Navigation />
      <Content />
    </React.Fragment>
  );
};


export default Dashboard;