import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Containers/Home'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import ListPpages from './Containers/ListPages'

class App extends React.Component{

  state ={
    currentUser: 1,
  }

  setUser = user => {
    this.setState({
      currentUser: user.id,
      userName: user.name
      }, () => this.props.history.push("/home"))
  }

  openApp = () => {
    return (
      <div>
          <Navbar handleLogout={this.handleLogout} userName={this.state.userName} />
          <ListPpages {...this.state}/>
        <Switch>
          <Route path='/home' component={Home} />
        </Switch>
      </div>
    )
  }

  accessApp = () => {
    return (
    <div>
      <Switch>
          <Route path='/signup' render={() => <SignUp setUser={this.setUser}/>} />
          <Route path='/' render={() => <Login setUser={this.setUser} />} />
      </Switch>
    </div>
    )
  }

  handleLogout = () => {
    this.setState({currentUser: ""}, () => this.props.history.push("/login"))
  }

  render () {
    // console.log("inside App.js", this.state)
    return (
      <div>
        {(this.state.currentUser !== "") ? this.openApp() : this.accessApp()}
      </div>
    )
  }
}

export default App