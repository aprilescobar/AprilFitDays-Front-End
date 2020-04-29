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
        removedWorkout: [],
        searchWorkout: '',
        filterWorkout: '',
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

    handleNew = newWorkout => {
        const {name, dur, description, media} = newWorkout
        const duration = parseInt(dur, 0)
        fetch('http://localhost:3000/workouts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: this.props.currentUser,
                name,
                duration,
                description,
                media
            })
        })
        .then(res => res.json())
        .then(workout => this.setState({ workouts: [...this.state.workouts, workout]}, () => this.props.history.push("/workouts")))
    }

    handleRemove = e => {
        const id = parseInt(e.target.value, 0)
        this.removeFetch(id)
    }

    removeFetch = id => {
        fetch(`${personalLibraryUrl}/${id}`, {
            method: "DELETE"
        })
        const updated = this.state.myWorkouts.filter(workout => workout.id !== id)
        this.setState({myWorkouts: updated})
    }

    handleDelete = e => {
        const id = parseInt(e.target.value, 0)
        this.deleteFetch(id)
    }

    deleteFetch = id => {
        fetch(`${workoutUrl}/${id}`, {
            method: "DELETE"
        })
        const updated = this.state.workouts.filter(workout => workout.id !== id)
        this.setState({workouts: updated})
    }

    handleMyDelete = e => {
        const plid = parseInt((e.target.value.split(',')[0]))
        const id = parseInt((e.target.value.split(',')[1]), 0)
        this.removeFetch(plid)
        this.deleteFetch(id)
    }

    handleSearchWorkout = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleFilter = e => {
        this.setState({duration: e.target.value})
        console.log("handleFilter", e.target.value)
    }

    searchWorkouts = () => {
        const workouts = this.state.workouts
        if (this.state.searchWorkout !== ''){
            return workouts.filter(workout => {
                const name = workout.name.toLowerCase()
                const search = this.state.searchWorkout.toLowerCase()
                return name.includes(search)
            })
        }             
        return workouts
    }

    filterWorkouts = () => {
        const workouts = this.searchWorkouts()
        if (this.state.duration === 'quick'){
            const filtered = workouts.filter(workout => workout.duration < 15)
            return filtered.sort((a,b) => a.duration - b.duration)
        } if (this.state.duration === 'short'){
            const filtered = workouts.filter(workout => ((workout.duration >= 15) && (workout.duration <= 30)))
            return filtered.sort((a,b) => a.duration - b.duration)
        } if (this.state.duration === 'medium'){
            const filtered = workouts.filter(workout => ((workout.duration >= 30) && (workout.duration <= 45)))
            return filtered.sort((a,b) => a.duration - b.duration)
        }if (this.state.duration === 'long'){
            const filtered = workouts.filter(workout => workout.duration > 45)
            return filtered.sort((a,b) => a.duration - b.duration)
        }
        return workouts
    }

    render() {
        console.log("inside ListPages", this.state.duration)
        return (
            <Switch>
                <Route exact path='/workouts' render={() => 
                    <Library 
                        workouts={this.filterWorkouts()}
                        myWorkouts={this.state.myWorkouts}
                        currentUser={this.props.currentUser} 
                        handleAdd={this.handleAdd}
                        handleDelete={this.handleDelete}
                        searchWorkout={this.state.searchWorkout}
                        handleSearchWorkout={this.handleSearchWorkout} 
                        handleFilter={this.handleFilter}
                    />} 
                />
                <Route exact path='/myworkouts' render={() => 
                    <PersonalLibrary 
                        currentUser={this.props.currentUser}
                        myWorkouts={this.state.myWorkouts}
                        removedWorkout={this.state.removedWorkout} 
                        handleRemove={this.handleRemove} 
                        handleMyDelete={this.handleMyDelete} 
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