import React from 'react'
import ContentPage from '../Components/ContentPage'

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
            <div>
                <h3>Public Library</h3>
                {this.displayWorkouts()}
            </div>
        )
    }
}

export default PublicLibrary