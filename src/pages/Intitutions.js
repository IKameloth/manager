import React, {Component} from "react";
import { Main, MainHeader } from "../assets/styled/content";
import Loading from "../components/Loading";
import Error from "../components/Error";
import InstitutionsTable from "../components/tables/InstitutionsTable";
import {Link} from "react-router-dom";
import InstitutionModal from "../components/modals/InstitutionModal";

class Institutions extends Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    modalIsOpen: false,
    dataModal: undefined,
  };

  fetchData = async() => {
    const urlFaker = "http://localhost:4000/institutions";
    this.setState({loading: true});

    try {
      const response = await fetch(urlFaker);
      const dataJson = await response.json();
      const dataResult = [];
      dataJson.data.map((attr) => dataResult.push(attr.attributes));

      setTimeout(() => {
        this.setState({loading: false, data: dataResult});
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        this.setState({loading: false, error: error.message});
      }, 2000);
    }
  };

  componentDidMount() {
    this.fetchData();
  };

  handleModal = () => {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  };

  handleTest = (data) => {
    data &&
      this.setState({modalData: data});
      this.handleModal();
  }

  handleDeleteInstitution = async() => {
    const urlRequest = `http://localhost:4000/institutions/${this.state.modalData.rut}`;
    const requestOptions = {
      method: "DELETE",
    };

    try {
      fetch(urlRequest, requestOptions).then(async response => {
        const result = await response.json();

        if (result.errors) {
          const error = (result && result.errors) || response.status;
          return Promise.reject(error);
        };

        setTimeout(() => {
          this.fetchData();
          this.setState({modalIsOpen: false});
        });
      });
    } catch(err) {
      this.setState({loading: false, error: err.message});
      console.log(`Error: ${err}`);
    }
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
                  <Link to="/institution/new" className="button is-primary">Registrar institución</Link>
                </div>
              </div>
            </div>
          </MainHeader>
          <InstitutionsTable data={data} dataToModal={this.handleTest} />
          <InstitutionModal 
            modalIsOpen={this.state.modalIsOpen} 
            onClose={this.handleModal} 
            dataModal={this.state.modalData}
            deleteInstitution={this.handleDeleteInstitution}
          />
        </Main>
      </React.Fragment>
    );
  };
};

export default Institutions;