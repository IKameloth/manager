import React, { Component } from "react";
import Loading from "./Loading";
import Error from "./Error";
import {Main, MainHeader} from "../assets/styled/content";
import InstitutionForm from "./InstituionForm";

class InstitutionDetails extends Component {
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

  // post data
  handleChange = (e) => {
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
          console.log(data);

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

  handleSubmit = async(e) => {
    e.preventDefault();
    this.fetchPostData();
  };

  // get data
  fetchData = async() => {
    // concatenar la id a la url
    const url = "http://localhost:4000/institutions/institutionID";

    try {
      const response = await fetch(url);
      const dataJson = await response.json();

      setTimeout(() => {
        // asignar data al form
        this.setState({loading: false, form: dataJson});
      }, 2000);
    } catch (err) {
      setTimeout(() => {
        this.setState({loading: false, error: err.message});
      }, 2000);
    };
  };

  componentDidMount() {
    // this.fetchData();
  };

  render() {
    console.log(this.props);
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
            </div>
          </MainHeader>

          <div className="columns is-centered" style={{width: "100%"}}>
            <div className="column is-7-desktop is-11-mobile is-offset-1-mobile is-10-tablet is-5-fullhd">
              <div className="container">
                <InstitutionForm
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  formValues={this.state.form}
                  error={this.state.error} 
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