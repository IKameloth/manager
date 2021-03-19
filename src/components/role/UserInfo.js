import React from "react";
import { Avatar } from "../../assets/styled/role";
import Loading from "../app/common/Loading";

const ProfileName = (name = 'unknow') => {
  let nameSplited = name.split(" ");
  if (nameSplited.length > 1) {
    const result = nameSplited.map((name) => name.trim().charAt(0).toUpperCase());
    return result.reduce((letter, index) => letter.concat(index));
  } else {
    return name.charAt(0).toUpperCase();
  };
};

const UserInfo = (props) => {
  const { name, email, rut } = props;
  let profName = ProfileName(name);

  if (!name?.length) {
    return (
      <>
        <Loading />
        <br></br>
        <br></br>
      </>
    );
  };

  return(
    <div className="box">
      <article className="media">
        <div className="media-left">
          <Avatar>{profName}</Avatar>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong className="has-text-link">{name.toUpperCase()}</strong><br></br>
              <strong>{rut}</strong><br></br>
              <small>{email}</small>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default UserInfo;