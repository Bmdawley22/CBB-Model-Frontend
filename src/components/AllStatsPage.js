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
            console.log(stats)

            const headerArr = [];
            for (const[key, value] of Object.entries(stats[0])) {
                headerArr.push(key)
            }
            this.setState({ header: headerArr })

            const tempTeamStats = [];
            for (let i = 0; i < 2; i++) {
                for (const[key, value] of Object.entries(stats[i])) {
                    tempTeamStats.push(value)
                }
                console.log(tempTeamStats)
            }
        
        })
    }
    render () {
        return (    
            <div>
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
                                <tr id='header'>
                                    {this.state.header.map((header, id) => {
                                        return <th key={id}>{header}</th>
                                    })}
                                </tr>
                            </table>
                        </div>
                    }
              
            </div>
        )
    }
}

export default AllStatsPage