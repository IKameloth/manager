import React from "react";

function UserForm(props) {
  return(
    <form onSubmit={props.onSubmit}>
      <div className="field">
        <label className="label">Nombre</label>
        <div className="control has-icons-left has-icons-right">
          <input 
            autoComplete="off"
            onChange={props.onChange}
            className="input"
            type="text"
            name="name"
            placeholder="Ingresar Nombre"
            value={props.formValues.name}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Rut</label>
        <div className="control has-icons-left has-icons-right">
          <input 
            autoComplete="off"
            onChange={props.onChange}
            className="input"
            type="text"
            name="rut"
            placeholder="Ingresar Rut"
            value={props.formValues.rut}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-fingerprint"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control has-icons-left has-icons-right">
          <input 
            autoComplete="off"
            onChange={props.onChange}
            className="input"
            type="text"
            name="email"
            placeholder="Ingresar Email"
            value={props.formValues.email}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div className={`field ${props.isEdit && "is-hidden"}`}>
        <label className="label">Rol</label>
        <div className="control has-icons-left has-icons-right">
          <input 
            autoComplete="off"
            onChange={props.onChange}
            className="input"
            type="text"
            name="role"
            placeholder="Ingresar Rol"
            value={props.formValues.role}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user-tag"></i>
          </span>
        </div>
      </div>

      <div className={`field ${props.isEdit && "is-hidden"}`}>
        <label className="label">Institución</label>
        <div className="control has-icons-left has-icons-right">
          <div className="select is-primary is-fullwidth">
            <select name="institution" onChange={props.onChange} value={props.formValues.institution}>
              <option>Seleccionar</option>
              {props.institutionList.length > 0 && props.institutionList.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </div>
          <span className="icon is-small is-left">
            <i className="fas fa-building"></i>
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
  );
};

export default UserForm;