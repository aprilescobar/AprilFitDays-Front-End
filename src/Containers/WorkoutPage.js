import React from 'react'
import ReactPlayer from 'react-player'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


class WorkoutPage extends React.Component {

    state = {
        workout: ''
    }

    componentDidMount() {
        const id = this.props.match.params.id
        fetch(`http://localhost:3000/workouts/${id}`)
        .then(res => res.json())
        .then(workout => this.setState({workout}))
    }

    creatorAccess = () => {
        const {workout} = this.state
        if (workout.user_id === this.props.currentUser){
            return (
                <div className="delWorkOut">
                    <Link to={`/workouts/${workout.id}/edit`}>
                        <Button 
                            variant="btn btn-outline-dark"
                            value={workout.id} 
                            onClick={this.props.handleEdit}
                        > Edit Workout </Button>
                    </Link>
                    <Button 
                        variant="btn btn-outline-dark"
                        value={workout.id} 
                        onClick={this.props.handleDelete}
                    > Delete Workout </Button>
                </div>
            )
        }
        return
    }
    
    render() {
        // console.log("inside workoutpage", this.props.match.params.id)
        const {workout} = this.state
        return (
            <div className="standard">
                <h2>{workout.name}</h2>
                <h5>Duration: {workout.duration} mins</h5>
                <div className='player-wrapper'>
                    <ReactPlayer 
                        url={workout.media}
                        className='react-player' 
                        playing={false} 
                        controls={true} 
                        light={false} 
                        width='100%'
                        height='100%'
                    />
                </div>
                {this.creatorAccess()}
            </div>
        )
    }
}

export default WorkoutPage