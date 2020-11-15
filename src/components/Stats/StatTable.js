import React, { Component } from 'react'


class StatTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            schoolNames: []
        }

    }
    handleSearchChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          search: value
        })
    }
    componentDidMount () {
        let schoolNames = [];
        for (let i = 0; i < this.props.stats.length; i++) {
            schoolNames.push(this.props.stats[i][0].toLowerCase())
        }
        this.setState({ schoolNames })
    }
    render() {
        console.log(this.state.schoolNames)
        return (
            <div>
                <form>
                    <h4>Search Team:</h4>
                    <input 
                        id='search'
                        type='text'
                        value={this.state.search}
                        onChange={this.handleSearchChange}
                    />
                </form>
                <div id='stats-div'>
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
                                        (this.state.search.length === 0 || this.state.schoolNames[id].includes(this.state.search)) &&
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
            </div>
        )
    }
}

export default StatTable;