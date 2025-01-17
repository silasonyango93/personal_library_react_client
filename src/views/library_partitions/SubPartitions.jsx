import React from "react";
import axios from "axios";
import querystring from "querystring";
import ip from "../../config/EndPoint.js";
import SideBar from "../../components/sidebar/SideBar.jsx";
import TopBar from "../../components/topbar/TopBar.jsx";
import Modal from 'react-awesome-modal';
import SuccessTick from "../../assets/success-tick.png";
import Select from "react-select";

class SubPartitions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            partitionIds: [],
            SelectedPartitionId: '',
            subPartitionRefNo: '',
            subPartitionDescription: ''

        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getAllLibraryPartitions = this.getAllLibraryPartitions.bind(this);
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
        axios.post(ip+'/subpartitions/create_subpartition',
            querystring.stringify({
                partitionId: this.state.SelectedPartitionId.value,
                subPartitionRefNo: this.state.subPartitionRefNo,
                subPartitionDescription: this.state.subPartitionDescription})

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

        this.setState({userId: window.sessionStorage.getItem("userId")}, () => {

            this.getAllLibraryPartitions();

        });
    }

    getAllLibraryPartitions() {
        axios.post(ip+'/library_partitions/get_all_partitions')
            .then((response) => {
                let jsonArray=[];
                let jsonObject= null;

                response.data.forEach((item) => {

                    jsonObject={value:item.partitionId,label:item.partitionRefNo}
                    jsonArray.push(jsonObject);

                });

                return jsonArray;
            } )
            .then((jsonArray) => {
                this.setState({
                    ...this.state,
                    partitionIds: jsonArray
                });
            })
            .catch((response) => {
                //handle error
                console.log(response);
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
                                <h3 className="panel-title">Library Sub-Partitions</h3>
                            </div>
                            <div class="panel-body">
                                <form action="" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                    <fieldset>

                                        <div className="form-group">
                                            <Select
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="Select Parent Partition"
                                                name="SelectedPartitionId"
                                                closeMenuOnSelect={true}
                                                value={this.state.SelectedPartitionId}
                                                onChange={value =>
                                                    this.setState({
                                                        ...this.state,
                                                        SelectedPartitionId: value
                                                    })

                                                }
                                                options={this.state.partitionIds}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input name="subPartitionRefNo" className="form-control"
                                                   placeholder="E.g A, B , 1 , B3" value={this.state.subPartitionRefNo} type="text"
                                                   onChange={this.handleChange} autoFocus required={true}/>
                                        </div>

                                        <div className="form-group">
                                                <textarea name="subPartitionDescription" className="form-control"
                                                          placeholder="E.g Top right corner of the shelf" value={this.state.subPartitionDescription} type="text"
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

export default SubPartitions;