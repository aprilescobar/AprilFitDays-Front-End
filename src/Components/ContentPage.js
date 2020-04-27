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
                > - Remove </Button>
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
                <h3>{workout.name}</h3>
                <ReactPlayer 
                    url={workout.media} 
                    playing={false} 
                    controls={false} 
                    light={true} 
                />
                <div className="buttons">
                    {buttons()}
                    <Link to={`/workouts/${workout.id}`}>
                        <Button variant="btn btn-outline-dark">Start Workout</Button>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default ContentPage