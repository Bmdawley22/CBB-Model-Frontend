import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AllStatsPage from './components/AllStatsPage';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';

import { signup, loginUser, verifyUser } from './services/api_helper';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      stats: false,
      currentUser: null
    }
  }
  handleSignup = async (e, newUserData) => {
    e.preventDefault();
    console.log(newUserData)
    const currentUser = await signup(newUserData);
    this.setState({ currentUser });
    this.props.history.push('/profile');
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
          <Route path='/signup' render={() => {
            return <SignupForm
                      handleSignup={this.handleSignup}
                  />
            }}
          />
          <Route path='/profile' render={() => {
            return <Profile
                      currentUser={this.state.currentUser}
                  />
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

export default withRouter(App)
