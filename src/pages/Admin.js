import React from "react";
import { 
  Main,
  MainHeader,
  TableMain, THead, TBody,
  BodyFooter,
  FooterResults,
  FooterPagination,
  FooterTotal,
  InputGroup,
  InputPrepend,
  InputAppend
} from "../assets/styled/content";

const randomSelect = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}
const Content = () => {
  const roles = ["Admin", "Sys", "JP", "User"];
  const inst = ["@AUTENTIAX", "BONO_ECUADOR", "BONO", "ACEPTA"]

  return (
    <React.Fragment>
      <Main>

        <MainHeader>
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <h3 className="title">Admin Roles</h3>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Buscar por RUT o nombre" />
                    <span className="icon is-small is-left">
                      <i className="fal fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>
              <div className="column is-2-fullhd">
                <button className="button is-primary" id="modal2" style={{marginLeft: "16px"}}>Crear Rol</button>
              </div>
            </div>
          </div>
        </MainHeader>
        
        <TableMain className="table">
          <THead>
            <tr>
              <th>Nombre</th>
              <th>Rut</th>
              <th>Autentia Rol</th>
              <th>Institution</th>
              <th></th>
            </tr>
          </THead>
          <TBody>
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

        <BodyFooter>
          <FooterResults>
            <p>Mostrando</p>
            <InputGroup>
              <InputPrepend>
                <i className="input-group-text fas fa-chevron-left"></i>
              </InputPrepend>
              <input className="input-group-number" defaultValue="20" />
              <InputAppend>
                <i className="input-group-text fas fa-chevron-right"></i>
              </InputAppend>
            </InputGroup>
          </FooterResults>
          <FooterPagination>
            <a className="btn btn-white" href="/">
              <i className="fas fa-chevron-double-left"></i>
            </a>
            <InputGroup>
              <InputPrepend>
                <i className="input-group-text fas fa-chevron-left"></i>
              </InputPrepend>
              <p><span>1</span> de 25</p>
              <InputAppend>
                <i className="input-group-text fas fa-chevron-right"></i>
              </InputAppend>
            </InputGroup>
            <a className="btn btn-white" href="/">
              <i className="fas fa-chevron-double-right"></i>
            </a>
          </FooterPagination>
          <FooterTotal>
            <p>Mostrando 1 - 20 de 150 resultados</p>
          </FooterTotal>
        </BodyFooter>
      
      </Main>
    </React.Fragment>
  )
};

export default Content;