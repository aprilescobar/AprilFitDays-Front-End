import React from 'react'
import { Route, Switch} from 'react-router-dom';
import Library from './Library'
import PersonalLibrary from './PersonalLibrary'
import NewWorkout from '../Components/NewWorkout'


const workoutUrl = "http://localhost:3000/workouts"
const personalLibraryUrl = "http://localhost:3000/personal_libraries"

class ListPages extends React.Component {
    state ={
        workouts: [],
        myWorkouts: [],
        removedWorkout: []
    }

    componentDidMount() {
        this.getWorkouts()
        this.getMyWorkouts()
    }

    getWorkouts = () => {
        fetch(workoutUrl)
        .then(res => res.json())
        .then(workouts => this.setState({workouts}))
    }

    getMyWorkouts = () => {
        fetch(personalLibraryUrl)
        .then(res => res.json())
        .then(myWorkouts => this.setState({myWorkouts}))
    }

    handleAdd = e => {
        const user_id = parseInt(this.props.currentUser, 0)
        const workout_id = parseInt(e.target.value, 0)

        fetch(personalLibraryUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ user_id, workout_id })
        })
        .then(res => res.json())
        .then(addWorkout => this.setState({myWorkouts: [...this.state.myWorkouts, addWorkout]}))
    }

    handleRemove = e => {
        const id = parseInt(e.target.value, 0)
        fetch(`${personalLibraryUrl}/${id}`, {
            method: "DELETE"
        })
        const updated = this.state.myWorkouts.filter(workout => workout.id !== id)
        this.setState({myWorkouts: updated})
    }

    handleNew = newWorkout => {
        const {name, description, media} = newWorkout
        fetch('http://localhost:3000/workouts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: this.props.currentUser,
                name,
                description,
                media
            })
        })
        .then(res => res.json())
        .then(workout => this.setState({ workouts: [...this.state.workouts, workout]}, () => this.props.history.push("/workouts")))
    }

    render() {
        console.log("inside ListPages, myWorkouts", this.state.myWorkouts)
        return (
            <Switch>
                <Route exact path='/workouts' render={() => 
                    <Library 
                        {...this.state}
                        currentUser={this.props.currentUser} 
                        handleAdd={this.handleAdd} 
                    />} 
                />
                <Route exact path='/myworkouts' render={() => 
                    <PersonalLibrary 
                        myWorkouts={this.state.myWorkouts}
                        removedWorkout={this.state.removedWorkout} 
                        currentUser={this.props.currentUser} 
                        handleRemove={this.handleRemove} 
                        />} 
                    />
                <Route path='/workouts/new' render={() => 
                    <NewWorkout currentUser={this.props.currentUser} handleNew={this.handleNew}/>} 
                />
            </Switch>
        )
    }
}

export default ListPages