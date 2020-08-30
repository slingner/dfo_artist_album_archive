import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Artists from './components/Artists';
import Albums from './components/Albums';
import NotFound from './components/NotFound';
import Navbar from 'react-bootstrap/Navbar';

class App extends Component {
  render() {
    return (
      <>
        <Navbar bg='light' variant='light'>
          <Navbar.Brand className='font-weight-bold' href='/'>
            <ion-icon
              style={{ fontSize: '25px', paddingRight: '8px' }}
              name='planet'
            />
            Artist Album Archive
          </Navbar.Brand>
        </Navbar>
        <Router>
          <Switch>
            <Route exact path='/' component={Artists} />
            <Route exact path='/albums/:artistName' component={Albums} />
            <Route render={(props) => <NotFound {...props} />} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
