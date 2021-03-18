import React from "react";

const RoleList = (props) => {
  const { roles, onSubmit } = props;

  return(
    <>
      <div className="card">
          <div className="card-content">
            <div className="content">
              <table className="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Rol</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    roles && roles.length > 0
                      ? roles.map( (role) => (
                        <tr key={role._id}>
                          <td>{role.name}</td>
                          <td className="level-right">
                            <button  
                              onClick={() => onSubmit(role)}
                              className="delete has-background-danger is-medium">
                            </button>
                          </td>
                        </tr>
                      ))
                      : <tr className="is-centered">
                        <td>Sin roles</td>
                      </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div><br></br>
      </>
  );
};

export default RoleList;