import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Register from './views/authentication/Register.jsx';



class App extends Component {
  render() {
    return (
        <Router>
              <div>


                <Route path="/" component={Register} />

		        
		        
              </div>
        </Router>
    );
  }
}

export default App;