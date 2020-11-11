import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css';

const Home = () => {
    return (
        <div id='home'>
            <h1>Welcome to the NCAAM Model Generator</h1>
            <h3>
                <Link to='/signup'>Signup</Link> or <Link to='login'>Login</Link> to get started building your own model and predict college basketball outcomes!
            </h3>
        </div>
    )
}

export default Home