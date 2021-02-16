import React, {Component} from "react";
import { 
  Main,
  MainHeader
} from "../assets/styled/content";
import RegisterAdminRolesModal from "../components/modals/RegisterAdminRolesModal";
import RemoveModal from "../components/modals/RemoveAdminRole";
import AdminRolesTable from "../components/tables/AdminRolesTable";
import Loading from "../components/Loading";
import Error from "../components/Error";

class AdminRoles extends Component {
  state = {
    loading: false,
    error: null,
    data: undefined,
    modalIsOpen: false,
    isEdit: false,
    modalRemoveOpen: false,
    modalRemoveData: undefined,
    form: {
      name: "",
      rut: "",
      role: "",
      institution: "",
    },
  };

  componentDidMount() {
    this.fetchData();
  };

  componentWillUnmount() {
    console.log("EXIT ADMIN ROLES COMPONENT");
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
      this.setState({loading: false, error: error.message});
    }
  };

  toggleModal = () => {
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      isEdit: false,
      form: {
        name: "",
        rut: "",
        role: "",
        institution: ""
      },
    })
  }

  toggleModalRemove = () => {
    this.setState({modalRemoveOpen: !this.state.modalRemoveOpen});
  };

  handleModalData = (data) => {
    data &&
      this.setState({form: data, isEdit: true});
      this.toggleModal();
  };

  handleModalRemoveData = data => {
    data &&
      this.setState({modalRemoveData: data});
      this.toggleModalRemove();
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchPostAsignAdminRole();
  };

  handleRemove = (e) => {
    e.preventDefault();
    this.fetchRemoveAdminRole();
  };

  fetchPostAsignAdminRole = async() => {
    console.log("FETCH ASIGN ADMIN ROLE POST");
  };

  fetchRemoveAdminRole = async() => {
    console.log("FETCH REMOVE ADMIN ROLE");
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
        <Main id="main">
          <MainHeader>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <h3 className="title">Admin Roles</h3>
                  </div>
                </div>
                <div className="column">
                  <div className="field">
                    <p className="control has-icons-left has-icons-right is-hidden">
                      <input id="inputSearch" className="input" type="text" placeholder="Buscar por RUT o nombre" />
                      <span className="icon is-small is-left">
                        <i className="fal fa-search"></i>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="column is-2-fullhd">
                  <button onClick={this.toggleModal} className="button is-primary">Crear Rol</button>
                  <RegisterAdminRolesModal 
                    isOpen={this.state.modalIsOpen} 
                    onClose={this.closeModal} 
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                    isEdit={this.state.isEdit}
                    formValues={this.state.form}
                  />
                </div>
              </div>
            </div>
          </MainHeader>
          <AdminRolesTable data={data} 
            dataToModal={this.handleModalRemoveData} 
            dataEditModal={this.handleModalData} 
          />
          <RemoveModal 
            modalIsOpen={this.state.modalRemoveOpen}
            onClose={this.toggleModalRemove}
            dataModal={this.state.modalRemoveData}
          />
        </Main>
      </React.Fragment>
    );
  };
};

export default AdminRoles;