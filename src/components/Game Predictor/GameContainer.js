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
        if (name === 'team1' || name === 'team2') {
            this.getTeamNames(name, value)    
        }
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
    componentWillUnmount () {
        this.props.resetGameData();
    }
    render () {
        return (
            <div id={this.props.awayPtsAdded.length > 0 ? 'container-wrapper' : 'input-wrapper'}>
                <h1>Game Predictor</h1>
                <div id='header'>
                    <p  className={this.props.awayPtsAdded.length > 0 ? 'header game' : 'input'}>Game</p>
                    <p  className={this.props.awayPtsAdded.length > 0 ? 'header teams' : 'input teams'}>Enter Teams</p>
                    {this.props.awayScore && <p  className='header score score-header'>Game Score</p> }
                    {this.props.awayScore && <p className='header pred-score pred-score-header'>Predicted Score</p> }
                    {this.props.statNames.map((name, id) => (
                        this.props.modelIds.includes(id-1) &&
                            <p className='header model' key={id}>{name}</p>
                    ))}
                </div>
                <div id='away-body'>
                    <p className={this.props.awayPtsAdded.length > 0 ? 'data game' : 'input'}>Away Team</p>
                    <input 
                        className={this.props.awayPtsAdded.length > 0 ? 'data teams' : 'input'}
                        type='text'
                        name='team1'
                        placeholder='Enter Away Team'
                        value={this.state.team1}
                        onChange={this.onInput}
                    />
                    {this.props.awayScore && 
                        <input 
                            className={this.props.awayPtsAdded.length > 0 ? 'data score' : 'input'}
                            type='text'
                            name='actualAScore'
                            placeholder='Enter Away Score'
                            value={this.state.actualAScore}
                            onChange={this.onInput}
                        />
                    }
                    {this.props.awayScore &&  <p className='data pred-score'>{this.props.awayScore}</p> }
                    {this.props.awayPtsAdded && this.props.awayPtsAdded.map((val, id) => (
                        this.props.modelIds.includes(id) &&
                        <p key={id} className='data model'>{val}</p>
                    ))}
                </div>
                <div id='home-body'>
                    <p className={this.props.awayPtsAdded.length > 0 ? 'data game' : 'input'}>Home Team</p>
                    <input 
                        className={this.props.awayPtsAdded.length > 0 ? 'data teams' : 'input'}
                        type='text'
                        name='team2'
                        placeholder='Enter Home Team'
                        value={this.state.team2}
                        onChange={this.onInput}
                    />
                    {this.props.awayScore && 
                        <input
                            className={this.props.awayPtsAdded.length > 0 ? 'data score' : 'input'}
                            type='text'
                            name='actualHScore'
                            placeholder='Home Score'
                            value={this.state.actualHScore}
                            onChange={this.onInput}
                        />
                    }
                    {this.props.homeScore && <p className='data pred-score'>{this.props.homeScore}</p> }
                    {this.props.homePtsAdded && this.props.homePtsAdded.map((val, id) => (
                        this.props.modelIds.includes(id) &&
                        <p key={id} className='data model'>{val}</p>
                    ))}
                </div>
                
             
            </div>
        )
    }
}

export default GameContainer