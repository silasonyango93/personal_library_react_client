import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Register from './views/authentication/Register.jsx';
import Login from './views/authentication/Login.jsx';



class App extends Component {
  render() {
    return (
        <Router>
              <div>


                <Route path="/" component={Login} />
                <Route path="/register" component={Register} />

		        
		        
              </div>
        </Router>
    );
  }
}

export default App;