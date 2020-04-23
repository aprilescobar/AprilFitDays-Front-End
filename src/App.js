import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Home from './Containers/Home'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import PublicLibrary from './Containers/PublicLibrary'
import PersonalLibrary from './Containers/PersonalLibrary'
// import WorkoutPages from './Containers/WorkoutPages'


class App extends React.Component{

  state ={
    currentUser: 3
  }

  render () {
    const {currentUser} = this.state
    return (
      <Router>
        <Navbar />
        <Route exact path='/home' component={Home} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/workouts' render={() => <PublicLibrary currentUser={currentUser}/>} />
        <Route exact path='/myworkouts' render={() => <PersonalLibrary currentUser={currentUser}/>} />
        {/* <Route exact path='/library/:id' component={WorkoutPage} /> */}
      </Router>
    )
  }
}

export default App