import React from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'


const ContentPage = props => {
    const workout = props.workout

    const buttons = () => {
        if(props.personal) {
            return (
            <div className="button">
                <Button 
                    variant="btn btn-outline-danger"
                    value={props.plid} 
                    onClick={props.handleRemove}
                > - Remove from List </Button>
            </div>
        )} else {
            return (
                <div className="button">
                    <Button 
                        variant="btn btn-outline-dark"
                        value={workout.id} 
                        onClick={props.handleAdd}
                    > + My Workouts </Button>
                </div>
            )
        }
    }

    return (
        <div>
            <div className="contentCards">
                    <b>{workout.name} </b>
                    <ReactPlayer 
                        url={workout.media} 
                        playing={false} 
                        controls={true} 
                        light={true} 
                        width='300px'
                        height='168px'
                    />
                    <b>Duration: {workout.duration} min</b><br/>
                    <em>Created by: {workout.user.name}</em>
                    <div className="buttons"> 
                        <Link to={`/workouts/${workout.id}`}>
                            <Button variant="btn btn-outline-dark">Go to Workout</Button>
                        </Link>
                        {buttons()}
                </div>
            </div>
        </div>
    )

}

export default ContentPage