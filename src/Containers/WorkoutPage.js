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

    options = () => {
        const { start, playing, end} = this.state

        if (start) {
            return (
                <div>
                    <var>Workout In Progress...</var><br/>
                    <Button variant="outline-secondary" onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Resume'}</Button>
                    <Button variant="outline-warning" onClick={this.handleEnd}>End Workout</Button>
                </div>
            )
        }
        return <Button variant="outline-success" onClick={this.handleStart}>Start Workout</Button>
    }

    buttons = () => {
        if (this.state.end) {
            return <div>Workout Ended</div>
        }
        return this.options()
    }

    handleStart = () => {
        this.setState({ playing: true, start: true})
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleEnd = () => {
        this.setState({ playing: false, end: true}, () => this.newLog())
    }

    handleDuration = (duration) => {
        this.setState({ duration })
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
        .then(res => console.log("logged workout"))
    }
    
    render() {
        const {workout, playing, controls, muted, time, duration} = this.state
        // const user = workout.user
        // console.log("inside workoutpage", workout)
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
                {this.buttons()}
                <div className='player-wrapper'>
                    <ReactPlayer 
                        url={workout.media}
                        className='react-player'
                        playing={playing}
                        controls={controls}
                        muted={muted}
                        onSeek={e => console.log('onSeek', e)}
                        onDuration={this.handleDuration} 
                        width='100%'
                        height='100%'
                    />
                <b>Duration: <Duration seconds={duration} /></b><br/>
                </div>
                {/* <img src={workout.user.img_url} alt=""/> */}
                <p>{workout.description}</p>
                {this.creatorAccess()}
            </div>
        )
    }
}

export default WorkoutPage