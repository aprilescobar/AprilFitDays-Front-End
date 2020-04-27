import React from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const ContentPage = props => {
    const workout = props.workout

    const buttons = () => {
        if(props.personal) {
            return (
            <div>
                <br/>
                <Button 
                    variant="btn btn-outline-danger"
                    value={props.plid} 
                    onClick={props.handleRemove}
                > - Remove </Button>{' '}
                <Link to={`/workouts/${workout.id}`}>
                    <Button variant="btn btn-outline-success">Start Workout</Button>
                </Link>
            </div>
        )} else {
            return (
                <div>
                    <br/>
                    <Button 
                        variant="btn btn-outline-dark"
                        value={workout.id} 
                        onClick={props.handleAdd}
                    > + My Workouts </Button>{' '}
                    <Link to={`/workouts/${workout.id}`}>
                        <Button variant="btn btn-outline-dark">Start Workout</Button>
                    </Link>
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
                {buttons()}
            </div>
        </div>
    )

}

export default ContentPage