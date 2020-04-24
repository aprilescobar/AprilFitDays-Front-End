import React from 'react'
import { Link } from 'react-router-dom'

class Signup extends React.Component {
    state = {
        name: '',
        username: '',
        password: '',
        confirmp: '',
        img_url: 'http://tny.im/lCD'
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        const {password, confirmp} = this.state
        if ((password === confirmp)){
            this.createUser()
        } else {
            alert("Passwords don't match foo")
        }
    }
    
    createUser = () => {
        const {name, username, password, img_url} = this.state

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ name, username, password, img_url})
        })
        .then(res => res.json())
        .then( response => {
            if(response.errors){
              alert(response.errors)
            } else {
              // send user somewhere
              // storing the user object SOMEWHERE
            //   this.props.setUser(response)
            console.log("success")
            }
        })
    }


    render () {
        return (
            <div className="auth">
                <h2>Sign Up</h2>
                <div className="authform">
                <form onSubmit={this.handleSubmit}>
                    <input className="input-group input-group-sm" type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" /><br />
                    <input className="input-group input-group-sm" type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" /><br />
                    <input className="input-group input-group-sm" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" /><br />
                    <input className="input-group input-group-sm" type="password" name="confirmp" value={this.state.confirmp} onChange={this.handleChange} placeholder="Confirm Password" /><br />
                    <input className="btn btn-secondary" type="submit" value="Submit" />
                </form><br/>
                    Already have an account? ➤<Link to="/login" className="link"> Login </Link>
                </div>
            </div>
        )
    }
}

export default Signup