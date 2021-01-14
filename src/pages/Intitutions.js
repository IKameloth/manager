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

const Institutions = () => {
  return (
    <React.Fragment>
      <Main>
        <MainHeader>
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <h3 className="title is-3">Instituciones</h3>
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
                <button className="button is-primary" id="modal2">Crear institutición</button>
              </div>
            </div>
          </div>
        </MainHeader>
        
        <TableMain className="table">
          <THead>
            <tr>
              <th>Nombre</th>
              <th>Rut</th>
              <th>País</th>
              <th>Detalles</th>
              <th>Modificar</th>
            </tr>
          </THead>
          <TBody>
            <tr>
              <td><a href="/">Autentia</a></td>
              <td>12.234.456-1</td>
              <td>Chile</td>
              <td>
                  <button className="button is-primary is-inverted" data-role="modal">Ver</button>
              </td>
              <td>
                <button className="button is-primary is-inverted">Editar</button>
              </td>
            </tr>

            <tr>
              <td><a href="/">I-med</a></td>
              <td><span>76.957.430-1</span></td>
              <td>Chile</td>
              <td>
                  <button className="button is-primary is-inverted" data-role="modal">Ver</button>
              </td>
              <td>
                <button className="button is-primary is-inverted">Editar</button>
              </td>
            </tr>

            <tr>
              <td><a href="/">Bono</a></td>
              <td><span>90.749.000-9</span></td>
              <td>Chile</td>
              <td>
                  <button className="button is-primary is-inverted" data-role="modal">Ver</button>
              </td>
              <td>
                <button className="button is-primary is-inverted">Editar</button>
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

export default Institutions;