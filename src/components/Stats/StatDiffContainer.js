import React, { Component } from 'react';

import '../../css/Stats.css';

import StatAverages from './StatAverages';
import StatTable from './StatTable';

class StatDiffContainer extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            statsToShow: 'offense',
            nameSetCheck: false,
            offDiffNames: [],
            defDiffNames: []
        }
    }
    changeToOffense = () => {
        this.setState({ statsToShow: 'offense'})
    }
    changeToDefense = () => {
        this.setState({ statsToShow: 'defense'})
    }
    addSchoolToNames = (namesArr, oCheck) => {
        if (oCheck === 'o') {
            let offDiffNames = namesArr;
            offDiffNames.unshift('School')
            this.setState({ offDiffNames })
            localStorage.offDiffNames = [offDiffNames];
        }
        else {
            let defDiffNames = namesArr;
            defDiffNames.unshift('School')
            this.setState({ defDiffNames })
            localStorage.defDiffNames = [defDiffNames];
        }
    }
    componentDidMount() {
        this.addSchoolToNames(this.props.offDiffNames, 'o')
        this.addSchoolToNames(this.props.defDiffNames)
    }
 
    render () {
        return (
            <div id='stat-container'>
                <div id='buttons'>
                    <button 
                        onClick={this.changeToOffense}
                        id={this.state.statsToShow === 'offense' && 'active' }
                    >Offensive Differentials</button>
                    <button 
                        onClick={this.changeToDefense}
                        id={this.state.statsToShow === 'defense' && 'active' }
                    >Defensive Differentials</button>
                </div>
                {this.state.statsToShow === 'offense' && 
                    <div>
                        <h2>Offensive Stat Differentials</h2>
                        <StatTable
                            stats={this.props.offDiffs}
                            statNames={this.state.offDiffNames}
                            getSchoolNames={this.props.getSchoolNames}
                            schoolNames={this.props.schoolNames}
                        />
                    </div>
                }
                {this.state.statsToShow === 'defense' &&
                    <div>
                        <h2>Defensive Stat Differentials</h2>
                        <StatTable
                            stats={this.props.defDiffs}
                            statNames={this.state.defDiffNames}
                            getSchoolNames={this.props.getSchoolNames}
                            schoolNames={this.props.schoolNames}
                        />
                    </div>
                }
            </div>     
        )
    }
}

export default StatDiffContainer