import React, { Component } from "react";

class UserForm extends Component {
  render() {
    return(
      <form onSubmit={this.props.onSubmit}>
        <div className="field">
          <label className="label">Nombre</label>
          <div className="control has-icons-left has-icons-right">
            <input 
              autoComplete="off"
              onChange={this.props.onChange}
              className="input"
              type="text"
              name="name"
              placeholder="Ingresar Nombre"
              value={this.props.formValues.name}
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
              onChange={this.props.onChange}
              className="input"
              type="text"
              name="rut"
              placeholder="Ingresar Rut"
              value={this.props.formValues.rut}
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
              onChange={this.props.onChange}
              className="input"
              type="text"
              name="email"
              placeholder="Ingresar Email"
              value={this.props.formValues.email}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <div className={`field ${this.props.isEdit && "is-hidden"}`}>
          <label className="label">Rol</label>
          <div className="control has-icons-left has-icons-right">
            <input 
              autoComplete="off"
              onChange={this.props.onChange}
              className="input"
              type="text"
              name="role"
              placeholder="Ingresar Rol"
              value={this.props.formValues.role}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user-tag"></i>
            </span>
          </div>
        </div>

        <div className={`field ${this.props.isEdit && "is-hidden"}`}>
          <label className="label">Institución</label>
          <div className="control has-icons-left has-icons-right">
            <div className="select is-primary is-fullwidth">
              <select name="institution" onChange={this.props.onChange} value={this.props.formValues.institution}>
                <option>Seleccionar</option>
                {this.props.institutionList.length > 0 && this.props.institutionList.map((name) => (
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
                this.props.isEdit
                  ? <button className="button is-primary" type="submit">Modificar</button>
                  : <button className="button is-primary" type="submit">Registrar</button>
              }
            </div>
          </div>
        </div>
      </form>
    );
  };
};

export default UserForm;