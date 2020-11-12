import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = (props) => {
    return (
        <header>
            <h1>NCAAM Model Generator</h1>
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
                        <div>
                            <img src='../../images/bball.png' alt='basketball'/>
                            <p>{props.currentUser.username}</p>
                        </div>
                    </Link>
                    <button onClick={props.handleLogout}>Logout</button>
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