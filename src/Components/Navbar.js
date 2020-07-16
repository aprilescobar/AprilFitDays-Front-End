import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = props => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark nav-style">
        <Link to="/" className="navbar-brand">AprilFitDays</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <Link to="/myworkouts" className="nav-link">Favorites</Link>
            </li>
            <li className="nav-item">
            <Link to="/workouts" className="nav-link">Library</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Create
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/workouts/new" className="dropdown-item">Workout</Link>
              </div>
            </li>
          </ul>
          <nav className="navbar navbar-dark bg-dark nav-text">
            <span className="navbar-text">
              Did you workout today {props.userName}?
            </span>
          </nav>
          <Link to="/login" className="btn btn btn-dark my-2 my-sm-0" onClick={props.handleLogout}>Logout</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar