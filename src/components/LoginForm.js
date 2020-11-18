import React, { Component } from 'react';
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
                <div className='input'>
                    <p>Username:</p> 
                    <input
                        type="text"
                        name="username"
                        placeholder='Enter Username'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </div>
                <div className='input'>
                    <p>Password:</p> 
                    <input
                        type="password"
                        name="password"
                        placeholder='Enter Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <input id='login' type="submit" value="Login!" />
            </form>
        )
    }
}

export default LoginForm