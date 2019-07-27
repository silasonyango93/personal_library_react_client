import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bulma/css/bulma.css'
import Register from './views/authentication/Register.jsx';
import Login from './views/authentication/Login.jsx';
import Home from './views/home/Home.jsx';



class App extends Component {
  render() {
    return (
        <Router>
              <div>


                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />

		        
		        
              </div>
        </Router>
    );
  }
}

export default App;