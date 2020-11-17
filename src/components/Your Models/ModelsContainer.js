import React, { Component } from 'react';
import { verifyUser, getUserModels } from '../../services/api_helper';

import '../../css/Models.css';

class ModelsContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedModelVals: [],
            currUserId: null,
            currModels: [],
        }
    }
    getUserId = async () => {
        const resp = await verifyUser();
        if (resp) {
            let currUserId = resp.id;
            this.setState({ currUserId })

            this.getUserModels( currUserId )
        } 
    }
    getUserModels = async (id) => {
        const currModels = await getUserModels(id)
        if (currModels) {
            this.setState({ currModels })
            this.getVals(currModels[this.props.selectedModelId])
        }
    }
    
    getVals = (obj) => {
        const selectedModelVals = [];
        if ( typeof(obj) === 'object' ) {
            for (const [key, value] of Object.entries(obj)) {
                if ( key !== 'id' && key !== 'user_id' && key !== 'createdAt' && key !== 'updatedAt') {
                    selectedModelVals.push(value)
                }
            }
            this.setState({ selectedModelVals })
        }
    }
    selectModel = (e) => {
        e.preventDefault();
        let modelId = e.target.value-1;
        this.getVals(this.state.currModels[modelId])
        this.props.getSelectedModel(modelId);
    }
    componentDidMount () {
        this.getUserId();
    }
    render () {
        return (
            <div id='models-container'>
                <h1>{this.props.user.username}'s Models</h1>
                {this.state.currModels.length !== 0 &&
                    <div id='select-bar'>
                        <h3>Select Model:</h3>
                        <select id='model-select'onChange={(e) => this.selectModel(e)}>
                            {this.state.currModels.map((model, id) => (
                                id === this.props.selectedModelId ? 
                                    <option  selected key={id} value={id+1}>{id+1}</option>
                                :
                                    <option  key={id} value={id+1}>{id+1}</option>
                            ))}
                        </select>
                    </div>
                }
                {this.state.currModels.length > 0 && 
                    <div id='model-show'>
                        {this.state.selectedModelVals.map((value, id) => (
                            value !== 0 && 
                                <div className='model-value' key={id}>
                                    <h4>{this.props.offAvgNames[id+1]}</h4>
                                    <p>{value}</p>
                                </div>
                            
                        ))}
                    </div>
                }    
            </div>
        )
    }
}

export default ModelsContainer