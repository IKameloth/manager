import React from "react";
import Modal from "../Modal";
import styled from "styled-components";


const ModalCardFoot = styled.footer`
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const InstitutionModal = (props) => {
  return (
    <Modal isOpen={props.modalIsOpen} onClose={props.onClose}>
      <header className="modal-card-head">
        <p className="modal-card-title">Editar Institución</p>
        <button onClick={props.onClose} className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        <div className="columns is-centered">
          <div className="column is-7-mobile is-offset-2-mobile is-7-tablet is-7-desktop is-7-fullhd">
            <div className="container">
              <div className="field">
                  {/* CONTENT */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalCardFoot className="modal-card-foot">
        <button className="button is-primary">BUTTON</button>
        <button onClick={props.onClose} className="button">Cancel</button>
      </ModalCardFoot>
    </Modal>
  )
};

export default InstitutionModal;