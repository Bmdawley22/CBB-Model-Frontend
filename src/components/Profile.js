import React, { Component } from 'react'

import '../css/Auth.css';

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div id='profile'>
                <h1>Profile</h1>
                <div>
                    <h3>Username: {this.props.currentUser.username}</h3>
                    <h3>Email: {this.props.currentUser.email}</h3>
                </div>
            </div>
        )
    }
}

export default Profile