import React from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ModalContent = styled.div`
  animation: 0.5s ${fadeIn} ease-in-out;

  .modal-card-head {
    background-color: #fff;
    text-align: center;
    border-bottom: none;
  }

  .modal-card-foot {
    border-top: none;
  }
`;

const Modal = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalContent className="modal is-active">
      <div className="modal-background" onClick={props.onClose}></div>
      <div className="modal-card">
        {props.children}
      </div>
    </ModalContent>,
    document.getElementById("modal")
  );
};

export default Modal;
