import React from 'react';
import ReactDOM from "react-dom";
// @ts-ignore
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { ModalContent } from "../../../assets/styled/modal";
 
const ModalOPE = (props: any) => {
  const modalElement = document.getElementById("modal");
  if(!modalElement)
    return null
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
    modalElement
  );
};

export default ModalOPE;