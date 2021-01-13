import React from "react";
import Modal from "../Modal";
import styled from "styled-components";

const ModalCardFoot = styled.footer`
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const RegisterAdminRolesModal = (props) => {
  const institutions = ["@AUTENTIAX", "BONO_ECUADOR", "BONO", "ACEPTA"]
  const roles = ["admin", "sys", "jp", "user"];

  return(
    <Modal isOpen={props.modalIsOpen} onClose={props.onClose}>
      <header className="modal-card-head">
        <p className="modal-card-title">Asignar Autentia-Admin rol</p>
        <button onClick={props.onClose} className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        <div className="columns is-centered">
          <div className="column is-7-mobile is-offset-2-mobile is-7-tablet is-7-desktop is-7-fullhd">
            <div className="container">

              <div className="field">
                <label className="label">Ingresar Rut</label>
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
                <label className="label">Seleccionar institución</label>
                <div className="control has-icons-left has-icons-right">
                  <div className="select is-primary">
                    <select>
                      {
                        institutions.map((inst) => {
                          return <option value={inst} key={inst}>{inst}</option>
                        })
                      }
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="far fa-building"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label className="label">Seleccionar rol</label>
                <div className="control has-icons-left has-icons-right">
                  <div className="select is-primary">
                    <select>
                      {
                        roles.map((role) => {
                          return <option value={role} key={role}>{role}</option>
                        })
                      }
                    </select>
                  </div>
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-tag"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
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

export default RegisterAdminRolesModal;