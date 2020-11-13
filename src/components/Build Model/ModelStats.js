import React from 'react'

import StatWeight from './StatWeight'

const ModelStats = (props) => {
    return (
        <div id='model-stats-component-wrapper'>
            <h2>Model Stats</h2>
            {props.modelStatNames.length > 0 &&
                <div>
                    <form id='added-stat-wrapper' onSubmit={(e) => props.handleModelSubmit(e)}>  
                        {props.modelStatNames.map((modelStatName, id) => (
                            <div className='added-stat' key={id}>
                                <StatWeight statName={modelStatName} />
                                <button onClick={() => props.handleRemove(id)}>Remove</button>
                            </div>
                        ) )}
                        <input type='Submit' value='Comfirm Model' />
                    </form>
                </div>
            }
        </div>
    )
}

export default ModelStats;