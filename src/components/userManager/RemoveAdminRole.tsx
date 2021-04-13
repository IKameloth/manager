import React from "react";
import Modal from "../app/common/Modal";
import { ModalCardFoot } from "../../assets/styled/modal";

const RemoveAdminRole = (props) => {
  if (props.dataModal) {
    return (
      <Modal isOpen={props.modalIsOpen} onClose={props.onClose}>
        <header className="modal-card-head">
          <p className="modal-card-title">¿Desactivar Rol?</p>
          <button onClick={props.onClose} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="columns is-centered">
            <div className="column is-7-mobile is-offset-2-mobile is-7-tablet is-7-desktop is-7-fullhd">
              <div className="container">
                <div className="field has-text-centered">
                  <p className="is-size-3 is-capitalized has-text-weight-bold has-text-link">{props.dataModal.name}</p>
                  <p className="is-size-4 is-capitalized has-text-link">{props.dataModal.role}</p>
                  <p className="is-size-4">{props.dataModal.rut}</p>
                </div>
                <div className="field">
                  <p className="is-size-5">Se le asignará automaticamente el rol "USER" al desactivar.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ModalCardFoot className="modal-card-foot">
          <button onClick={() => alert("Pronto")} className="button is-danger">Desactivar</button>
          <button onClick={props.onClose} className="button">Cancelar</button>
        </ModalCardFoot>
      </Modal>
    )
  } else {
    return null;
  }
};

export default RemoveAdminRole;