import React, {Component} from "react";
import { Main, MainHeader } from "../../assets/styled/content";
import RegisterUserRolesModal from "./RegisterUserRolesModal";
import Loading from "../app/common/Loading";
import Error from "../app/common/Error";
import UsersTable from "./UsersTable";

class Users extends Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    modalIsOpen: false,
    form: {
      rut: "",
      role: [],
    },
  };

  componentDidMount() {
    console.log("didmount-user")
    this.fetchData();
  };

  componentWillUnmount() {
    console.log("Exit users component");
  };

  fetchData = async() => {
    const urlFake = "http://localhost:4000/users";
    this.setState({loading: true});

    try {
      const response = await fetch(urlFake);
      const dataJson = await response.json();
      const dataResult = [];
      dataJson.data.map((attr) => dataResult.push(attr.attributes));

      setTimeout(() => {
        this.setState({loading: false, data: dataResult});
      }, 2000)
    } catch(error) {
      setTimeout(() => {
        this.setState({loading: false, error: error.message});
      },2500)
    }
  };

  handleModal = () => {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  };

  fetchPostAsignRole = () => {
    this.setState({loading: true});
    const urlRequest = `http://localhost:4000/roles/${this.state.form.rut}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.form ),
    };

    try {
      fetch(urlRequest, requestOptions)
        .then(async response => {
          const data = await response.json();

          if(data.errors) {
            const error = (data && data.errors) || response.detail;
            return Promise.reject(error);
          };
          
          setTimeout(() => {
            this.setState({loading: false});
            this.props.history.push("/users");
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
    };
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  };

  handleSubmit = async(e) => {
    e.preventDefault();
    this.fetchPostAsignRole();
  };

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
                <div className="column is-3">
                  <button onClick={this.handleModal} className="button is-primary">Crear nuevo rol</button>
                  <RegisterUserRolesModal 
                    modalIsOpen={this.state.modalIsOpen} 
                    onClose={this.handleModal} 
                    formValues={this.state.form}
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                  />
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
