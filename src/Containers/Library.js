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
                return <div key={workout.id} ></div>
            } return <ContentPage 
                key={workout.id} 
                workout={workout} 
                currentUser={this.props.currentUser}
                handleAdd={this.props.handleAdd} 
                handleDelete={this.props.handleDelete}
                handleStartWorkout={this.props.handleStartWorkout}
            />
        })
    }

    handleSubmit = e => {
        e.preventDefault()
    }

    filterFeatures = () => {
        return (
            <div className="filterFeatures">
                <form onSubmit={this.handleSubmit}>
                    <input className="search" type="text" name="searchWorkout" value={this.props.searchWorkout} onChange={this.props.handleSearchWorkout} placeholder="Search.."/>
                </form>
                <select value={this.props.filterWorkout} onChange={this.props.handleFilter}>
                        <option value="">Duration</option>
                        <option value="quick">less than 15 mins</option>
                        <option value="short">15 - 30 mins</option>
                        <option value="medium">30 - 45 mins</option>
                        <option value="long">over 45 mins</option>
                </select>
            </div>
        )
    }

    render() {
        return (
            <div className="card-body">
                <div className="standard">
                <h2>Library</h2>
                    {this.filterFeatures()}
                    <div className='list'>
                        {this.displayWorkouts()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Library