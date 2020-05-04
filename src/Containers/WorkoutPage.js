import React from 'react'
import ReactPlayer from 'react-player'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';


class WorkoutPage extends React.Component {

    state = {
        workout: '',
        playing: false,
        controls: true,
        muted: false,
        start: false,
        end: false,
        user: {}
    }

    componentDidMount() {
        const id = parseInt(this.props.match.params.id, 0)
        fetch(`http://localhost:3000/workouts/${id}`)
        .then(res => res.json())
        .then(workout => this.setState({workout, user: workout.user}))
    }

    creatorAccess = () => {
        const {workout} = this.state
        if (workout.user_id === this.props.currentUser){
            return (
                <div className="buttons">
                    {this.anotherSet()}
                    <div className="button">
                        <Link to={`/workouts/${workout.id}/edit`}>
                            <Button 
                                variant="btn btn-outline-dark"
                                value={workout.id} 
                                onClick={this.props.handleEdit}
                            > Edit Workout </Button>
                        </Link>
                    </div>
                    <div className="button">
                            <Button 
                            variant="btn btn-outline-dark"
                            value={workout.id} 
                            onClick={this.props.handleDelete}
                        > Delete Workout </Button>
                    </div>
                </div>
            )
        }
        return this.anotherSet()
    }

    myWorkoutList = () =>{
        const myList = this.props.myWorkouts.filter(workouts => workouts.user_id === this.props.currentUser)
        return myList.map(workout => workout.workout_id)
    }

    findPlid = () => {
        const myList = this.props.myWorkouts.filter(workouts => workouts.user_id === this.props.currentUser)
        return myList.find(workout => workout.workout_id === this.state.workout.id)
    }

    anotherSet = () => {
        const list = this.myWorkoutList()
        const plid = this.findPlid()
        console.log(plid)
        if(list.includes(this.state.workout.id)) {
            return (
            <div className="button">
                <Button 
                    variant="btn btn-outline-danger"
                    value={plid.id} 
                    onClick={this.props.handleRemove}
                > - My Workouts </Button>
            </div>
        )} else {
            return (
                <div className="button">
                    <Button 
                        variant="btn btn-outline-dark"
                        value={this.state.workout.id} 
                        onClick={this.props.handleAdd}
                    > + My Workouts </Button>
                </div>
            )
        }
    }

    startWorkout = () => {
        if (this.state.start) {
            return (
                <div>
                    <em>Workout In Progress...</em><br/>
                    <div className="button">
                        <Button variant="outline-warning" onClick={this.handleEnd}>End Workout</Button>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <strong>Duration: {this.state.workout.duration} mins</strong><br/>
                <div className="button">
                    <Button variant="outline-success" onClick={this.handleStart}>Start Workout</Button>
                </div>
            </div>
        )
    }

    buttons = () => {
        if (this.state.end) {
            return <div>Amazing Job! Your workout has been logged!</div>
        }
        return this.startWorkout()
    }

    handleStart = () => {
        this.setState({ playing: true, start: true})
    }

    handleEnd = () => {
        this.setState({ playing: false, end: true}, () => this.newLog())
    }

    newLog = () => {
        const user_id = this.props.currentUser
        const workout_id = this.state.workout.id
        fetch('http://localhost:3000/logs', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({user_id, workout_id})
        })
        .then(res => res.json())
        this.props.history.push('/')
    }
    
    render() {
        const {workout, playing, controls, muted, user} = this.state
        return (
            <div>
                <div className="header">
                    <h2>{workout.name}</h2>                    
                </div>
                <div className="split">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="playWorkout">
                                <div className='player-wrapper'>
                                    <ReactPlayer 
                                        url={workout.media}
                                        className='react-player'
                                        playing={playing}
                                        controls={controls}
                                        muted={muted}
                                        width='100%'
                                        height='100%'
                                    />
                                </div>
                                {this.creatorAccess()}
                            </div>
                            </div>
                        <div className="col-sm-4">
                                <div className="startWorkout">
                                    {this.buttons()}
                            </div>
                                <div className="descriptionBox">
                                    <div className="center">
                                        <img src={user.img_url} alt="Profile Pic" className="thumbnail"/>
                                        <em>Created by: {user.name}</em><br/>
                                    </div>
                                    <div className="description">
                                        <b>Description:</b><br/> 
                                        {workout.description}
                                    </div>

                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default WorkoutPage