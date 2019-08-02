import React from "react";
import axios from "axios";
import querystring from "querystring";
import ip from "../../config/EndPoint.js";
import SideBar from "../../components/sidebar/SideBar.jsx";
import TopBar from "../../components/topbar/TopBar.jsx";
import Modal from 'react-awesome-modal';
import SuccessTick from "../../assets/success-tick.png";

class LibraryFieldsConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            userId: '',
            fieldName: '',
            fieldDescription: ''

        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    handleSubmit(event){
        event.preventDefault();
        axios.post(ip+'/library_fields/create_library_field',
            querystring.stringify({
                userId: window.sessionStorage.getItem("userId"),
                fieldName: this.state.fieldName,
                fieldDescription: this.state.fieldDescription})

        )
            .then((response) => {
                this.openModal();
            } )
            .catch((response) => {
                //handle error
                console.log(response);
            });
    }


    handleChange(event) {
        let newState = this.state
        newState[event.target.name] = event.target.value
        let prop = event.target.name
        this.setState({
            ...newState
        });

    }


    componentDidMount() {
        this.setState({
            ...this.state,
            userId: window.sessionStorage.getItem("userId")
        });
    }

    render() {
        return (
            <div>
                <TopBar />
                <div className="login-card">
                    <div className="col-md-4 side-bar">
                        <SideBar/>
                    </div>

                    <div className="col-md-4 landing-card">
                        <div className=" panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Library Fields</h3>
                            </div>
                            <div class="panel-body">
                                <form action="" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                    <fieldset>

                                        <div className="form-group">
                                            <input name="fieldName" className="form-control"
                                                   placeholder="E.g Mathematics, Science" value={this.state.fieldName} type="text"
                                                   onChange={this.handleChange} autoFocus required={true}/>
                                        </div>

                                        <div className="form-group">
                                                <textarea name="fieldDescription" className="form-control"
                                                          placeholder="E.g Is for all Mathematics" value={this.state.fieldDescription} type="text"
                                                          onChange={this.handleChange} autoFocus required={true}/>
                                        </div>

                                        <button type="submit" className="btn btn-lg btn-success btn-block">Submit</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="success-modal-header">
                        <p className="modal-title">Success</p>
                    </div>
                    <div className="modal-content-wrapper">
                        <img className="success-tick" src={SuccessTick} alt="Success" />
                    </div>
                </Modal>

            </div>
        );
    }
}

export default LibraryFieldsConfig;