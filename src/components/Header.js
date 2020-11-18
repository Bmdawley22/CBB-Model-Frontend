import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = (props) => {
    return (
        <header>
            <Link id='title' to='/'><h1>NCAAM Model Generator</h1></Link>
            {props.currentUser ?
                <nav id='model-nav'>
                    <Link 
                        className='model-link' 
                        to='/build-model'
                    >
                        Build Model
                    </Link>
                    <Link 
                        className='model-link'
                        to='/model'
                    >
                        Your Model
                    </Link>
                    <Link 
                        className='model-link'
                        id='profile-link' 
                        to='/profile'
                    >
                            {props.currentUser.username}
                    </Link>
                    <button id='logout' onClick={props.handleLogout}>Logout</button>
                </nav>
            :
                <nav id='model-nav'>
                    <Link to='/home' className='nav-link'>Home</Link>
                    <Link to='/signup' className='nav-link'>Signup</Link>
                    <Link to='/login' className='nav-link'>Login</Link>   
                </nav>
                  
            }
        </header>
    );
}

export default Header