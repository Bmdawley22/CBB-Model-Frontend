import React from 'react';

const StatAverages = (props) => {
    return (
        <div>
            {props.averages.length > 0 && 
                <div>
                    <h3>Averages</h3>
                    <div id='averages'>
                        {props.averages.map((average, id) => (
                            <div className='average' key={id}>
                                <h4>{props.names[id]}</h4>
                                <p>{average}</p> 
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default StatAverages;
