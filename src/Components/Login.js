import React from 'react'
import { Link } from 'react-router-dom'

class Login extends React.Component {

    state ={
        username: '',
        password: '',
        users: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(users => this.setState({users}))
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        const currentUser = this.state.users.find(user => user.username === this.state.username)
        if (currentUser) {
            if (currentUser.password === this.state.password){
                this.props.setUser(currentUser)
            } else {
                alert("Can't find username/password combo")
            }
        } else {
            alert("Can't find username/password combo")
        }

    }

    render () {
        return (
            <div className="login">
                <h2>Login</h2>
                <div className="authform">
                <form onSubmit={this.handleSubmit}>
                    <input className="input-group input-group-sm" type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" /><br />
                    <input className="input-group input-group-sm" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" /><br />
                    <input className="btn btn-secondary" type="submit" value="Submit" />
                </form><br/>
                Are you new? ➤ <Link to="/signup" className="link">Sign Up </Link>
                </div>                 
            </div>
        )
    }
}

export default Login