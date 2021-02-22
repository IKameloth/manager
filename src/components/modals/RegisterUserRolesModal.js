import React from "react";
import Modal from "../Modal";
import styled from "styled-components";


const ModalCardFoot = styled.footer`
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const RegisterUserRolesModal = (props) => {
  return (
    <Modal isOpen={props.modalIsOpen} onClose={props.onClose}>
      <header className="modal-card-head">
        <p className="modal-card-title">Registrar nuevo rol</p>
        <button onClick={props.onClose} className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        <div className="columns is-centered">
          <div className="column is-7-mobile is-offset-2-mobile is-7-tablet is-7-desktop is-7-fullhd">
            <div className="container">
              <form onSubmit={props.onSubmit}>
                <div className="field">
                  <label className="label">Ingresar Rut</label>
                  <div className="control has-icons-left has-icons-right">
                    <input 
                      onChange={props.onChange}
                      autoComplete="off"
                      className="input" 
                      type="text" 
                      placeholder="Ingresar Rut" 
                      value={props.formValues.rut}
                      name="rut"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-fingerprint"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Ingresar rol</label>
                  <div className="control has-icons-left has-icons-right">
                    <input 
                      onChange={props.onChange}
                      autoComplete="off"
                      className="input" 
                      type="text" 
                      placeholder="Ingresar rol" 
                      value={props.formValues.role}
                      name="role"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user-tag"></i>
                    </span>
                  </div>
                </div>

                <ModalCardFoot className="modal-card-foot">
                  <button type="submit" className="button is-primary">Registrar</button>
                </ModalCardFoot>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </Modal>
  )
};

export default RegisterUserRolesModal;