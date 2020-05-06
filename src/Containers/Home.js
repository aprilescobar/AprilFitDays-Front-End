import React from 'react'
import Moment from 'react-moment';
import ContentPage from '../Components/ContentPage';

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
        fetch('http://localhost:3000/logs')
        .then(res => res.json())
        .then(list => this.setLogs(list))
    }

    getUser = () => {
        const id = parseInt(this.props.currentUser,0)
        fetch(`http://localhost:3000/users/${id}`)
        .then(res => res.json())
        .then(user => this.setState({user}))
    }

    getWorkouts = () => {
        fetch(`http://localhost:3000/workouts`)
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
        const recent = logs[0]
        const workout = recent.workout
        this.setState({ logs, recent, workout})
    }

    pastWorkouts = () => {
        const list = this.state.logs.sort((a, b) => b.id - a.id)
        return list.map(log => {
            const dateToFormat = log.created_at
            return (
                <div key={log.id}>
                    <b>{log.workout.name}</b>
                    <br/> <Moment calendar={calendarStrings}>{dateToFormat}</Moment>
                    <br /> <br />
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
    
    render () {
        const {user, logs} = this.state
        return (
            <div>
                <div className="header">
                    <h2>{user.name}</h2>
                </div>
                <div className="split">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="profile">
                                <h3 className="center">My Workouts</h3>
                                <div className="list">
                                    {this.displayWorkouts()}
                                </div>
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