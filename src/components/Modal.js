import React from 'react';
import ReactDOM from "react-dom";
import Rodal from 'rodal';
// include styles
import 'rodal/lib/rodal.css';
import styled from "styled-components";

const ModalContent = styled.div`
  .modal-card-head {
    background-color: #fff;
    text-align: center;
    border-bottom: none;
  }

  .modal-card-foot {
    border-top: none;
  }
`;
 
const ModalOPE = (props) => {
  return ReactDOM.createPortal(
    <div>
      <Rodal 
        visible={props.isOpen} 
        onClose={props.onClose}
        closeOnEsc={true}
        animation={"fade"}
        duration={350}
        width={0}
        height={0}
      > 
        <ModalContent className="modal is-active">
          <div className="modal-background" onClick={props.onClose}></div>
          <div className="modal-card">
            {props.children}
          </div>
        </ModalContent>
      </Rodal>
    </div>,
    document.getElementById("modal")
  );
};

export default ModalOPE;