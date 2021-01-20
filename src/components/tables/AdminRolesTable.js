import React from 'react';
import DataTable from "react-data-table-component";

const customStyles = {
  rows: {
    style: {
      verticalAlign: "middle",
      minHeight: '72px', // override the row height
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
}

const columns = [
  {
    name: 'Nombre',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Rut',
    selector: 'rut',
    sortable: true,
  },
  {
    name: "Rol",
    selector: "role",
    sortable: "true",
  },
  {
    name: "Institución",
    selector: "institution",
    sortable: "true",
  },
  {
    name: "",
    sortable: "false",
    right: true,
    cell: row => <div className="buttons are-small">
                    <button className="button is-info is-inverted" data-role="modal">Asignar rol</button>
                    <button className="button is-danger is-inverted">Eliminar</button>
                  </div>,
  }
];

const AdminRolesTable = (props) => {
  return (
    <React.Fragment>
      <DataTable
        columns={columns}
        customStyles={customStyles}
        data={props.data}
        pagination
        fixedHeader
      />
    </React.Fragment>
  );
};

export default AdminRolesTable;