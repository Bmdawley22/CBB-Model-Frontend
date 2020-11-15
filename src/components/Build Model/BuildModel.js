import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

import StatList from './StatList';
import ModelStats from './ModelStats';

import { getAllOffStats, getAllDefStats } from '../../services/api_helper';

import '../../css/BuildModel.css'


class BuildModel extends Component {
    constructor(props){
        super(props);

        this.state = {
            validNames: [],
            modelStatNames: [],
            modelStatWeights: []
        }
    }
    filterValidNames = async () => {

        let offStats = await getAllOffStats();
         offStats = offStats.data;

         let defStats = await getAllDefStats();
        defStats = defStats.data;

        let excludeNames = ['id','createdAt','updatedAt','school', 'total_g','total_w', 'total_l',
                            'conf_w', 'conf_l', 'home_w', 'home_l','away_w','away_l']
        let excludeNamesDef = ['w_l_perc', 'sos', 'srs',]
        let validNames = [];
        for (const [key] of Object.entries(offStats[0])) {
            if(!excludeNames.includes(key)) {
                validNames.push(key.toUpperCase());
            }
        }
        for (const [key] of Object.entries(defStats[0])) {
            if(!excludeNames.includes(key) && !excludeNamesDef.includes(key)) {
                validNames.push(key.toUpperCase());
            }
        }
        this.setState({ validNames })
    }
    handleAdd = (id) => {
        let modelStatNames = this.state.modelStatNames;
        modelStatNames.push(this.state.validNames[id])
        this.setState({ modelStatNames })
    }
    handleRemove = (id) => {
        let temp = []
        for( let i = 0; i < this.state.modelStatNames.length; i++) {
            if(i !== id) {
                temp.push(this.state.modelStatNames[i])
            }
        }
        this.setState({ modelStatNames: temp })
    }
    handleModelSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        let temp = [];
        for (let i = 0; i < e.target.length - 1; i = i + 2) {
            temp.push(e.target[i].valueAsNumber);
        }
        this.setState({ modelStatWeights: temp})
    }
    
    componentDidMount () {
        this.filterValidNames();
    }
    render () {
        return (
            <div id='build-model-wrapper'>
                <div id='stat-list-wrapper'>
                    <h3>Choose from Available Stats</h3>
                    <StatList statNames={this.state.validNames} handleAdd={this.handleAdd} />
                </div>
                <ModelStats 
                    modelStatNames={this.state.modelStatNames}
                    handleRemove={this.handleRemove}
                    handleModelSubmit={this.handleModelSubmit}
                />
            </div>
        )
    }
}

export default withRouter(BuildModel)