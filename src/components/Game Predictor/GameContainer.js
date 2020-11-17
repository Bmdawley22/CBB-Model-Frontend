import React, { Component } from 'react';

import '../../css/Predictor.css'

class GameContainer extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            team1: '',
            team2: '',
            diffId1: null,
            diffId2: null
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
                <div id='away-input'>
                    <h4>Away Team:</h4>
                    <input 
                        type='text'
                        name='team1'
                        value={this.state.team1}
                        onChange={this.onInput}
                    />
                </div>
                <div id='home-input'>
                    <h4>Home Team:</h4>
                    <input 
                        type='text'
                        name='team2'
                        value={this.state.team2}
                        onChange={this.onInput}
                    />
                </div>
            </div>
        )
    }
}

export default GameContainer