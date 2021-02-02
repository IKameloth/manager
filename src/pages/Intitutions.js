import React, {Component} from "react";
import { Main, MainHeader } from "../assets/styled/content";
import Loading from "../components/Loading";
import Error from "../components/Error";
import InstitutionsTable from "../components/tables/InstitutionsTable";
import {Link} from "react-router-dom";

class Institutions extends Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    modalIsOpen: false
  };

  fetchData = async() => {
    const urlFaker = "http://localhost:4000/institutions";
    this.setState({loading: true});

    try {
      const response = await fetch(urlFaker);
      const dataJson = await response.json();

      setTimeout(() => {
        this.setState({loading: false, data: dataJson});
      });
    } catch (error) {
      setTimeout(() => {
        this.setState({loading: false, error: error.message});
      });
    }
  };

  componentDidMount() {
    this.fetchData();
  };

  render() {
    const { error, loading, data } = this.state;

    if (loading === true && !data) {
      return <Loading />;
    };

    if (error) {
      return ( <Error message={error} /> );
    };

    return (
      <React.Fragment>
        <Main>
          <MainHeader>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title is-3">Instituciones</h3>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <p className="control has-icons-left has-icons-right is-hidden">
                      <input className="input" type="text" placeholder="Buscar por RUT o nombre" />
                      <span className="icon is-small is-left">
                        <i className="fal fa-search"></i>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="column is-3">
                  <Link to="/institution/new" className="button is-primary">Registrar institutición</Link>
                </div>
              </div>
            </div>
          </MainHeader>
          <InstitutionsTable data={data} />
        </Main>
      </React.Fragment>
    );
  };
};

export default Institutions;