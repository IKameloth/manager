import React from "react";
import Modal from "../app/common/Modal";
import { ModalCardFoot } from "../../assets/styled/modal";

const InstitutionModal = (props) => {
  if (props.dataModal) {
    const {name, country, rut} = props.dataModal;
    return (
      <Modal isOpen={props.modalIsOpen} onClose={props.onClose}>
        <header className="modal-card-head">
          <p className="modal-card-title">¿Remover Institución?</p>
          <button onClick={props.onClose} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="columns is-centered">
            <div className="column is-7-mobile is-offset-2-mobile is-7-tablet is-7-desktop is-7-fullhd">
              <div className="container">
                <div className="field">
                  <p className="is-size-3 has-text-centered is-capitalized has-text-weight-bold has-text-link">{name}</p>
                  <p className="is-size-4 has-text-centered">{rut}</p>
                  <p className="is-size-4 has-text-centered">{country}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ModalCardFoot className="modal-card-foot">
          <button className="button is-danger" onClick={props.deleteInstitution}>Remover</button>
          <button onClick={props.onClose} className="button">Cancelar</button>
        </ModalCardFoot>
      </Modal>
    )
  } else {
    return null;
  }
};

export default InstitutionModal;