import React from 'react'
import ContentPage from '../Components/ContentPage'

class Library extends React.Component{

    myWorkouts = () => {
        const currentPL = this.props.myWorkouts.filter(workout => workout.user_id === this.props.currentUser)
        return currentPL.map(workout => workout.workout_id)
    }

    displayWorkouts = () => {
        return this.props.workouts.map(workout => {
            const currentPL = this.myWorkouts()
            if(currentPL.includes(workout.id)){
                return
            } return <ContentPage key={workout.id} workout={workout} handleAdd={this.props.handleAdd}/>
        })
    }

    filterFeatures = () => {
        return (
            <div className="filterFeatures">
                <form>
                    <input className="search" type="text" name="search" placeholder="Search.."/>
                </form>
                <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Duration
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item" type="button">15 mins or less</button>
                    <button className="dropdown-item" type="button">15 - 45 mins</button>
                    <button className="dropdown-item" type="button">over 45 mins</button>
                </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="card-body">
                <div className="standard">
                <h2>Library</h2>
                    {this.filterFeatures()}
                    {this.displayWorkouts()}
                </div>
            </div>
        )
    }
}

export default Library