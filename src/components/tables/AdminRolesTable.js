import React from 'react';
import {
  TableMain, 
  THead,
  TBody
} from "../../assets/styled/content";

const AdminRolesTable = () => {
  // data example
  const randomSelect = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const roles = ["Admin", "Sys", "JP", "User"];
  const inst = ["@AUTENTIAX", "BONO_ECUADOR", "BONO", "ACEPTA"]

  return (
    <React.Fragment>
      <TableMain className="table">
        <THead className="sticky">
          <tr>
            <th>Nombre</th>
            <th>Rut</th>
            <th>Autentia Rol</th>
            <th>Institution</th>
            <th></th>
          </tr>
        </THead>

        <TBody className="content">
          <tr>
            <td><a href="/" title="AutentiaX">Aurelio</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Bjean</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Lolito</a></td>
            <td><span>15.789.988-6</span></td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Aurelio</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Bjean</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Lolito</a></td>
            <td><span>15.789.988-6</span></td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Aurelio</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Bjean</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Lolito</a></td>
            <td><span>15.789.988-6</span></td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Aurelio</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Bjean</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Lolito</a></td>
            <td><span>15.789.988-6</span></td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Aurelio</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Bjean</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Lolito</a></td>
            <td><span>15.789.988-6</span></td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Aurelio</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Bjean</a></td>
            <td>15.156.887-6</td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
          <tr>
            <td><a href="/" title="AutentiaX">Lolito</a></td>
            <td><span>15.789.988-6</span></td>
            <td data-rol="role">
              <span className="tag is-light">{randomSelect(roles)}</span>
            </td>
            <td>
              <label>{randomSelect(inst)}</label>
            </td>
            <td>
              <div className="buttons are-small">
                <button className="button is-info is-inverted" data-role="modal">Modificar rol</button>
                <button className="button is-danger is-inverted">Eliminar</button>
              </div>
            </td>
          </tr>
        </TBody>
        
      </TableMain>
    </React.Fragment>
  );
};

export default AdminRolesTable;