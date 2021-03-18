import React, {Component} from "react";
import { Main, MainHeader } from "../../assets/styled/content";
import {Link} from "react-router-dom";

class Persons extends Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    modalIsOpen: false,
    query: "",
    results: [],
  };

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.fetchGetInfo();
        }
      } else {
        this.setState({results: []});
      };
    })
  };

  fetchGetInfo = async() => {
    const urlFake = "http://localhost:4000/users";

    try {
      const response = await fetch(urlFake);
      const dataJson = await response.json();
      const dataResult = [];
      dataJson.data.map((attr) => dataResult.push(attr.attributes));

      setTimeout(() => {
        this.setState({results: dataResult});
      }, 2000)
    } catch(error) {
      setTimeout(() => {
        this.setState({error: error.message});
      },2500)
    }
  };

  render() {
    const Suggestions = (props) => {
      const options = props.results.map(res => (
        <li key={res.rut}>
          <Link to={`/users/${res.rut}/details`}>
              {res.rut}
          </Link>
        </li>
      ));

      return (
        options.length > 0 
        ? <div className="field">
            <label className="label">Sugerencias</label>
            <div className="control has-icons-left has-icons-right">
              <ul>{options}</ul>
            </div>
          </div>
        : ""
      );
    };

    return (
      <React.Fragment>
        <Main>
          <MainHeader>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title">Personas</h3>
                  </div>
                </div>
                <div className="column is-3">
                  <Link to="/users/new" className="button is-primary" >Registrar Usuario</Link>
                </div>
              </div>
            </div>
          </MainHeader>
  
          <div className="columns is-centered" style={{width: "100%"}}>
            <div className="column is-7-desktop is-10-mobile is-offset-1-mobile is-10-tablet is-5-fullhd">
              <div className="container">
                <div className="field">
                  <label className="label">Rut</label>
                  <div className="control has-icons-left has-icons-right">
                    <input 
                      className="input is-primary" 
                      type="text" 
                      placeholder="Buscar por rut" 
                      ref={input => this.search = input}
                      onChange={this.handleInputChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-fingerprint"></i>
                    </span>
                  </div>
                </div>
                <hr></hr>
                <Suggestions results={this.state.results} />
              </div>      
            </div>
          </div>
          
        </Main>
      </React.Fragment>
    )
  };
};

export default Persons;