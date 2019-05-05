import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <ul>
            <li><NavLink to='/signin'>Login</NavLink></li>
            <li><NavLink to='/register'>Register</NavLink></li>
            <li><NavLink to='/loginAsAdmin'>Admin</NavLink></li>
        </ul>
    );
}

export default SignedOutLinks;