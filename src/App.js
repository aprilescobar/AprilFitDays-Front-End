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
    this.setState({currentUser: user.id}, () => this.props.history.push("/home"))
  }

  render () {
    console.log("inside App.js", this.state)
    return (
      <div>
          <Navbar />
          <ListPpages {...this.state}/>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/signup' render={() => <SignUp setUser={this.setUser}/>} />
          <Route path='/login' render={() => <Login setUser={this.setUser}/>} />
        </Switch>
      </div>
    )
  }
}

export default App