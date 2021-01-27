import React from "react";
import {TableMain, 
  THead, 
  TBody,
  BodyFooterContent,}
  from "../assets/styled/content";

const UsersList = (props) => {
  return(
    <React.Fragment>
      <TableMain className="table">
          <THead>
            <tr>
              <th>Nombre</th>
              <th>Rut</th>
              <th>Rol</th>
              <th></th>
            </tr>
          </THead>
          <TBody>
            {
              props.data &&
              props.data.map((user) => {
                return(
                  <tr key={user.rut}>
                    <td><a href="/" title="AutentiaX">{user.name}</a></td>
                    <td>{user.rut}</td>
                    <td data-rol="role">
                      <span className="tag is-light">{user.role}</span>
                    </td>
                    <td>
                      <div className="buttons are-small">
                        <button className="button is-info is-inverted" data-role="modal">Asignar rol</button>
                        <button className="button is-danger is-inverted">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </TBody>
        </TableMain>
        <BodyFooterContent>
          <div className="body__footer">
            <div className="footer__results">
              <p>Mostrando</p>
              <div className="input-group">
                <div className="input-group-prepend"><i className="input-group-text fas fa-chevron-left"></i></div>
                <input className="input-group-number" />
                <div className="input-group-append"><i className="input-group-text fas fa-chevron-right"></i></div>
              </div>
            </div>
            <div className="footer__pagination"><a className="btn btn-white" href="/"><i className="fas fa-chevron-double-left"></i></a>
              <div className="input-group">
                <div className="input-group-prepend"><i className="input-group-text fas fa-chevron-left"></i></div>
                <p><span>1</span> de 25</p>
                <div className="input-group-append"><i className="input-group-text fas fa-chevron-right"></i></div>
              </div><a className="btn btn-white" href="/"><i className="fas fa-chevron-double-right"></i></a>
            </div>
            <div className="footer__total">
              <p>Mostrando 1 - 20 de 150 resultados</p>
            </div>
          </div>
        </BodyFooterContent>
    </React.Fragment>
  )
};



export default UsersList;