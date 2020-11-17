import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

import StatList from './StatList';
import ModelStats from './ModelStats';

import '../../css/BuildModel.css'


class BuildModel extends Component {
    constructor(props){
        super(props);

        this.state = {
            validNames: this.props.validNames,
            modelStatNames: [],
        }
    }
    handleAdd = (id) => {
        let modelStatNames = this.state.modelStatNames;
        modelStatNames.push(this.state.validNames[id])
        this.setState({ modelStatNames })
        let validNames = [];
        for (let i = 0; i < this.state.validNames.length; i++) {
            if (i !== id) {
                validNames.push(this.state.validNames[i])
            }
        }
        this.setState({ validNames })
    }
    handleRemove = (id) => {
        let validNames = this.state.validNames;
        validNames.push(this.state.modelStatNames[id])
        this.setState({ validNames})
        let modelStatNames = []
        for( let i = 0; i < this.state.modelStatNames.length; i++) {
            if(i !== id) {
                modelStatNames.push(this.state.modelStatNames[i])
            }
        }
        this.setState({ modelStatNames })
    }

    componentDidMount() {
        let validNames = this.props.getValidModelNames();
        this.setState({ validNames })
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
                    handleModelSubmit={this.props.handleModelSubmit}
                />
            </div>
        )
    }
}

export default withRouter(BuildModel)