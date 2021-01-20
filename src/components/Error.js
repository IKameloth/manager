import React from "react";
import styled from "styled-components";

const ContentError = styled.div`
  z-index: 0.1;
  grid-column: 5 / 12;
  border-radius: 8px;
  background: inherit;
  position: relative;
  text-align: center;
  justify-content: center;
  margin-top: 5px;

  i {
    font-size: 100px;
    color: red;
  }

  .field {
    width: 50%;
    height: 50%;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }

  @media (max-width: 1024px) {
    margin-top: 0;
    grid-column: 6 / 12;
    grid-row: 2 / 3;
  }

  @media (max-width: 768px) {
    margin-top: 0;
    margin-right: 0px;
    grid-column: 3 / 12;
    grid-row: 2 / 7;
  }
`;

const Error = (props) => {
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
