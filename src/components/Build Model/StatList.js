import React from 'react'

const StatList = (props) => {
    return (
        <ul id='stat-ul'>
            {props.statNames && props.statNames.map((statName, id) => (
                <div key={id} className='available-stat'>
                    <li>{statName}</li>
                    <button onClick={() => props.handleAdd(id)}>Add Stat to Model</button>
                </div>
            ))}
        </ul>
    )
}

export default StatList