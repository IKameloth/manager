import React, {Component} from "react";
import { 
  Main,
  MainHeader,
} from "../assets/styled/content";
import RegisterUserRolesModal from "../components/modals/RegisterUserRolesModal";
import Loading from "../components/Loading";
import Error from "../components/Error";
import UsersTable from "../components/tables/UsersTable";

class Users extends Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    modalIsOpen: false
  };

  toggleModal = (e) => {
    e.preventDefault();
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async() => {
    const urlFake = "http://localhost:3003/users";
    this.setState({loading: true, error: null});
    try {
      const response = await fetch(urlFake);
      const dataJson = await response.json();
      setTimeout(() => {
        this.setState({loading: false, data: dataJson});
      }, 2500)
    } catch(error) {
      setTimeout(() => {
        this.setState({loading: false, error: error.message});
      },2500)
    }
  }

  render(){
    const { error, loading, data } = this.state;
    
    if (loading === true && !data) {
      return <Loading />;
    };

    if (error) {
      return(
        <Error message={error} />
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
                    <h3 className="title is-3">Usuarios</h3>
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
                <div className="column is-2-fullhd">
                  <button onClick={this.toggleModal} className="button is-primary">Crear nuevo rol</button>
                  <RegisterUserRolesModal modalIsOpen={this.state.modalIsOpen} onClose={this.toggleModal} />
                </div>
              </div>
            </div>
          </MainHeader>
          <UsersTable data={data} />        
        </Main>
      </React.Fragment>
    )
  }
};

export default Users;
