import React from 'react'

const StatList = (props) => {
    return (
        <ul>
            {props.statNames.map((statName, id) => (
                <div>
                    <li>{statName}</li>
                    <button onClick={() => props.handleAdd(id)}>Add Stat to Model</button>
                </div>
            ))}
        </ul>
    )
}

export default StatList