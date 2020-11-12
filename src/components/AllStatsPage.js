import React, { Component } from 'react'
import '../css/AllStats.css';

import * as XLSX from 'xlsx';

class AllStatsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stats: false,
            header: []
        }
    }

    readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {

            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: 'buffer'});

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const stats = XLSX.utils.sheet_to_json(ws);

                resolve(stats);
            }

            fileReader.onerror = ((error) => {
                reject(error);
            })
        });
        
        promise.then((stats) => {

            const headerArr = [];
            for (const[key] of Object.entries(stats[0])) {
                headerArr.push(key)
            }
            this.setState({ header: headerArr })

            let tempTeamStats = [];
            let statArr = []
            for (let i = 0; i < stats.length; i++) {
                for (const[key, value] of Object.entries(stats[i])) {
                    tempTeamStats.push(value)
                }
                statArr[i] = tempTeamStats;
                tempTeamStats = [];
            }
            this.setState({ stats: statArr })
        })
    }
    render () {
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