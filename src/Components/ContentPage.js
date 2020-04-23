import React from 'react'

const ContentPage = props => {
    const workout = props.workout
    return (
        <div>
            <h4>{workout.name}</h4>
            <p>{workout.description}</p>
            <em>{workout.media}</em>
        </div>
    )
}

export default ContentPage