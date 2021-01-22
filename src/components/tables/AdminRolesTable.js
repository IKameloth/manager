import React from 'react';
import styled from "styled-components";
import {useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce} from "react-table";

const TableStyle = styled.div`
  table {
    width: 100%;
  }

  table > thead {
    position: sticky;
  top: 0;
  z-index: 1;
  }
`;

const GlobalFilter = ({preGlobalFilteredRows, globalFilter, setGlobalFilter}) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
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
      <table {...getTableProps()}>
        <thead>
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
                          ? ' FAR'
                          : ' FAB'
                        : ''
                    }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
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
        </tbody>
      </table>
      <br />
      
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div>Showing the first {pageSize} results of {rows.length} rows</div>
      </div>
    </React.Fragment>
  );
};

const columns = [
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
    Header: "Rol",
    accessor: "role",
    id: 'role',
  },
  {
    Header: "Institución",
    accessor: "institution",
    id: 'institution',
  },
  {
    Header: "",
    id: "action",
  }
  
];

const AdminRolesTable = (props) => {
  if (props.data) {
    return (
        <TableStyle>
          <Table
          columns={columns}
          data={props.data}
        />
        </TableStyle>
    );
  } else {
    return(
      <h2>Nada para mostrar!</h2>
    )
  }
};

export default AdminRolesTable;