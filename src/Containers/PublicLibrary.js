import React from 'react'
import ContentPage from '../Components/ContentPage'
// import { Route } from 'react-router-dom';
// import WorkoutPage from '../Containers/WorkoutPage'

class PublicLibrary extends React.Component{

    state ={
        workouts: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/workouts')
        .then(res => res.json())
        .then(workouts => this.setState({workouts}))
    }

    displayWorkouts = () => {
        return this.state.workouts.map(workout => {
            return <ContentPage key={workout.id} workout={workout}/>
        })
    }

    render() {
        // console.log(this.state.workouts)
        return (
            <div className="card-body">
                <div className="standard">
                <h2>Public Library</h2>
                    {this.displayWorkouts()}
                </div>
            </div>
        )
    }
}

export default PublicLibrary