import React from 'react'

const StatAverages = (props) => {
    console.log(props)
    return (
        <div>
            {props.statsToShow === 'offense' && 
                <div>
                    {props.offStatAverages.map((offStat, id) => {
                        <div>
                            <h4>{props.offStatNames[id]}</h4>
                            <p>{offStat}</p>
                        </div>
                    })}
                </div>
            }
        </div>
    )
}

export default StatAverages