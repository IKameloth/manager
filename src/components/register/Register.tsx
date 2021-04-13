import React, { useState, useRef } from "react";
import { Main, MainHeader } from "../../assets/styled/content";
import { useDispatch } from "react-redux";

import { register } from "../../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef(null);
  const checkBtn = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  // const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <Main>
      <MainHeader>
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="field">
                <h3 className="title">Registrar Usuario</h3>
              </div>
            </div>
          </div>
        </div>
      </MainHeader>
      <div className="columns is-centered" style={{width: "100%"}}>
        <div className="column is-7-desktop is-10-mobile is-offset-1-mobile is-10-tablet is-5-fullhd">
          <div className="container">
            <div className="field">
              <form onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        // validations={[required, vusername]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        // validations={[required, validEmail]}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        // validations={[required, vpassword]}
                      />
                    </div>

                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                  </div>
                )}

                {/* {message && (
                  <div className="form-group">
                    <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                      {message}
                    </div>
                  </div>
                )} */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Register;