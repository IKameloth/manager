import React from 'react';
import {useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce} from "react-table";
import {TableMain, THead, TBody, ContainerElement} from "../../assets/styled/content";
import {Link} from "react-router-dom";
import { SpanRoles } from "../../assets/styled/user";

const GlobalFilter = ({globalFilter, setGlobalFilter}) => {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200);

  return (
    <div className="column is-6">
      <p className="control has-icons-left has-icons-right">
        <input className="input" type="text" placeholder="Buscar por RUT o nombre" value={value || ""} onChange={
          e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }
        } />
        <span className="icon is-small is-left">
          <i className="fal fa-search"></i>
        </span>
      </p>
    </div>
  )
};

const Table = ({columns, data}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  return (
    <React.Fragment>
      {/* FILTER */}
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {/* TABLE */}
      <div className="table-container" style={{marginBottom: "0"}}>
        <TableMain className="table is-hoverable is-mobile" {...getTableProps()}>
          <THead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  // SORTBY
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* SORT DIRECTION */}
                    <span>
                      {
                        column.isSorted
                          ? column.isSortedDesc
                            ? <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
                            : <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
                          : ''
                      }
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </THead>
          <TBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </TBody>
        </TableMain>
      </div>
 
      <div className="level has-background-light">
        <div className="level-item has-text-centered">
          <div className="select is-rounded">
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value))}}>
              {[10, 20, 30, 40].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <button className="button is-white" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {<i className="fas fa-chevron-double-left"></i>}
          </button>
          <button className="button is-white" onClick={() => previousPage()} disabled={!canPreviousPage}>
            {<i className="input-group-text fas fa-chevron-left"></i>}
          </button>
          <p><span>{pageSize >= rows.length ? rows.length : pageSize}</span> de {rows.length}</p>
          <button className="button is-white" onClick={() => nextPage()} disabled={!canNextPage}>
            {<i className="input-group-text fas fa-chevron-right"></i>}
          </button>
          <button className="button is-white" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {<i className="fas fa-chevron-double-right"></i>}
          </button>
        </div>
        <div className="level-item has-text-centered ">
          <p className="">Mostrando {pageIndex + 1} de {pageOptions.length} páginas</p>
        </div>        
      </div>

    </React.Fragment>
  );
};

const UsersTable = (props) => {
  if (props.data && props.data.length > 0) {
    return (
      <Table
        columns={[
          {
            Header: 'Nombre',
            accessor: 'name',
            id: 'name',
          },
          {
            Header: 'Rut',
            accessor: 'rut',
            id: 'rut',
          },
          {
            Header: 'Email',
            accessor: 'email',
            id: 'email'
          },
          {
            Header: "Rol",
            accessor: "roles",
            id: 'roles',
            Cell: ({ cell }) => (
              cell.row.values.roles.length > 0 ? 
                <div>                
                  {
                    cell.row.values.roles.slice(0,3).map((role) => {
                      return (
                        <span className="tag is-light" key={role.name}>{role.name}</span>
                      )
                    })
                  }
  
                  {
                    cell.row.values.roles.length > 3 && 
                      <SpanRoles>
                        <div className="tooltip" data-direction="left">
                          <div className="tooltip__initiator">
                            <span className="tag is-primary">
                              + {cell.row.values.roles.length - 3}
                            </span>
                          </div>
                          <div className="tooltip__item">
                            {cell.row.values.roles.slice(3, cell.row.values.roles.length).map((role => <p key={role.name}>{role.name}</p>))}
                          </div>
                        </div>
                      </SpanRoles>
                  }
                  
                </div>
              : <span className="tag is-warning">No asignado</span>
            ),
          },
          {
            Header: "Institución",
            accessor: "institution",
            id: 'institution',
            Cell: ({cell}) => (
              cell.row.values.institution.name.length > 0
                ? <label>{cell.row.values.institution.name}</label>
                : <span className="tag is-warning">No asignado</span>
            )
          },
          {
            Header: "",
            id: "action",
            Cell: ({ cell }) => (
              <div className="field is-grouped">
                <p className="control">
                  <Link to={`/users/${cell.row.values.rut}/roles`} className="button is-info is-outlined is-small">
                    Gestionar Roles
                  </Link>
                </p>
              </div>
            ),
          }
        ]}
        data={props.data}
      />
    );
  } else {
    return(
      <ContainerElement>
        <div className="level has-baclground-light">
          <div className="level-item has-text-centered">
            <div className="control">
              <i className="far fa-surprise"></i>
              <h3 className="title">No se encuentran registros.</h3>
            </div>
          </div>
        </div>
      </ContainerElement>
    )
  }
};

export default UsersTable;