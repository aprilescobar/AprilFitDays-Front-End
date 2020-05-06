import React from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'


class ContentPage extends React.Component {

    state = {
        clicked: false
    }
        
    buttons = () => {
        const workout = this.props.workout
        const props = this.props
        if(props.personal) {
            return (
            <div className="button">
                <Button 
                    variant="btn btn-outline-danger"
                    value={props.plid} 
                    onClick={props.handleRemove}
                > - Favorites </Button>
            </div>
        )} else {
            return (
                <div className="button">
                    <Button 
                        variant="btn btn-outline-dark"
                        value={workout.id} 
                        onClick={props.handleAdd}
                    > + Favorites </Button>
                </div>
            )
        }
    }

    details = () => {
        const workout = this.props.workout
        return(
            <div>
                <div id="accordion">
                <div className="card">
                    <div className="btn btn-outline-dark" id={`heading${workout.id}`}>
                    <div className="mb-0">
                        <div className="title" data-toggle="collapse" data-target={`#${workout.id}`} aria-expanded="true" aria-controls="collapseOne">
                        {workout.name}
                        </div>
                    </div>
                    </div>
                    <div id={workout.id} className="collapse" aria-labelledby={`heading${workout.id}`} data-parent="#accordion">
                    <div className="card-body">
                        <em>Created by: {workout.user.name}</em>
                    <div className="buttons"> 
                        <div className="button">
                            <Link to={`/workouts/${workout.id}`}>
                                <Button variant="btn btn-outline-dark">Go to Workout</Button>
                            </Link>
                        </div>
                        {this.buttons()}
                    </div>
                    </div>
                    </div>
                </div>
            </div>
  

                
            </div>
        )
    }

    render() {
        const workout = this.props.workout
        return (
            <div>
                <div className="contentCards">
                    <ReactPlayer 
                        url={workout.media} 
                        playing={false} 
                        controls={true} 
                        light={true} 
                        width='300px'
                        height='168px'
                    />
                    <b>Duration: {workout.duration} min</b><br/>
                    {this.details()}
                </div>
            </div>
        )
    }
}

export default ContentPage