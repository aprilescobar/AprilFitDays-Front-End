import React from 'react'
import ReactPlayer from 'react-player'
import Button from 'react-bootstrap/Button'

const workoutsUrl = 'http://localhost:3000/workouts'

class EditWorkout extends React.Component {

    state = {
        workout: '',
        nameUpdate:'',
        duration: '',
        durUpdate:'',
        desUpdate:''
    }

    componentDidMount() {
        const id = this.props.match.params.id
        fetch(`${workoutsUrl}/${id}`)
        .then(res => res.json())
        .then(workout => this.setState({workout}))
    }

    creatorAccess = () => {
        if (this.state.workout.user_id === this.props.currentUser){
            return (
                <div className="delWorkOut">
                    <Button 
                        variant="btn btn-outline-dark"
                        onClick={this.handleUpdate}
                    > Save Changes </Button>
                </div>
            )
        }
        return
    }

    handlechange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleUpdate = () => {
        const {workout, nameUpdate, durUpdate, desUpdate } = this.state
        const name = (nameUpdate !== '' ? nameUpdate : workout.name)
        const duration = (durUpdate !== '' ? parseInt(durUpdate,0) : workout.duration)
        const description = (desUpdate !== '' ? desUpdate : workout.description)
        fetch(`${workoutsUrl}/${workout.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({ name, duration, description})
        })
        .then(res => res.json())
        .then(this.setState({
            nameUpdate:'',
            duration: '',
            durUpdate:'',
            desUpdate:''
        }, 
        this.props.history.push(`/workouts/${workout.id}`,
        )), window.location.reload())
    }
    
    render() {
        const {workout, nameUpdate, durUpdate, desUpdate } = this.state
        return (
            <div className="standard">
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
                <h3>Name:</h3>
                <input 
                    className="form-control form-control-lg" 
                    type="text" 
                    name='nameUpdate' 
                    value={nameUpdate === '' ? workout.name : nameUpdate} 
                    onChange={this.handlechange} 
                    placeholder={workout.name} 
                />
                <b>Duration: (mins)</b>
                <input 
                    className="form-control" 
                    type="number" 
                    name='durUpdate' 
                    value={durUpdate === '' ? workout.duration : durUpdate} 
                    onChange={this.handlechange} 
                    placeholder={workout.duration} 
                />
                <b>Description:</b>
                <input 
                    className="form-control" 
                    type="text" 
                    name='desUpdate' 
                    value={desUpdate === '' ? workout.description : desUpdate} 
                    onChange={this.handlechange} 
                    placeholder={workout.description} 
                />
                {this.creatorAccess()}
            </div>
        )
    }
}

export default EditWorkout