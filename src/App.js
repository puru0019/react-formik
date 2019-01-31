import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './App.css';
import Landing from './formik/Landing';
import Navigation from './Navigation';
import FormikComponent from './formik/FormikComponent';
import formikHocComponent from './formik/formikHocComponent';

class App extends Component {
  render() {
    return (
      
        <Router>
            <div>
              <Navigation/>
              <div>
                <Route path="/" exact component={Landing} />
                <Route path="/formik" exact component={FormikComponent} />
                <Route path="/withFormik" exact component={formikHocComponent} />
              </div>
            </div>
        </Router>
      
    );
  }
}

export default App;
