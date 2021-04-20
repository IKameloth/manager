import React from "react";
import { ContentError } from "../../../assets/styled/error";

const Error = (props: any) => {
  return(
    <React.Fragment>
      <ContentError className="columns is-centered">
        <div className="column">
          <div className="field">
            <i className="fas fa-exclamation-circle"></i>
            <h2>Algo salió mal...</h2>
            <h3 className="title">{props.message}</h3>
          </div>
        </div>
      </ContentError>
    </React.Fragment>
  );
};

export default Error;
