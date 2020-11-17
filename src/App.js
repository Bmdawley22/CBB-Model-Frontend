import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';

import Header from './components/Header';
import NavBar from './components/NavBar';
import Home from './components/Home';
import SignupForm from './components/SignupForm';
import Profile from './components/Profile';

import { signup, login, verifyUser, getAllOffStats, getAllDefStats, getUserModels, saveModel } from './services/api_helper';
import LoginForm from './components/LoginForm';
import BuildModel from './components/Build Model/BuildModel';
import StatContainer from './components/Stats/StatContainer';
import StatDiffContainer from './components/Stats/StatDiffContainer';
import ModelsContainer from './components/Your Models/ModelsContainer';
import GameContainer from './components/Game Predictor/GameContainer';


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
      offStatAverages: [],
      defStatAverages: [],
      offAvgNames: [],
      defAvgNames: [],
      avgScore: null,
      maxMin: [],
      defDiffs: [],
      schoolNames: [],
      validNames: [],
      currentUser: false,
      currUserModels: {},
      selectedModelId: 0,
      awayScore: null,
      homeScore: null,
      modelIds: []
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
  //verifies user, if verified gets all of users models
  verifyUser = async () => {
    const currentUser = await verifyUser();
    if (currentUser) {
      this.setState({ currentUser });
    }
    this.getCurrUserModels(currentUser.id)
  }
  //gets user models based on user id passed in
  //if (id = 0) is passed in, only the "user_models" table names will be returned 
  getCurrUserModels = async (id) => {
 
    const currUserModels = await getUserModels(id);

    if(id !== 0){
      if (currUserModels) {
        this.setState({ currUserModels })
        return
      }
    }
    else {
      if (currUserModels) {
        let modelTableNames = []
        for (const [key] of Object.entries(currUserModels[0])) {
            if ( key !== 'id' && key !== 'user_id' && key !== 'createdAt' && key !== 'updatedAt') {
              modelTableNames.push(key)
            }
        }
        return modelTableNames;
      }
    }
  }
  getOffStats = async () => {
    let offStats = await getAllOffStats();
    offStats = offStats.data;

    let offStatAverages = this.getAverages(offStats);
    this.setState({ offStatAverages });
    
    let maxMin = this.getMaxMin(offStats);
    this.setState({ maxMin })

    let offDiffs = this.getDifferentials(offStats,'o');
    this.setState({ offDiffs })

    let tempOffStats = [];
    let offStatsArr = []
    for (let i = 0; i < offStats.length; i++) {
        for (const [key, value] of Object.entries(offStats[i])) {
            if ( key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
              tempOffStats.push(value)
            }
        }
        offStatsArr[i] = tempOffStats;
        tempOffStats = [];
    }
    this.getSchoolNames(offStatsArr);
    this.setState({ offStats: offStatsArr })
  } 
  getDefStats = async () => {
    let defStats = await getAllDefStats();
    defStats = defStats.data;
    
    let defStatAverages = this.getAverages(defStats);
    this.setState({ defStatAverages });
    
    let maxMin = this.getMaxMin(defStats);
    this.setState({ maxMin })

    let defDiffs = this.getDifferentials(defStats);
    this.setState({ defDiffs })

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
    let averagesObj = {};
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
      averagesObj[`${key}`] = newVal.toFixed(2);
      if (key === 'pts') {
        this.setState({ avgScore: parseFloat(averagesObj[`${key}`]) })
      }
    }
    let averagesArr = [];
    for (const [key, value] of Object.entries(averagesObj)) {
      averagesArr.push(value);
    }
    return averagesArr;
  }
  getMaxMin = (stats) => {
    let srs = [];
    let sos = []
    for( let i = 0; i < stats.length; i++) {
      for (const [key, value] of Object.entries(stats[i])) {
        if (key === 'srs') {
          srs.push(value)
        }
        else if (key === 'sos') {
          sos.push(value)
        }
      }
    }
    let srsMax = Math.max(...srs);
    let sosMax = Math.max(...sos);
    let srsMin  = Math.min(...srs);
    let sosMin = Math.min(...sos);
    return [srsMax, srsMin, sosMax, sosMin];
  }
  getAvgNames = () => {
    
    let excludeNames = ['SCHOOL', 'CONF W', 'CONF L', 'HOME W', 'HOME L','AWAY W','AWAY L'];
    let offAvgNames = [];
    
    for (let i = 0; i < this.state.offStatNames.length; i++) {
        if(!excludeNames.includes(this.state.offStatNames[i])) {
            offAvgNames.push(this.state.offStatNames[i])
        }
    }
    this.setState({ offAvgNames })

    let defAvgNames = [];
    
    for (let i = 0; i < this.state.defStatNames.length; i++) {
        if(!excludeNames.includes(this.state.defStatNames[i])) {
            defAvgNames.push(this.state.defStatNames[i])
        }
    }
    this.setState({ defAvgNames })
    this.getValidModelNames(offAvgNames)
    return offAvgNames;
  }
  getSchoolNames = (stats) => {
    let schoolNames = [];
    for (let i = 0; i < stats.length; i++) {
        schoolNames.push(stats[i][0].toLowerCase())
    }
    this.setState({ schoolNames })
    return schoolNames
  }
  getDifferentials = (stats, offOrDef) => {
    let averages = []

    if( offOrDef === 'o') {
      averages = this.state.offStatAverages;
    }
    else {
      averages = this.state.defStatAverages;
    }
    const excludeNames = ['id','createdAt','updatedAt', 'conf_w', 'conf_l', 'home_w', 'home_l','away_w','away_l'];
    const inverseDiffs = ['total_l','tov','pf','pts_all', 'fg_all', 'fga_all', 'fg_perc_all', 'three_pt_all', 'three_pta_all',
                          'three_pt_perc_all', 'ft_all', 'fta_all', 'orb_all', 'trb_all','asst_all', 'stl_all','blk_all']
    let diffData = [];
    let temp = [];
    let diff = 0;
    let count = 0;
    let maxMin = this.state.maxMin;
    for( let i = 0; i < stats.length; i++) {
      temp=[]
      count = 0;
      for (const [key, value] of Object.entries(stats[i])) {
        if ( !excludeNames.includes(key) ) {
            if (key === 'school') {
              temp.push(value)
            }
            else if (key === 'srs') {
              diff = 100 * ((value - maxMin[1])/(maxMin[0] - maxMin[1])-0.5)
              temp.push(`${diff.toFixed(1)}%`)
              count++;
            }
            else if (key === 'sos') {
              diff = 100 * ((value - maxMin[3])/(maxMin[2] - maxMin[3])-0.5)
              temp.push(`${diff.toFixed(1)}%`)
              count++;
            }
            else if (inverseDiffs.includes(key)) {
              diff = -1 * 100 * ((value - averages[count])/(averages[count]));
              temp.push(`${diff.toFixed(1)}%`)
              count++;
            }
            else {
              diff = 100 * ((value - averages[count])/(averages[count]));
              temp.push(`${diff.toFixed(1)}%`)
              count++;
            }
        }
      }
      diffData.push(temp);
    }
    return diffData;
  }
  createModel = async (modelObj) => {
    await saveModel(modelObj);
  }
  handleModelSubmit = async (e, modelStatNames) => {
    e.preventDefault();
   
    const modelTableNames = await this.getCurrUserModels(0);
   
    
    //gets model weights from user
    let modelValues = [];
    for (let i = 1; i < e.target.length; i++) {
      if(e.target[i].className === 'model-input') {
        modelValues.push(e.target[i].valueAsNumber);
      }
    }
    
    const validNames = this.state.offAvgNames;
    validNames.shift()

    let userModel = {}
    userModel.user_id = this.state.currentUser.id;
    for(let i = 0; i < validNames.length; i++) {
      if ( modelStatNames.includes(validNames[i]) ) {
        for (let j = 0; j < modelStatNames.length; j++) {
          if (validNames[i] ===  modelStatNames[j]) {
            userModel[`${modelTableNames[i]}`] = modelValues[j];
          }
        }
      }
      else {
        userModel[`${modelTableNames[i]}`] = 0;
      }
    }
    this.createModel(userModel)
    this.props.history.push('/model')
  }
  getValidModelNames = (offAvgNames) => {
    let validNames = [];
    if( offAvgNames ) {
        for (let i = 0; i < offAvgNames.length; i++) {
            if (offAvgNames[i] !== 'TOTAL G') {
                validNames.push(offAvgNames[i])
            }
        }
        this.setState({ validNames })
    }
    else {
        for (let i = 0; i < this.state.offAvgNames.length; i++) {
          if (this.state.offAvgNames[i] !== 'TOTAL G') {
              validNames.push(this.state.offAvgNames[i])
          }
      }
      this.setState({ validNames })
    }
    return validNames;
  } 
  getSelectedModel = (id) => {
    let selectedModelId = id;
    this.setState({ selectedModelId })
  }
  prepareDiffs = (id1, id2) => {
    if (id1 !== null && id2 !== null) {
      let offDiffNames = this.state.offAvgNames;
      let defDiffNames = this.state.defAvgNames;
      let offDiffs1 = this.state.offDiffs[id1];
      let defDiffs1 = this.state.defDiffs[id1];
      let offDiffs2 = this.state.offDiffs[id2];
      let defDiffs2 = this.state.defDiffs[id2];
      
      let awayPtsArr = [];
      let homePtsArr = [];

      for (let i = 2; i < offDiffs1.length; i++) {
        if (i < 7 || i === 16) {
          let val1 = parseFloat(offDiffs1[i].slice(0, -1));
          let val2 = parseFloat(offDiffs2[i].slice(0, -1));
          awayPtsArr.push(parseFloat((val1-val2).toFixed(1)));
          homePtsArr.push(parseFloat((val2 - val1).toFixed(1)));
        }
        else if (i < 16) {
          let val1 = parseFloat(offDiffs1[i].slice(0, -1));
          let val2 = parseFloat(defDiffs2[i].slice(0, -1));
          let val3 = parseFloat(offDiffs2[i].slice(0, -1));
          let val4 = parseFloat(defDiffs1[i].slice(0, -1));
          awayPtsArr.push(parseFloat((val1-val2).toFixed(1)));
          homePtsArr.push(parseFloat((val3 - val4).toFixed(1)));
        }
        else if ( i > 16 ) {
          let val1 = parseFloat(offDiffs1[i].slice(0, -1));
          let val2 = parseFloat(defDiffs2[i-1].slice(0, -1));
          let val3 = parseFloat(offDiffs2[i].slice(0, -1));
          let val4 = parseFloat(defDiffs1[i-1].slice(0, -1));
          awayPtsArr.push(parseFloat((val1-val2).toFixed(1)));
          homePtsArr.push(parseFloat((val3 - val4).toFixed(1)));
        }
      }
      this.score(offDiffs1[0], offDiffs2[0], awayPtsArr, homePtsArr)
    }
  }
  score = async (away, home, awayArr, homeArr) => {
    console.log( away, home, awayArr, homeArr )
    console.log(this.state.currUserModels[this.state.selectedModelId])
    const model = this.state.currUserModels[this.state.selectedModelId]
    const modelStatNames = await this.getCurrUserModels(0)
    console.log(modelStatNames)

    let awayPtsAdded = [];
    let homePtsAdded = [];
    let weight = 0;
    let awayScore = 0;
    let homeScore = 0;
    let modelIds = []

    for (let i = 0; i < awayArr.length; i++) {
      weight = model[`${modelStatNames[i]}`]
      if (weight !== 0) {
        awayPtsAdded.push(parseFloat((weight * 0.01 * awayArr[i]).toFixed(2)));
        homePtsAdded.push(parseFloat((weight * 0.01 * homeArr[i]).toFixed(2)))
        modelIds.push(i)
      }
      else {
        awayPtsAdded.push(0)
        homePtsAdded.push(0)
      }
      awayScore = awayScore + awayPtsAdded[i];
      homeScore = homeScore + homePtsAdded[i];
    }
    awayScore = parseFloat(awayScore.toFixed(2)) + this.state.avgScore;
    homeScore = parseFloat(homeScore.toFixed(2)) + this.state.avgScore;
    this.setState({ awayScore, homeScore, modelIds})
  }
  componentDidMount() {
    this.verifyUser();
    this.getOffStats();
    this.getDefStats();
    this.getAvgNames();
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
            return <BuildModel 
                      getValidModelNames={this.getValidModelNames}
                      handleModelSubmit={this.handleModelSubmit}
                      validNames={this.state.validNames}
                  />
            }}
          />
          <Route path='/model' render={() => {
            return <ModelsContainer 
                      user={this.state.currentUser}
                      verifyUser={this.verifyUser}
                      validNames={this.state.validNames}
                      selectedModelId={this.state.selectedModelId}
                      getSelectedModel={this.getSelectedModel}
                  />
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
                      offAvgNames={this.state.offAvgNames}
                      defAvgNames={this.state.defAvgNames}
                      getAvgNames={this.getAvgNames}
                      getSchoolNames={this.getAvgNames}
                      schoolNames={this.state.schoolNames}
                  />
            }}
          />
          <Route path='/differentials' render={() => {
            return <StatDiffContainer
                      offDiffs={this.state.offDiffs}
                      offDiffNames={this.state.offAvgNames}
                      defDiffs={this.state.defDiffs}
                      defDiffNames={this.state.defAvgNames}
                      getSchoolNames={this.getAvgNames}
                      schoolNames={this.state.schoolNames}
                  />
            }}
          />
          <Route path='/predictor' render={() => {
            return <GameContainer
                      schoolNames={this.state.schoolNames}
                      prepareDiffs={this.prepareDiffs}
                      selectedModelId={this.state.selectedModelId}
                  />
            }}
          />
        </Switch>
        
      </div>
    )
  }
}

export default withRouter(App)
