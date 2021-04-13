import React, {Component} from "react";
import { RadioButtons } from "../../assets/styled/institution";

class InstitutionForm extends Component {
  render() {
    const flagChecked =  this.props.formValues.flag;
    const statusChecked =  this.props.formValues.status;

    return(
      <React.Fragment>
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
              <span className="icon is-small is-right is-hidden">
                <i className="fas fa-exclamation-triangle"></i>
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
              <span className="icon is-small is-right is-hidden">
                <i className="fas fa-exclamation-triangle"></i>
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
                type="email" 
                name="email"
                placeholder="Ingresar Email" 
                value={this.props.formValues.email}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right is-hidden">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Descripción</label>
            <div className="control has-icons-left has-icons-right">
              <textarea
                autoComplete="off"
                onChange={this.props.onChange}
                className="textarea" 
                placeholder="Ingresar Descripción" 
                name="description"
                value={this.props.formValues.description}
              />
            </div>
            <p className="help is-danger is-hidden">Descripción no válido</p>
          </div>

          <div className="field"> 
            <label className="label">NEMO</label>
            <div className="control has-icons-left has-icons-right">
              <input
                autoComplete="off"
                onChange={this.props.onChange}
                className="input" 
                type="text" 
                name="nemo"
                placeholder="Ingresar 4 Carácteres"
                value={this.props.formValues.nemo} 
              />
              <span className="icon is-small is-left">
                <i className="fas fa-key"></i>
              </span>
              <span className="icon is-small is-right is-hidden">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div> 
          </div>

          <div className="field">
            <label className="label">País</label>
            <div className="control has-icons-left has-icons-right">
              <div className="select is-primary is-fullwidth">
                <select name="country" onChange={this.props.onChange} value={this.props.formValues.country}>
                  <option>Seleccionar</option>
                  <option value="CHILE">CHILE</option>
                  <option value="RDOMINICANA">R DOMINICANA</option>
                  <option value="ECUADOR">ECUADOR</option>
                  <option value="PERU">PERU</option>
                </select>
              </div>
              <span className="icon is-small is-left">
                <i className="fas fa-flag"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <div className="level is-mobile">
              <div className="container">
                <div className="level-item">
                  <label className="label">Estado</label>
                </div>
                <RadioButtons className="level-item">
                  <label className="radio radio-before">
                    <span className="radio__input">
                    <input value="0" type="radio" name="status" onChange={this.props.onChange} checked={statusChecked === "0"}/>
                      <span className="radio__control"></span>
                    </span>
                    <span className="radio__label">0</span>
                  </label>

                  <label className="radio radio-before">
                    <span className="radio__input">
                    <input value="1" type="radio" name="status" onChange={this.props.onChange} checked={statusChecked === "1"}/>
                      <span className="radio__control"></span>
                    </span>
                    <span className="radio__label">1</span>
                  </label>
                </RadioButtons>
              </div>
              <div className="container">
                <div className="level-item">
                  <label className="label">Flag</label>
                </div>
                <RadioButtons className="level-item">
                  <label className="radio radio-before">
                    <span className="radio__input">
                    <input value="0" type="radio" name="flag" onChange={this.props.onChange} checked={flagChecked === "0"}/>
                      <span className="radio__control"></span>
                    </span>
                    <span className="radio__label">0</span>
                  </label>

                  <label className="radio radio-before">
                    <span className="radio__input">
                    <input value="1" type="radio" name="flag" onChange={this.props.onChange} checked={flagChecked === "1"}/>
                      <span className="radio__control"></span>
                    </span>
                    <span className="radio__label">1</span>
                  </label>
                </RadioButtons>
              </div>
            </div>
          </div>

          <hr></hr>
          <div className="field">
            <div className="level is-centered">
              <div className="level-item">
                {
                  this.props.isEditing
                    ? <button className="button is-primary" type="submit">Modificar</button> 
                    : <button className="button is-primary" type="submit">Registrar</button>
                }
              </div>
            </div>
          </div>

          {this.props.error && (
            <h3>{this.props.error.message}</h3>
          )}
        </form>
      </React.Fragment>
    );
  };
};

export default InstitutionForm;