import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Auth.css';

class SignupForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          email: "",
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
                onSubmit={(e) => this.props.handleSignup(e, this.state)}
            >
                <div className='auth-input'>
                    <p>Username:</p> 
                    <input
                        type="text"
                        name="username"
                        placeholder='Enter Username'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </div>
                <div className='auth-input'>
                    <p>Email:</p> 
                    <input
                        type="text"
                        name="email"
                        placeholder='Enter Email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>
                <div className='auth-input'>
                    <p>Password:</p> 
                    <input
                        type="password"
                        name="password"
                        placeholder='Enter Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <input id='signup' type="submit" value="Signup!" />
            </form>
        )
    }
}

export default SignupForm