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
            offStatNames: [],
            defStatAverages: [],
            defStatNames: []
        }
    }
    changeToOffense = () => {
        this.setState({ statsToShow: 'offense'})
    }
    changeToDefense = () => {
        this.setState({ statsToShow: 'defense'})
    }
    componentDidMount() {
        let offStatAverages = [];
        let offStatNames = [];
        for (const [key, value] of Object.entries(this.props.offStatAverages)) {
            offStatAverages.push(value);
            offStatNames.push(key);
        }
        this.setState({ offStatAverages, offStatNames})

        let defStatAverages = [];
        let defStatNames = [];
        for (const [key, value] of Object.entries(this.props.offStatAverages)) {
            defStatAverages.push(value);
            defStatNames.push(key);
        }
        this.setState({ defStatAverages, defStatNames})
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
                <div>
                    <StatAverages 
                        offStatAverages={this.state.offStatAverages}
                        offStatNames={this.state.offStatNames}
                        defStatAverages={this.state.defStatAverages}
                        defStatNames={this.state.defStatNames}
                        statsToShow={this.state.statsToShow}
                    />
                </div>
                {this.state.statsToShow === 'offense' &&
                    <div>
                        <h2>Offensive Per Game Stats</h2>
                        <StatTable
                            stats={this.props.offStats}
                            statNames={this.props.offStatNames}
                        />
                    </div>
                }
                {this.state.statsToShow === 'defense' &&
                    <div>
                        <h2>Defensive Per Game Stats</h2>
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