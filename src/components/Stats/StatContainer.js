import React, { Component } from 'react';

import '../../css/Stats.css';

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