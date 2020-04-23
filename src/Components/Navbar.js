import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <h3>Navbar</h3>
            <Link to="/home">Home</Link><br/>
            <Link to="/signup">Sign Up</Link><br/>
            <Link to="/login">Login</Link><br/>
            <Link to="/workouts">Public Library</Link><br/>
            <Link to="/myworkouts">Personal Library</Link><br/>
        </div>
    )
}

export default Navbar