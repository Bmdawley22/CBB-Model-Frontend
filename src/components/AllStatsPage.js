import React, { Component } from 'react'
import '../css/AllStats.css';

import * as XLSX from 'xlsx';
import { getAllStats } from '../services/api_helper';
import { constants } from 'buffer';

class AllStatsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stats: false,
            header: []
        }
    }

    getStats = async () => {
        let stats = await getAllStats();
        stats = stats.data;

        console.log(stats)

        const headerArr = [];
        for (const [key] of Object.entries(stats[0])) {
            console.log(typeof(key))
            if ( key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
                headerArr.push(key)
            }  
        }
        this.setState({ header: headerArr })

        let tempTeamStats = [];
        let statArr = []
        for (let i = 0; i < stats.length; i++) {
            for (const [key, value] of Object.entries(stats[i])) {
                if ( key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
                    tempTeamStats.push(value)
                }
            }
            statArr[i] = tempTeamStats;
            tempTeamStats = [];
        }
        this.setState({ stats: statArr })
    }

    componentDidMount() {
        this.getStats();

    }
    render() {
        return (
            <div id='allstats-div'>
                <input
                    type='file'
                    onChange={(e) => {
                        const file = e.target.files[0];
                        this.readExcel(file)
                    }}
                />

                {this.state.stats &&
                    <div id='table-wrapper'>
                        <table>
                            <thead>
                                <tr id='table-header'>
                                    {this.state.header.map((header, id) => {
                                        return <th
                                            key={id}
                                            className={id === 0 ?
                                                'school-header'
                                                :
                                                'table-headers'
                                            }
                                        >{header}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.stats.map((team, id) => (
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

export default AllStatsPage