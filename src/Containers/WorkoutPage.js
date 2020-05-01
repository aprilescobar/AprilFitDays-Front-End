import React from 'react'
import ReactPlayer from 'react-player'
import Button from 'react-bootstrap/Button'
import Duration from '../Duration'
import { Link } from 'react-router-dom';


class WorkoutPage extends React.Component {

    state = {
        workout: '',
        playing: false,
        controls: true,
        muted: false,
        time: 0,
        duration: 0,
        start: false,
        end: false
    }

    componentDidMount() {
        const id = parseInt(this.props.match.params.id, 0)
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
        const {workout} = this.state
        // const user = workout.user
        console.log("inside workoutpage", workout)
        return (
            <div className="standard">
                <h2>{workout.name}</h2>
                <h5>Duration: {workout.duration} mins</h5>
                {/* <div className="button">
                    <Button 
                        variant="btn btn-outline-dark"
                        value={workout.id} 
                        onClick={this.props.handleAdd}
                    > + My Workouts </Button>
                </div> */}
                <Button 
                        variant="btn btn-outline-success"
                        // value={workout.id} 
                        // onClick={this.props.handleDelete}
                    > Start Workout </Button>
                <div className='player-wrapper'>
                    <ReactPlayer 
                        url={workout.media}
                        className='react-player' 
                        width='100%'
                        height='100%'
                    />
                </div>
                {/* <img src={workout.user.img_url} alt=""/> */}
                <p>{workout.description}</p>
                {this.creatorAccess()}
            </div>
        )
    }
}

export default WorkoutPage