import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Auth.css';

class LoginForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          password: ""
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
            <form
                className='auth-form' 
                onSubmit={(e) => this.props.handleLogin(e, this.state)}
            >

                Username: <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                Password:<input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <input type="submit" value="Login!" />
                <Link to="/">Home</Link>
            </form>
        )
    }
}

export default LoginForm