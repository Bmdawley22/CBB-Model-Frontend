import React, { Component } from 'react';

import '../../css/Predictor.css'

class GameContainer extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            team1: '',
            team2: '',
            diffId1: null,
            diffId2: null,
            actualAScore: '',
            actualHScore: ''
        }
    }
    onInput = (e) => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        })
        this.getTeamNames(name, value)
    }
    getTeamNames = (team1or2, value) => {
        let schoolNames = this.props.schoolNames;
        let diffId1 = this.state.diffId1;
        let diffId2 = this.state.diffId2;

        for (let i = 0; i < schoolNames.length; i++) {
            if (value.toLowerCase() === schoolNames[i]) {
                if (team1or2 === 'team1') {
                    diffId1 = i;
                    this.setState({ diffId1 })
                    i = schoolNames.length;
                }
                else {
                    diffId2 = i;
                    this.setState({ diffId2 })
                    i = schoolNames.length;
                }
            }
            else {    
                if (team1or2 === 'team1') {
                    if( diffId1 !== null) {
                        diffId1 = null;
                       this.setState({ diffId1 })
                    }
                } 
                else {
                    if( diffId2 !== null) {
                        diffId2 = null;
                       this.setState({ diffId2 })
                    }
                }
            }
        }
        this.props.prepareDiffs(diffId1, diffId2)
    }
    componentDidMount() {
    }
    render () {
        return (
            <div>
                <h1>Game Predictor</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>Enter Teams</th>
                            <th>Enter Score</th>
                            <th>Predicted Score</th>
                            {this.props.statNames.map((name, id) => (
                                this.props.modelIds.includes(id-1) &&
                                    <th key={id}>{name}</th>
                                
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Away Team</td>
                            <td>
                                <input 
                                    type='text'
                                    name='team1'
                                    value={this.state.team1}
                                    onChange={this.onInput}
                                />
                            </td>
                            <td>
                                <input 
                                    type='text'
                                    name='actualAscore'
                                    value={this.state.actualAScore}
                                    onChange={this.onInput}
                                />
                            </td>
                            {this.props.awayScore && <td>{this.props.awayScore}</td> }
                            {this.props.awayPtsAdded && this.props.awayPtsAdded.map((val, id) => (
                                this.props.modelIds.includes(id) &&
                                <td key={id}>{val}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>Home Team</td>
                            <td>
                                <input 
                                    type='text'
                                    name='team2'
                                    value={this.state.team2}
                                    onChange={this.onInput}
                                />
                            </td>
                            <td>
                                <input 
                                    type='text'
                                    name='actualHscore'
                                    value={this.state.actualHScore}
                                    onChange={this.onInput}
                                />
                            </td>
                            { this.props.homeScore && <td>{this.props.homeScore}</td> }
                            {this.props.homePtsAdded && this.props.homePtsAdded.map((val, id) => (
                                this.props.modelIds.includes(id) &&
                                <td key={id}>{val}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default GameContainer