import React, { Component } from 'react'

class StatName extends Component {
    constructor (props) {
        super(props)
        this.state = {
            weight: 0
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        })
    }
    render () {
        return (
            <div>
                <h3>{this.props.statName}</h3>
                <input className='model-input'
                    type='number'
                    name='weight'
                    value={this.state.weight}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

export default StatName