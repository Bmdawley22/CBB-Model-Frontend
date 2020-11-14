import React, { Component } from 'react'
import '../../css/StatTable.css';

class StatTable extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div id='allstats-div'>
                {this.props.stats &&
                    <div id='table-wrapper'>
                        <table>
                            <thead>
                                <tr id='table-header'>
                                    {this.props.statNames.map((statName, id) => {
                                        return <th
                                            key={id}
                                            className={id === 0 ?
                                                'school-header'
                                                :
                                                'table-headers'
                                            }
                                        >{statName}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.stats.map((team, id) => (
                                    <tr key={id}>
                                        {team.map((stat, id) => (
                                            <td
                                                key={id}
                                                className={id === 0 ?
                                                    'school-cell'
                                                    :
                                                    'cells'
                                                }
                                            >{stat}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }

            </div>
        )
    }
}

export default StatTable;