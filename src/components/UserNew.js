import React, { Component } from "react";
import Loading from "./Loading";
import Error from "./Error";
import {Main, MainHeader} from "../assets/styled/content";
import UserForm from "./UserForm";
import {Link} from "react-router-dom";

class UserNew extends Component {
  state = {
    loading: false,
    error: null,
    institutionList: [],
    form: {
      name: "",
      rut: "",
      email: "",
      role: "",
      institution: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name] : e.target.value,
      }
    });
  };

  fetchPostNewUser = () => {
    this.setState({loading: true});

    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state.form),
    };

    try {
      const urlPost = "http://localhost:4000/users"
      fetch(urlPost, requestOptions)
        .then(async response => {
          const data = await response.json();

          if (data.errors) {
            const error = (data && data.errors) || response.detail;
            return Promise.reject(error);
          };

          setTimeout(() => {
            this.setState({loading: false});
            this.props.history.push("/persons");
          }, 1000);
        })
        .catch(error => {
          setTimeout(() => {
            this.setState({loading: false, error: error.message});
            console.log(error);
            alert("Error: Not valid data");
          }, 1000);
        });
    } catch (error) {
      this.setState({loading: false, error: error.message});
      console.log("Error out fetch");
      console.log(error);
    };
  };

  handleSubmit = async(e) => {
    e.preventDefault();
    this.fetchPostNewUser();
  };

  componentDidMount() {
    this.getInstitutionList();
    console.log("Component Post");
  };

  componentWillUnmount(){
    this.setState({institutionList: {}});
    console.log("Exit from Post Users");
  };

  getInstitutionList = async() => {
    const url = `http://localhost:4000/institutions`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      const data = result.data;

      const listNamesInst = [...new Set(data.map(it => it.attributes.name))];

      this.setState({institutionList: listNamesInst});
    } catch(err) {
      this.setState({loading: false, error: err.message});
    };
  };

  render() {
    const { error, loading } = this.state;

    if (loading) {
      return <Loading />
    };

    if (error) {
      return <Error message={error} />
    };

    return(
      <React.Fragment>
        <Main id="main">
          <MainHeader>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title">Registrar Usuario</h3>
                  </div>
                </div>
              </div>
              <div className="level is-mobile">
                <div className="level-left has-text-centered">
                  <Link to="/persons" className="button is-light is-small">
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
                <UserForm
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  formValues={this.state.form}
                  error={this.state.error} 
                  institutionList={this.state.institutionList}
                />
              </div>
            </div>
          </div>
        </Main>
      </React.Fragment>
    )
  }
};

export default UserNew;