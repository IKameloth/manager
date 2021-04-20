import React, { Component } from "react";
import Loading from "../app/common/Loading";
import Error from "../app/common/Error";
import {Main, MainHeader} from "../../assets/styled/content";
import InstitutionForm from "./InstituionForm";
import {Link} from "react-router-dom";

type InstitutionDetailsProps = {
  history: any,
  match: any
}


class InstitutionDetails extends Component<InstitutionDetailsProps,{}> {
  state = {
    loading: false,
    error: null,
    form: {
      name: "",
      rut: "",
      email: "",
      nemo: "",
      country: "",
      description: "",
      status: "",
      flag: "",
    },
    btnEdit: false,
  };

  handleChange = (e: any) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  };

  fetchEditInstitution = () => {
    this.setState({loading: true});

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.form),
    };

    try {
      fetch(`http://localhost:4000/institutions/${this.props.match.params.institutionID}`, requestOptions)
        .then(async response => {
          const data = await response.json();

          if(data.errors) {
            const error = (data && data.errors) || response.status;
            return Promise.reject(error);
          };
          
          setTimeout(() => {
            this.setState({loading: false});
            this.props.history.push("/institutions");
          }, 1000);
        })
        .catch(error => {
          setTimeout(() => {
            this.setState({loading: false});
            console.log(error);
            alert(`Error: Not valid data`);
          }, 1000);
        });
    } catch (error) {
      this.setState({loading: false, error: error.message});
      console.log("error fuera del fetch");
      console.log(error);
    }
  };

  handleEditInstitution = async(e: any) => {
    e.preventDefault();
    this.fetchEditInstitution();
  };
  // get data
  fetchData = async() => {
    const url = `http://localhost:4000/institutions/${this.props.match.params.institutionID}`;

    try {
      const response = await fetch(url);
      const dataJson = await response.json();
      const result = dataJson.data.attributes;
      console.log(result);

      setTimeout(() => {
        this.setState({loading: false, form: result, btnEdit: true});
      }, 2000);
    } catch (err) {
      setTimeout(() => {
        this.setState({loading: false, error: err.message});
      }, 2000);
    };
  };

  componentDidMount() {
    console.log("EDITING COMPONENT");
    this.setState({loading: true});
    this.fetchData();
  };

  componentWillUnmount(){
    console.log("EXIT EDITING COMPONENT");
  }

  render() {
    const { error, loading } = this.state;

    if (loading === true) {
        return <Loading />
    };

    if (error) {
        return ( <Error message={error} /> );
    }

    return (
      <React.Fragment>
        <Main id="main">
          <MainHeader>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title">Editar Institución</h3>
                  </div>
                </div>
              </div>
              <div className="level is-mobile">
                <div className="level-left has-text-centered">
                  <Link to="/institutions" className="button is-light is-small">
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
                <InstitutionForm
                  onChange={this.handleChange}
                  onSubmit={this.handleEditInstitution}
                  formValues={this.state.form}
                  error={this.state.error} 
                  isEditing={this.state.btnEdit}
                />
              </div>
            </div>
          </div>
        </Main>
      </React.Fragment>
    );
  };
};

export default InstitutionDetails;