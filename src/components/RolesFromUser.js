import React, {useState} from "react";
import styled from "styled-components";
import RoleRemoveModal from "../components/modals/RemoveRoleModal";

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
  const [open, setOpen] = useState(false);
  const [roleName, setRoleName] = useState("");

  const { name, email, rut, roles} = props.userData;

  let profName = ProfileName(name);

  const toggleModal = () => {
    !open ? setOpen(true) : setOpen(false);
  };

  const handleModal = (name) => {
    if (name) {
      setRoleName(name);
      toggleModal();
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
            <table>
              <thead>
                <tr>
                  <th>Rol</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { 
                  roles && roles.length > 0 && roles.map((role) => (
                    <tr key={role._id}>
                      <td>{role.name}</td>
                      <td className="level-right">
                        <button onClick={() => handleModal(role.name)} className="delete has-background-danger is-medium"></button>
                      </td>
                    </tr>
                  )) 
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br></br>
      <div className="level is-centered">
        <div className="level-item">
          <button className="button is-info is-outlined is-small">Asignar Rol</button>
        </div>
      </div>
      <RoleRemoveModal isOpen={open} onClose={() => toggleModal()} dataModal={roleName} />
    </React.Fragment>
  );
};

export default RolesFromUser;