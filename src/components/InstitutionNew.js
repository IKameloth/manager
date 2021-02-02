import React, { Component } from "react";
import Loading from "./Loading";
import Error from "./Error";
import {Main, MainHeader} from "../assets/styled/content";
import InstitutionForm from "./InstituionForm";

class InstitutionNew extends Component {
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
    }
  };
  
  handleChange = (e) => {
    console.log(this.state.form);
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  };

  fetchPostData = () => {
    this.setState({loading: true});

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.form ),
    };

    try {
      fetch("http://localhost:4000/institutions", requestOptions)
        .then(async response => {
          const data = await response.json();

          if(response.errors) {
            const error = (data && data.errors) || response.status;
            return Promise.reject(error);
          };

          this.setState({loading: false});
          console.log("Success save data");
          this.props.history.push("/institutions");
        })
        .catch(error => {
          this.setState({loading: false, error: error});
          console.log("error en el fetch");
          console.log(error);
          alert(`Error: ${error}`);
        });
    } catch (error) {
      this.setState({loading: false, error: error.message});
      console.log("error fuera del fetch");
      console.log(error);
    }
  };

  handleSubmit = async(e) => {
    e.preventDefault();
    this.setState({loading: false});
    console.log(this.state.form);
    this.fetchPostData();
  };

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
                    <h3 className="title">Registrar Institución</h3>
                  </div>
                </div>
              </div>
            </div>
          </MainHeader>

          <div className="columns is-centered" style={{width: "100%"}}>
            <div className="column is-6">
              <InstitutionForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error} 
              />
            </div>
          </div>
        </Main>
      </React.Fragment>
    );
  };
};

export default InstitutionNew;