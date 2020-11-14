import React, { Component } from 'react';

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
            <div>
                <button onClick={this.changeToOffense}>Offense Stats</button>
                <button onClick={this.changeToDefense}>Defensive Stats</button>
                {this.state.statsToShow === 'offense' &&
                    <StatTable
                        stats={this.props.offStats}
                        statNames={this.props.offStatNames}
                    />
                }
                {this.state.statsToShow === 'defense' &&
                    <StatTable
                        stats={this.props.offStats}
                        statNames={this.props.offStatNames}
                    />
                }
            </div>
        )
    }
}

export default StatContainer