import React from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';


import Button from 'react-bootstrap/Button'

const ContentPage = (props) => {
    const workout = props.workout
    return (
        <div className="contentCards">
            <h3>{workout.name}</h3>
            <ReactPlayer 
                url={workout.media} 
                playing={false} 
                controls={false} 
                light={true} 
            />
            {/* <p>{workout.description}</p> */}
            <br/><Button variant="btn btn-dark">Add to Personal Libraray</Button>{' '}
            <Link to={`/workouts/${workout.id}`}><Button variant="btn btn-dark">Go to Workout</Button></Link>
        </div>
    )

}

export default ContentPage