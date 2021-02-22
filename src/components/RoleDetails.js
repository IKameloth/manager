import React, {Component} from "react";
import Loading from "./Loading";
import Error from "./Error";
import {Main, MainHeader} from "../assets/styled/content";
import {Link} from "react-router-dom";
import RolesFromUser from "./RolesFromUser";
import RegisterUserRolesModal from "../components/modals/RegisterUserRolesModal";

class RoleDetails extends Component {
  state = {
    loading: false,
    error: undefined,
    modalRemoveOpen: false,
    modalAssignOpen: false,
    userData: {},
    formAsignRole: {
      rut: "",
      role: "",
    }
  };

  componentDidMount() {
    this.setState({loading: true});
    this.fetchGetUser();
  };

  componentWillUnmount() {
    this.setState({userData: {}, formAsignRole: {rut: "", role: ""}});
    console.log("EXIT ROLE COMPONENT");
  };

  fetchGetUser = async() =>{
    const url = `http://localhost:4000/users/${this.props.match.params.userID}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      const userDataJson = result.data.attributes;
      
      setTimeout(() => {
        this.setState({
          loading: false, 
          userData: userDataJson,
          formAsignRole: {rut: userDataJson.rut, role: ""}
        });
      },1000)
    } catch (err) {
      console.log(err);
      this.setState({loading: false, error: err.message});
    };
  };

  fetchRemoveRole = async(roleObj) => {
    const url = `http://localhost:4000/roles/${roleObj._id}`;
    const requestOptions = {
      method: "DELETE",
    };
  
    try {
      fetch(url, requestOptions).then(async response => {
        await response;
        setTimeout(() => {
          this.setState({modalIsOpen: false});
          this.componentDidMount();
        });
      });
    } catch (err) {
      console.log(err);
      this.setState({loading: false, error: err.message});
    };
  };

  fetchAsignRole = (data) => {
    const url = `http://localhost:4000/roles`;
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    };

    try {
      fetch(url, requestOptions)
        .then(async response => {
          const res = await response.json();

          if(res.errors) {
            const error = (res && res.errors) || response.detail;
            return Promise.reject(error);
          };

          setTimeout(() => {
            this.setState({loading: false, modalAssignOpen: false});
            this.componentDidMount();
          });
        })
        .catch (err => {
          console.log(err);
          this.setState({loading: false});
          alert(err[0].detail);
        });
    } catch (err) {
      console.log(err);
      this.setState({loading: false});
      alert("Error asign role fetch");
    };
  };

  toggleModalRemove = () => {
    this.setState({modalRemoveOpen: !this.state.modalRemoveOpen});
  }

  toggleModalAsign = () => {
    this.setState({modalAssignOpen: !this.state.modalAssignOpen});
  };

  handleRemoveRole = (roleObj) => {
    this.fetchRemoveRole(roleObj);
    this.toggleModalRemove();
    this.componentDidMount();
  };

  handleAsignRole = (e) => {
    e.preventDefault();
    const reData = {
      user: this.state.formAsignRole.rut,
      name: this.state.formAsignRole.role
    };
    
    this.fetchAsignRole(reData);
  };

  handleChange = (e) => {
    this.setState({
      formAsignRole: {
        ...this.state.formAsignRole,
        [e.target.name]: e.target.value,
      }
    });
  };

  render() {
    const { loading, error } = this.state;

    if (loading) {
      return <Loading />;
    };

    if (error) {
      return <Error message={error} />;
    };

    return(
      <React.Fragment>
        <Main id="main">
          <MainHeader>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title">Roles de Usuario</h3>
                  </div>
                </div>
              </div>
              <div className="level is-mobile">
                <div className="level-left has-text-centered">
                  <Link to="/users" className="button is-light is-small">
                    <span className="icon">
                    <i className="fas fa-arrow-circle-left"></i>
                    </span>
                    <span>Volver</span>
                  </Link>
                </div>
              </div>
            </div>
          </MainHeader>

          <div className="columns is-centered" style={{width: "100%"}}>
            <div className="column is-7-desktop is-11-mobile is-offset-1-mobile is-10-tablet is-5-fullhd">
              <div className="container">
                <RolesFromUser 
                  isOpen={this.state.modalRemoveOpen}
                  handleRemoveModal={this.toggleModalRemove}
                  userData={this.state.userData} 
                  handleRemoveRole={this.handleRemoveRole} 
                />
              </div>
              <div className="level is-centered">
                <div className="level-item">
                  <button onClick={() => this.toggleModalAsign()} className="button is-info is-outlined is-small">Asignar Rol</button>
                </div>
              </div>
              <RegisterUserRolesModal 
                modalIsOpen={this.state.modalAssignOpen} 
                onClose={this.toggleModalAsign} 
                formValues={this.state.formAsignRole}
                onSubmit={this.handleAsignRole}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </Main>
      </React.Fragment>
    );
  };
};

export default RoleDetails;