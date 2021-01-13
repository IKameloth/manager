import React from "react";
import Modal from "../Modal";
import styled from "styled-components";

const ModalCardHead = styled.header`
  background-color: #fff;
`;

const ModalCardFoot = styled.footer`
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const RegisterUserModal = (props) => {
  return(
    <Modal isOpen={props.modalIsOpen} onClose={props.onClose}>
      <ModalCardHead className="modal-card-head">
        <p className="modal-card-title">Registrar Usuario</p>
        <button onClick={props.onClose} className="delete" aria-label="close"></button>
      </ModalCardHead>
      <section className="modal-card-body">
        <div className="columns is-centered">
          <div className="column is-7-mobile is-offset-2-mobile is-7-tablet is-7-desktop is-7-fullhd">
            <div className="container">
              <div className="field">
                <label className="label">Rut</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-danger" type="text" placeholder="Ingresar Rut" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-fingerprint"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p className="help is-danger">Rut no válido</p>
              </div>

              <div className="field">
                <label className="label">Nombre</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-danger" type="text" placeholder="Ingresar Nombre" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p className="help is-danger">Nombre no válido</p>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-danger" type="email" placeholder="Email input" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p className="help is-danger">Email no válido</p>
              </div>

            </div>
          </div>  
        </div>
      </section>
      <ModalCardFoot className="modal-card-foot">
        <button className="button is-primary">Registrar</button>
        <button onClick={props.onClose} className="button">Cancel</button>
      </ModalCardFoot>
    </Modal>
  );
};

export default RegisterUserModal;
