import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = props => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <Link to="/home" className="navbar-brand">AprilFitDays</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
          <Link to="/myworkouts" className="nav-link">My Workouts</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Browse
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/workouts" className="dropdown-item">Library</Link>
              {/* <Link to="/myworkouts" className="dropdown-item">My Workouts</Link> */}
              {/* <div className="dropdown-divider"></div> */}
              {/* <Link to="/athletes" className="dropdown-item">Athletes</Link> */}
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Create
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/workouts/new" className="dropdown-item">Workout</Link>
              <Link to="/myschedule/new" className="dropdown-item">Schedule</Link>
              {/* <Link to="/myplaylist/new" className="dropdown-item">Playlist</Link> */}
              {/* <Link to="/myschedule" className="dropdown-item">My Schedule</Link>
              <Link to="/myplaylist" className="dropdown-item">My Playlist</Link>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="">Something else here</a> */}
            </div>
          </li>
        </ul>
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-text">
            Hi {props.userName}!
          </span>
        </nav>
        <Link to="/login" className="btn btn btn-dark my-2 my-sm-0" onClick={props.handleLogout}>Logout</Link>
      </div>
    </nav>
  )
}

export default Navbar