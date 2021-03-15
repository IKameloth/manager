import React, {useEffect, useState} from "react";
import Modal from "../app/common/Modal";
import { ModalCardFoot } from "../../assets/styled/modal";

export default function UserModal({ openModal, onSubmit, onClose }){
  const [rut, setRut] = useState("");
  const [role, setRole] = useState("");
  const [cleanRut, setCleanRut] = useState(false);
  const [cleanRole, setCleanRole] = useState(false);

  useEffect(() => {
    rut?.length > 0 ? setCleanRut(true) : setCleanRut(false);
    role?.length > 0 ? setCleanRole(true) : setCleanRole(false);
  },[rut, role]);

  const CleanerButton = (target) => {
    return (
      <span className="icon is-small is-rigth">
        <button onClick={() => cleanInput(target.target)} className="delete"><i className="fas fa-times"></i></button>
      </span>
    );
  };

  const cleanInput = (target) => {
    target === "inputRut" && setRut("");
    target === "inputRole" && setRole("");
  };

  return (
    <Modal isOpen={openModal} onClose={onClose}>
      <header className="modal-card-head">
        <p className="modal-card-title">Registrar nuevo rol</p>
        <button onClick={onClose} className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        <div className="columns is-centered">
          <div className="column is-7-mobile is-offset-2-mobile is-7-tablet is-7-desktop is-7-fullhd">
            <div className="container">
              <div className="field">
                <label className="label">Ingresar Rut</label>
                <div className="control has-icons-left has-icons-right">
                  <input 
                    value={rut}
                    onChange={({target: {value}}) => setRut(value)}
                    autoComplete="off"
                    className="input" 
                    type="text" 
                    placeholder="Ingresar Rut" 
                    name="rut"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-fingerprint"></i>
                  </span>
                  {
                    cleanRut && <CleanerButton target={"inputRut"} />
                  }
                </div>
              </div>

              <div className="field">
                <label className="label">Ingresar rol</label>
                <div className="control has-icons-left has-icons-right">
                  <input 
                    value={role}
                    onChange={({target: {value}}) => setRole(value)}
                    autoComplete="off"
                    className="input" 
                    type="text" 
                    placeholder="Ingresar rol" 
                    name="role"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user-tag"></i>
                  </span>
                  {
                    cleanRole && <CleanerButton target={"inputRole"} />
                  }
                </div>
              </div>

              <ModalCardFoot className="modal-card-foot">
                <button type="button" onClick={() => onSubmit(rut, role)} className="button is-primary">Registrar</button>
              </ModalCardFoot>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
};
