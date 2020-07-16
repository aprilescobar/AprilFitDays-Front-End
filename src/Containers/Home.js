import React from 'react'
import Moment from 'react-moment';
import ContentPage from '../Components/ContentPage';
import { Link } from 'react-router-dom'


const calendarStrings = {
    lastDay : '[Yesterday at] LT',
    sameDay : '[Today at] LT',
    nextDay : '[Tomorrow at] LT',
    lastWeek : '[last] dddd [at] LT',
    nextWeek : 'dddd [at] LT',
    sameElse : 'L'
};

class Home extends React.Component {

    state = {
        logs: [],
        recent: {},
        workout: {},
        user: {},
        workouts: []
    }

    componentDidMount() {
        this.getLogs()
        this.getUser()
        this.getWorkouts()
    }

    getLogs = () => {
        fetch('https://pacific-harbor-95225.herokuapp.com/logs')
        .then(res => res.json())
        .then(list => this.setLogs(list))
    }

    getUser = () => {
        const id = parseInt(this.props.currentUser,0)
        fetch(`https://pacific-harbor-95225.herokuapp.com/users/${id}`)
        .then(res => res.json())
        .then(user => this.setState({user}))
    }

    getWorkouts = () => {
        fetch(`https://pacific-harbor-95225.herokuapp.com/workouts`)
        .then(res => res.json())
        .then(all => this.setWorkouts(all))
    }

    setWorkouts = all => {
        const id = parseInt(this.props.currentUser,0)
        const workouts = all.filter(workout => workout.user_id === id)
        this.setState({workouts})
    }

    setLogs = list => {
        const logs = list.filter( log => log.user_id === this.props.currentUser)
        if(logs.length > 0 ){
        const recent = logs[0]
        const workout = recent.workout
        this.setState({ logs, recent, workout})        
    }
    }

    pastWorkouts = () => {
        const list = this.state.logs.sort((a, b) => b.id - a.id)
        return list.map(log => {
            const dateToFormat = log.created_at
            return (
                <div key={log.id}>
                    <b>{log.workout.name}</b>
                    <br/> <Moment calendar={calendarStrings}>{dateToFormat}</Moment>
                    <br/> <br/>
                </div>
            )
        })
    }

    displayWorkouts = () => {
        return this.state.workouts.map( workout => {
            return(
                <div key={workout.id}>
                     <ContentPage workout={workout} profile={true}/>
                </div>
            )
        })
    }

    creatorView = () => {
        return (
            <div>
                <h3 className="center">My Workouts</h3>
                <div className="list">
                    {this.displayWorkouts()}
                </div>
            </div>
        )
    }

    userView = () => {
        return (
            <div>
                <h3 className="center">Let's get your workout started!</h3>
                <div className="center">
                    <br/><img className="quote" src="https://makeyourbodywork.com/wp-content/uploads/2013/12/im-tired-470x482.jpg" alt="inspirational quote"/><br/>
                    <br/><em className="center">Feel free to contribute to the community and <Link to="/workouts/new" className="link">create</Link> a workout ♡ </em>                
                </div>
            </div>
        )
    }
    
    render () {
        const {user, logs} = this.state
        const myWorkoutList = parseInt(this.displayWorkouts().length, 0)
        return (
            <div className="section">
                <div id="loader"></div>
                <div className="header">
                    <h2>{user.name}</h2>
                </div>
                <div className="split">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="profile">
                                {myWorkoutList > 0 ? this.creatorView() : this.userView() }
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="logSection">
                                <h4>Previous Workouts</h4>
                                <div className="center">
                                   <em> Completed Workouts: <b>{logs.length}</b></em><br/><br/>
                                </div>
                                <div className="logs">
                                    {this.pastWorkouts()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}

export default Home