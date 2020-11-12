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

                Username: <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                Email: <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                Password:<input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <input type="submit" value="Signup!" />
                <Link to="/">Home</Link>
            </form>
        )
    }
}

export default SignupForm