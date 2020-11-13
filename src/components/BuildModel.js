import React, { Component } from 'react'
import StatList from './StatList'

import { getAllStats } from '../services/api_helper';


class BuildModel extends Component {
    constructor(props){
        super(props);

        this.state = {
            validNames: [],
            modelStatNames: [],
        }
    }
    filterValidNames = async () => {

        let stats = await getAllStats();
        stats = stats.data;

        let excludeNames = ['id','createdAt','updatedAt','school', 'Total_G','Total_W', 'Total_L','Conf_W', 'Conf_L', 'Home_W', 'Home_L','Away_W','Away_L']
        let validNames = [];
        for (const [key] of Object.entries(stats[0])) {
            if(!excludeNames.includes(key)) {
                validNames.push(key);
            }
        }
        this.setState({ validNames })
    }
    handleAdd = (id) => {
        let modelStatNames = this.state.modelStatNames;
        modelStatNames.push(this.state.validNames[id])
        this.setState({ modelStatNames })
    }

    componentDidMount () {
        this.filterValidNames();
    }
    render () {
        console.log(this.state.modelStatNames)
        return (
            <div>
                <div>
                    <h3>Choose from Available Stats</h3>
                    <StatList statNames={this.state.validNames} handleAdd={this.handleAdd} />
                </div>
                
            </div>
        )
    }
}

export default BuildModel