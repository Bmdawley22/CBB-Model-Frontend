import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AllStatsPage from './components/AllStatsPage';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      stats: false
    }
  }


  render () {
    return (
      <div>
        <Header 
          loggedIn={this.state.loggedIn}
        />
        <NavBar 
          loggedIn={this.state.loggedIn}
        />
        <Switch>
          <Route exact path='/' render={() => {
            return <Home/>
            }}
          />
          <Route path='/allstats' render={() => {
            return <AllStatsPage/>
            }}
          />
        </Switch>
        
      </div>
    )
  }
}

export default App
