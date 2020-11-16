import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Home from './components/Home';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';

import { signup, login, verifyUser, getAllOffStats, getAllDefStats } from './services/api_helper';
import LoginForm from './components/LoginForm';
import BuildModel from './components/Build Model/BuildModel';
import StatContainer from './components/Stats/StatContainer';
import StatDiffContainer from './components/Stats/StatDiffContainer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offStats: false,
      offStatNames: ['SCHOOL', 'TOTAL G', 'TOTAL W', 'TOTAL L', 'W-L %', 'SRS', 'SOS', 'CONF W', 'CONF L', 
                    'HOME W', 'HOME L', 'AWAY W', 'AWAY L', 'PTS', 'FG', 'FGA', 'FG %', '3 PT', '3 PTA', '3 PT %',
                    'FT', 'FTA', 'FT %', 'ORB', 'TRB', 'ASST', 'STL', 'BLK', 'TOV', 'PF'],
      defStats: false,
      defStatNames: ['SCHOOL', 'TOTAL G', 'TOTAL W', 'TOTAL L', 'W-L %', 'SRS', 'SOS', 'CONF W', 'CONF L','HOME W','HOME L',
                    'AWAY W', 'AWAY L', 'PTS ALL', 'FG ALL', 'FGA ALL', 'FG % ALL', '3 PT ALL', '3 PTA ALL', '3 PT % ALL',
                    'FT ALL', 'FTA ALL', 'ORB ALL', 'TRB ALL', 'ASST ALL', 'STL ALL', 'BLK ALL', 'OPP TOV', 'OPP PF'],
      offStatAverages: {},
      defStatAverages: {},
      currentUser: false
    }
  }
  handleSignup = async (e, newUserData) => {
    e.preventDefault();
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
  getOffStats = async () => {
    let offStats = await getAllOffStats();
    offStats = offStats.data;

    let offStatAverages = this.getAverages(offStats);
    this.setState({ offStatAverages });

    let tempOffStats = [];
    let offStatArr = []
    for (let i = 0; i < offStats.length; i++) {
        for (const [key, value] of Object.entries(offStats[i])) {
            if ( key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
              tempOffStats.push(value)
            }
        }
        offStatArr[i] = tempOffStats;
        tempOffStats = [];
    }
    this.setState({ offStats: offStatArr })
}
getDefStats = async () => {
  let defStats = await getAllDefStats();
  defStats = defStats.data;
  
  let defStatAverages = this.getAverages(defStats);
  this.setState({ defStatAverages });

  let tempDefStats = [];
  let defStatArr = []
  for (let i = 0; i < defStats.length; i++) {
      for (const [key, value] of Object.entries(defStats[i])) {
          if ( key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
            tempDefStats.push(value)
          }
      }
      defStatArr[i] = tempDefStats;
      tempDefStats = [];
  }
  this.setState({ defStats: defStatArr })

}
getAverages = (stats) => {
  let sums = {};
  let averages = {};
  let excludeNames = ['id','createdAt','updatedAt','school', 'conf_w', 'conf_l', 'home_w', 'home_l','away_w','away_l'];
  let newVal = 0;
  for( let i = 0; i < stats.length; i++) {
    for (const [key, value] of Object.entries(stats[i])) {
      if ( !excludeNames.includes(key) ) {
        if (sums[`${key}`]) {
          newVal = sums[`${key}`] + value;
          sums[`${key}`] = newVal;
        }
        else {
          sums[`${key}`] = value;
        }
      }
    }
  }
  for (const [key, value] of Object.entries(sums)) {
    newVal = value/stats.length
    averages[`${key}`] = newVal.toFixed(2);
  }
  return averages;
}
  componentDidMount() {
    this.verifyUser();
    this.getOffStats();
    this.getDefStats();

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
          <Route path='/stats' render={() => {
            return <StatContainer
                      offStats={this.state.offStats}
                      offStatNames={this.state.offStatNames}
                      defStats={this.state.defStats}
                      defStatNames={this.state.defStatNames}
                      offStatAverages={this.state.offStatAverages}
                      defStatAverages={this.state.defStatAverages}
                  />
            }}
          />
          <Route path='/differentials' render={() => {
            return <StatDiffContainer
                      offStats={this.state.offStats}
                      offStatNames={this.state.offStatNames}
                      defStats={this.state.defStats}
                      defStatNames={this.state.defStatNames}
                  />
            }}
          />
        </Switch>
        
      </div>
    )
  }
}

export default withRouter(App)
