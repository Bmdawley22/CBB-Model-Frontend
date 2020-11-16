import React, { Component } from 'react';

import '../../css/Stats.css';

import StatAverages from './StatAverages';
import StatTable from './StatTable';

class StatContainer extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            statsToShow: 'offense',
            offStatAverages: [],
            offAvgNames: [],
            defStatAverages: [],
            defAvgNames: []
        }
    }
    changeToOffense = () => {
        this.setState({ statsToShow: 'offense'})
    }
    changeToDefense = () => {
        this.setState({ statsToShow: 'defense'})
    }
    formatAvg = () => {
        let offStatAverages = [];
        for (const [key, value] of Object.entries(this.props.offStatAverages)) {
            offStatAverages.push(value);
        }
        this.setState({ offStatAverages})

        let excludeNames = ['SCHOOL', 'CONF W', 'CONF L', 'HOME W', 'HOME L','AWAY W','AWAY L'];
        let offAvgNames = [];
        
        for (let i = 0; i < this.props.offStatNames.length; i++) {
            if(!excludeNames.includes(this.props.offStatNames[i])) {
                offAvgNames.push(this.props.offStatNames[i])
            }
        }
        this.setState({ offAvgNames })

        let defStatAverages = [];
        for (const [key, value] of Object.entries(this.props.defStatAverages)) {
            defStatAverages.push(value);
        }
        this.setState({ defStatAverages })

        let excludeNamesDef = ['SCHOOL', 'CONF W', 'CONF L', 'HOME W', 'HOME L','AWAY W','AWAY L', ];
        let defAvgNames = [];
        
        for (let i = 0; i < this.props.defStatNames.length; i++) {
            if(!excludeNamesDef.includes(this.props.defStatNames[i])) {
                defAvgNames.push(this.props.defStatNames[i])
            }
        }
        this.setState({ defAvgNames })
    }
    componentDidMount() {
        this.formatAvg();
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
                        {this.state.offStatAverages.length === 0 ?
                            <button className='show-avg' onClick={this.formatAvg}>Show Averages</button>
                        :
                            <StatAverages 
                                averages={this.state.offStatAverages}
                                names={this.state.offAvgNames}
                            />
                        }
                        <StatTable
                            stats={this.props.offStats}
                            statNames={this.props.offStatNames}
                        />
                    </div>
                }
                {this.state.statsToShow === 'defense' &&
                    <div>
                        <h2>Defensive Per Game Stats</h2>
                        {this.state.defStatAverages.length === 0 ?
                            <button className='show-avg' onClick={this.formatAvg}>Show Averages</button>
                        :
                            <StatAverages 
                                averages={this.state.defStatAverages}
                                names={this.state.defAvgNames}
                            />
                        }
                        <StatTable
                            stats={this.props.defStats}
                            statNames={this.props.defStatNames}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default StatContainer