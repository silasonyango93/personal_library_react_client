import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import querystring from "querystring";
import ip from "../../config/EndPoint.js";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attemptedEmail: '',
            attemptedPassword: ''

        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleSubmit(event){
        event.preventDefault();



        axios.post(ip+'/signin',

            {
            attemptedEmail: this.state.attemptedEmail,
            attemptedPassword: this.state.attemptedPassword }
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


    render() {
        return (
            <div>
                <div className="container login-card">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="login-panel panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Sign In</h3>
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
                </div>


            </div>
        );
    }
}

export default Login;