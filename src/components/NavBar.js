import React from 'react'
import { Link } from 'react-router-dom';

import '../css/NavBar.css';


const NavBar = (props) => {
    return (
        <div>
            {props.loggedIn &&
                <div id='navbar'>
                    <Link to='/allStats' className='nav-link'>All Team Stats</Link>
                    <Link to='/differentials' className='nav-link'>Stat Differentials</Link>
                    <Link to='/predictor' className='nav-link'>Game Predictor</Link>
                    <Link to='/history' className='nav-link'>Game History</Link>
                </div>
            }
        </div>
    )
}

export default NavBar