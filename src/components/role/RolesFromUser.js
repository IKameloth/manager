import React, {useState} from "react";
import styled from "styled-components";
import RoleRemoveModal from "./RemoveRoleModal";

const Avatar = styled.span`
  height: 64px;
  width: 64px;
  background-color: #c3d3ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5em;
  animation: fadeIn ease 5s;

  @keyframes fadeIn{
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
}
`;

const ProfileName = (name = 'name default') => {
  let nameSplited = name.split(" ");
  if (nameSplited.length > 1) {
    const result = nameSplited.map((name) => name.trim().charAt(0).toUpperCase());
    return result.reduce((letter, index) => letter.concat(index));
  } else {
    return name.charAt(0).toUpperCase();
  };
};

const RolesFromUser = (props) => {
  const [roleData, setRoleData] = useState([]);
  const { name, email, rut, roles} = props.userData;

  let profName = ProfileName(name);

  const handleModal = (role) => {
    if (role.name) {
      setRoleData(role);
      props.handleRemoveModal();
    };
  };
  
  return(
    <React.Fragment>
      <div className="box">
        <article className="media">
          <div className="media-left">
            <Avatar>{profName}</Avatar>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong className="has-text-link">{name}</strong><br></br>
                <strong>{rut}</strong><br></br>
                <small>{email}</small>
              </p>
            </div>
          </div>
        </article>
      </div>

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
                          <button onClick={() => handleModal(role)} className="delete has-background-danger is-medium"></button>
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
      </div>
      <br></br>
      <RoleRemoveModal isOpen={props.isOpen} onClose={() => props.handleRemoveModal()} dataModal={roleData} removeRole={() => props.handleRemoveRole(roleData) } />
    </React.Fragment>
  );
};

export default RolesFromUser;