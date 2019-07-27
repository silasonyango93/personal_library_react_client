import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import querystring from "querystring";
import ip from "../../config/EndPoint.js";
import SideBar from "../../components/sidebar/SideBar.jsx";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attemptedEmail: '',
            attemptedPassword: ''

        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.signUpLinkClicked = this.signUpLinkClicked.bind(this);

    }


    handleSubmit(event){
        event.preventDefault();



        axios.post(ip+'/user/get_by_email',

            {
                attemptedEmail: this.state.attemptedEmail }
        )
            .then((response) => {
                if(response.data){
                    this.login();
                }else { alert("User or password is incorrect"); }
            } )
            .catch((response) => {
                //handle error
                console.log(response);
            });

    }


    login() {
        axios.post(ip+'/user/authenticate',

            {
                attemptedEmail: this.state.attemptedEmail,
                attemptedPassword: this.state.attemptedPassword
            }
        )
            .then((response) => {
                console.log(response);
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


    signUpLinkClicked() {
        this.props.history.push('/register');
    }


    render() {
        return (
            <div>

                <div className="login-card">
                    <div className="col-md-4 side-bar">
                        <SideBar/>
                    </div>

                        <div className="col-md-4 container">
                            <div className="login-panel panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Home</h3>
                                </div>
                                <div class="panel-body">
                                    <form action="" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                        <fieldset>

                                            <div className="form-group">
                                                <input name="attemptedEmail" className="form-control"
                                                       placeholder="Email" value={this.state.attemptedEmail} type="text"
                                                       onChange={this.handleChange} autoFocus/>
                                            </div>

                                            <div className="form-group">
                                                <input name="attemptedPassword" className="form-control" placeholder="Password" value={this.state.attemptedPassword} type="password" onChange={this.handleChange} />
                                            </div>

                                            <button type="submit" className="btn btn-lg btn-success btn-block">Sign In</button>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>

                </div>

                <p className="sign-up-link" onClick={this.signUpLinkClicked}><a href="">Or Sign Up With Us</a></p>
            </div>
        );
    }
}

export default Home;