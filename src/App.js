import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './App.css';
import Landing from './formik/Landing'

class App extends Component {
  render() {
    return (
      
        <Router>
            <div>
              <Route path="/" exact component={Landing} />
            </div>
        </Router>
      
    );
  }
}

export default App;
