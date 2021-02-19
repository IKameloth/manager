import React, {Component} from "react";
import Loading from "./Loading";
import Error from "./Error";
import {Main, MainHeader} from "../assets/styled/content";
import {Link} from "react-router-dom";
import RolesFromUser from "./RolesFromUser";

class RoleDetails extends Component {
  state = {
    loading: false,
    error: undefined,
    modalRemoveOpen: false,
    modalAssignOpen: false,
    userData: {},
  };

  componentDidMount() {
    this.setState({loading: true});
    this.fetchGetUser();
  };

  componentWillUnmount() {
    this.setState({userData: {}});
    console.log("EXIT ROLE COMPONENT");
  };

  fetchGetUser = async() =>{
    const url = `http://localhost:4000/users/${this.props.match.params.userID}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      const userDataJson = result.data.attributes;
      
      setTimeout(() => {
        this.setState({loading: false, userData: userDataJson});
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
        });
      });
    } catch (err) {
      console.log(err);
      this.setState({loading: false, error: err.message});
    };
  };

  toggleModalRemove = () => {
    this.setState({modalRemoveOpen: !this.state.modalRemoveOpen});
  }

  handleRemoveRole = (roleObj) => {
    this.fetchRemoveRole(roleObj);
    this.toggleModalRemove();
    this.componentDidMount();
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
            </div>
          </div>
        </Main>
      </React.Fragment>
    );
  };
};

export default RoleDetails;