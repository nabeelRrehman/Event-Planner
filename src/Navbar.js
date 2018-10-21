import React from 'react'
import {
    Link
} from 'react-router-dom'


const Navbar = () => (

    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/signup'>SignUp</Link></li>
        <li>
        <Link to='/color/250/250/250'>Pink</Link>
        </li>
        <li>
        <Link to='/color/0/0/0'>Blue</Link>
        </li>
        <li>
        <Link to='/color/150/120/160'>Red</Link>
        </li>

    </ul>
)

export default Navbar