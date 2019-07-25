import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: '',
            MiddleName: '',
            Surname: '',
            Email: '',
            Password: '',
            login_error:true,
            login_credentials:[]

        };


        /*this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);*/

    }





    render() {
        return (
            <div>
                <Router>
                    <Route path="/login" component={Register} />
                </Router>
                <div className="container login-card">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="login-panel panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Register With Us</h3>
                                </div>
                                <div class="panel-body">
                                    <form action="" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                        <fieldset>
                                            <div class="form-group">
                                                <input name="FirstName" className="form-control" placeholder="First Name" value={this.state.FirstName} type="text" onChange={this.handleChange} autofocus />
                                            </div>

                                            <div className="form-group">
                                                <input name="MiddleName" className="form-control"
                                                       placeholder="Middle Name" value={this.state.MiddleName} type="text"
                                                       onChange={this.handleChange} autoFocus/>
                                            </div>

                                            <div className="form-group">
                                                <input name="Surname" className="form-control"
                                                       placeholder="Surname" value={this.state.Surname} type="text"
                                                       onChange={this.handleChange} autoFocus/>
                                            </div>

                                            <div className="form-group">
                                                <input name="Email" className="form-control"
                                                       placeholder="Email" value={this.state.Email} type="text"
                                                       onChange={this.handleChange} autoFocus/>
                                            </div>

                                            <div className="form-group">
                                                <input name="Password" className="form-control" placeholder="Password" value={this.state.Password} type="password" onChange={this.handleChange} />
                                            </div>


                                            <button type="submit" className="btn btn-lg btn-success btn-block">Sign Up</button>
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

export default Register;