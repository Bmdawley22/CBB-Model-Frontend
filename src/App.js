import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AllStatsPage from './components/AllStatsPage';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';

import { signup, login, verifyUser, getAllStats } from './services/api_helper';
import LoginForm from './components/LoginForm';
import BuildModel from './components/Build Model/BuildModel';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: false,
      statNames: null,
      currentUser: false
    }
  }
  handleSignup = async (e, newUserData) => {
    e.preventDefault();
    console.log(newUserData)
    const currentUser = await signup(newUserData);
    this.setState({ 
      currentUser });
    this.props.history.push('/profile');
  }
  handleLogin = async (e, loginData) => {
    e.preventDefault();
    const currentUser = await login(loginData);
    this.setState({ currentUser });
    this.props.history.push('/profile');
  }
  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.setState({ currentUser: null });
    this.props.history.push('/login');
  }
  verifyUser = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser });
    }
  }
  getStats = async () => {
    let stats = await getAllStats();
    stats = stats.data;

    const statNamesArr = [];
    for (const [key] of Object.entries(stats[0])) {
        if ( key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
          statNamesArr.push(key)
        }  
    }
    this.setState({ statNames: statNamesArr })

    let tempTeamStats = [];
    let statArr = []
    for (let i = 0; i < stats.length; i++) {
        for (const [key, value] of Object.entries(stats[i])) {
            if ( key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
                tempTeamStats.push(value)
            }
        }
        statArr[i] = tempTeamStats;
        tempTeamStats = [];
    }
    this.setState({ stats: statArr })
}
  componentDidMount() {
    this.verifyUser();
    this.getStats();
  }
  render () {
    return (
      <div>
        <Header 
          currentUser={this.state.currentUser}
          handleLogout={this.handleLogout}
        />
        <NavBar currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' render={() => {
            return <Home currentUser={this.state.currentUser}/>
            }}
          />
          <Route path='/signup' render={() => {
            return <SignupForm handleSignup={this.handleSignup} />
            }}
          />
          <Route path='/login' render={() => {
            return <LoginForm handleLogin={this.handleLogin} />
            }}
          />
          <Route path='/profile' render={() => {
            return <Profile currentUser={this.state.currentUser} />
            }}
          />
          <Route path='/build-model' render={() => {
            return <BuildModel />
            }}
          />
          <Route path='/allstats' render={() => {
            return <AllStatsPage
                    getStats={this.getStats}
                  />
            }}
          />
        </Switch>
        
      </div>
    )
  }
}

export default withRouter(App)
