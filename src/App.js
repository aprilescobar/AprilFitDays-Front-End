import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Containers/Home'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import ListPpages from './Containers/ListPages'

class App extends React.Component{

  state ={
    currentUser: ""
  }

  componentDidMount() {
    if (localStorage.userId) {
      const id = parseInt(localStorage.userId)
      this.setState({
        currentUser: id,
        userName: localStorage.userName
      })
    }
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setUser = user => {
    this.setState({
      currentUser: user.id,
      userName: user.name
      }, () => {
        localStorage.userId = user.id
        localStorage.userName = user.name
        this.props.history.push("/")
      })
  }

  openApp = () => {
    return (
      <div>
        <div className="fixed-bottom">Footer</div>
          <Navbar handleLogout={this.handleLogout} userName={this.state.userName} />
          <ListPpages history={this.props.history} {...this.state}/>
        <Switch>
          <Route exact path='/' render={() => <Home {...this.state}/>} />
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
    this.setState({currentUser: ""}, () => {
      localStorage.removeItem("userId")
      localStorage.removeItem("userName")
      this.props.history.push("/login")
    })
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