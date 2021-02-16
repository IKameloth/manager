import React from "react";
import Modal from "../Modal";

const RegisterAdminRolesModal = (props) => {

  const institutions = ["@AUTENTIAX", "BONO_ECUADOR", "BONO", "ACEPTA"]
  const roles = ["admin", "sys", "jp", "user"];

  
  props.isEdit && !institutions.includes(props.formValues.institution) && institutions.push(props.formValues.institution);
  props.isEdit && !roles.includes(props.formValues.role) && roles.push(props.formValues.role);

  return(
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <header className="modal-card-head">
        <p className="modal-card-title">Asignar Autentia-Admin rol</p>
        <button onClick={props.onClose} className="delete" aria-label="close"></button>
      </header>
      <section className="modal-card-body">
        <div className="columns is-centered">
          <div className="column is-7-mobile is-offset-2-mobile is-7-tablet is-7-desktop is-7-fullhd">
            <div className="container">
              <form onSubmit={props.onSubmit}>
                <div className="field">
                  <label className="label">Rut</label>
                  <div className="control has-icons-left has-icons-right">
                    <input 
                      name="rut"
                      autoComplete="off"
                      onChange={props.onChange}
                      className="input" 
                      type="text" 
                      placeholder="Ingresar Rut" 
                      value={props.formValues.rut}
                      disabled={props.isEdit}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-fingerprint"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Institución</label>
                  <div className="control has-icons-left has-icons-right">
                    <div className="select is-primary is-fullwidth">
                      <select name="institution" onChange={props.onChange} value={props.formValues.institution}>
                        {
                          institutions.map((inst) => {
                            return <option value={inst} key={inst} disabled={props.isEdit}>{inst}</option>
                          })
                        }
                      </select>
                    </div>
                    <span className="icon is-small is-left">
                      <i className="far fa-building"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Seleccionar rol</label>
                  <div className="control has-icons-left has-icons-right">
                    <div className="select is-primary is-fullwidth">
                      <select name="role" onChange={props.onChange} value={props.formValues.role}>
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
                  </div>
                </div>
                <hr></hr>
                <div className="field">
                  <div className="level is-centered">
                    <div className="level-item">
                      {
                        props.isEdit
                          ? <button className="button is-primary" type="submit">Modificar</button> 
                          : <button className="button is-primary" type="submit">Registrar</button>
                      }
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </Modal>
  );
};

export default RegisterAdminRolesModal;