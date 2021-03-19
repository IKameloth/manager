import React from "react";
import Modal from "../app/common/Modal";
import { ModalCardFoot } from "../../assets/styled/modal";

const RegisterSensorModal = (props) => {
  return (
    <Modal isOpen={props.modalIsOpen} onClose={props.onClose}>
      <header className="modal-card-head">
        <p className="modal-card-title">Registrar Sensor</p>
        <button onClick={props.onClose} className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        <div className="columns is-centered">
          <div className="column is-7-mobile is-offset-2-mobile is-7-tablet is-7-desktop is-7-fullhd">
            <div className="container">

              <div className="field">
                <label className="label">Código Interno</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-danger" type="text" placeholder="Ingresar código interno" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-microchip"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p className="help is-danger">Código Interno no válido</p>
              </div>

              <div className="field">
                <label className="label">Ubicación</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-danger" type="text" placeholder="Ingresar ubicación" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-marked-alt"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p className="help is-danger">Ubicación no válida</p>
              </div>

              <div className="field">
                <label className="label">Tipo Logon</label>
                <div className="control has-icons-left has-icons-right">
                  <input className="input is-danger" type="text" placeholder="Ingresar tipo logon" />
                  <span className="icon is-small is-left">
                    <i className="fas fa-cogs"></i>
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p className="help is-danger">Tipo logon no válido</p>
              </div>
  
              <div className="field">
                <label className="label">Tecnología</label>
                <div className="columns">
                  <div className="column is-6">
                    <div className="field">
                      <label className="checkbox">
                      <input type="checkbox" defaultChecked />
                      UareU
                    </label>
                    </div>
                  </div>
                  <div className="column is-6">
                    <label className="checkbox">
                      <input type="checkbox" defaultChecked />
                      UareU-gold
                    </label>
                  </div>
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

export default RegisterSensorModal;