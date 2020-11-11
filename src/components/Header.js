import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = (props) => {
    return (
        <header>
            <h1>NCAAM Model Generator</h1>
            {props.loggedIn &&
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
                            <img src='../../../images/bball' alt='basketball'/>
                            <p>username</p>
                        </div>
                    </Link>
                </nav>
            }
        </header>
    );
}

export default Header