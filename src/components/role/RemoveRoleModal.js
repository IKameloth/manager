import React from "react";
import Modal from "../app/common/Modal";
import styled from "styled-components";

const ModalCardFoot = styled.footer`
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const RemoveRoleModal = (props) => {
  if (props.dataModal) {
    return (
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <header className="modal-card-head">
          <p className="modal-card-title">¿Remover Rol?</p>
          <button onClick={props.onClose} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <div className="columns is-centered">
            <div className="column is-7-mobile is-offset-2-mobile is-7-tablet is-7-desktop is-7-fullhd">
              <div className="container">
                <div className="field has-text-centered">
                  <p className="is-size-3 is-capitalized has-text-weight-bold has-text-link">{props.dataModal.name}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ModalCardFoot className="modal-card-foot">
          <button onClick={props.removeRole} className="button is-danger">Remover</button>
          <button onClick={props.onClose} className="button">Cancelar</button>
        </ModalCardFoot>
      </Modal>
    );
  } else {
    return null;
  };
};

export default RemoveRoleModal;