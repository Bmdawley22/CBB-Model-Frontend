import React from 'react';

const StatAverages = (props) => {
    console.log(props)
    return (
        <div id='averages'>
            {props.averages.map((average, id) => (
                <div className='average'>
                    <h4>{props.names[id]}</h4>
                    <p>{average}</p> 
                </div>
            ))}
        </div>
    )
}

export default StatAverages;
