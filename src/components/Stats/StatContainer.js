import React, { Component } from 'react';

import '../../css/Stats.css';

import StatAverages from './StatAverages';
import StatTable from './StatTable';

class StatContainer extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            statsToShow: 'offense',
        }
    }
    changeToOffense = () => {
        this.setState({ statsToShow: 'offense'})
    }
    changeToDefense = () => {
        this.setState({ statsToShow: 'defense'})
    }
    
    componentDidMount() {
        //this.formatAvg();
    }
    render () {
        return (
            <div id='stat-container'>
                <div id='buttons'>
                    <button 
                        onClick={this.changeToOffense}
                        id={this.state.statsToShow === 'offense' && 'active' }
                    >Offense Stats</button>
                    <button 
                        onClick={this.changeToDefense}
                        id={this.state.statsToShow === 'defense' && 'active' }
                    >Defensive Stats</button>
                </div>
                    
                {this.state.statsToShow === 'offense' &&
                    <div>
                        <h2>Offensive Per Game Stats</h2>
                        {this.props.offStatAverages.length === 0 ?
                            <button className='show-avg' onClick={this.props.getAvgNames}>Show Averages</button>
                        :
                            <StatAverages 
                                averages={this.props.offStatAverages}
                                names={this.props.offAvgNames}
                            />
                        }
                        <StatTable
                            stats={this.props.offStats}
                            statNames={this.props.offStatNames}
                            getSchoolNames={this.props.getSchoolNames}
                            schoolNames={this.props.schoolNames}
                        />
                    </div>
                }
                {this.state.statsToShow === 'defense' &&
                    <div>
                        <h2>Defensive Per Game Stats</h2>
                        {this.props.defStatAverages.length === 0 ?
                            <button className='show-avg' onClick={this.props.getAvgNames}>Show Averages</button>
                        :
                            <StatAverages 
                                averages={this.props.defStatAverages}
                                names={this.props.defAvgNames}
                            />
                        }
                        <StatTable
                            stats={this.props.defStats}
                            statNames={this.props.defStatNames}
                            getSchoolNames={this.props.getSchoolNames}
                            schoolNames={this.props.schoolNames}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default StatContainer