import React, { Component } from 'react'

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div>
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