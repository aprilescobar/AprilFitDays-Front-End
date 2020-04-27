import React from 'react'

const WorkoutPage = props => {
    return (
        <div>
            <h3>Workout Page</h3> 
            {props.workout.name}           
        </div>
    )
}

export default WorkoutPage