import React from 'react'
import { Route, Switch} from 'react-router-dom';
import Library from './Library'
import PersonalLibrary from './PersonalLibrary'
import NewWorkout from '../Components/NewWorkout'
import EditWorkout from '../Components/EditWorkout'
import WorkoutPage from './WorkoutPage'

const workoutsUrl = "https://pacific-harbor-95225.herokuapp.com/workouts"
const personalLibraryUrl = "https://pacific-harbor-95225.herokuapp.com/personal_libraries"

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
        fetch(workoutsUrl)
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
        const {name, dur, description, media} = newWorkout
        const duration = parseInt(dur, 0)

        this.setState({searchWorkout: '',
        filterWorkout: ''})

        fetch('https://pacific-harbor-95225.herokuapp.com/workouts', {
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
        .then(workout => this.setState({ 
                workouts: [...this.state.workouts, workout],
            }, () => {
            this.filterWorkouts()
            this.props.history.push(`/workouts/${workout.id}`)
        }))
    }

    handleDelete = e => {
        console.log("inside ListPages", e.target.value)
        const id = parseInt(e.target.value, 0)
        fetch(`${workoutsUrl}/${id}`, {
            method: "DELETE"
        })
        const updated = this.state.workouts.filter(workout => workout.id !== id)
        this.setState({workouts: updated}, this.props.history.push('/workouts'))
    }

    handleSearchWorkout = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleFilter = e => {
        this.setState({duration: e.target.value})
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
        } if (this.state.duration === 'long'){
            const filtered = workouts.filter(workout => workout.duration > 45)
            return filtered.sort((a,b) => a.duration - b.duration)
        } else {
            return workouts
        }
    }

    render() {
        // console.log("inside ListPages", this.state.filterWorkout, this.state.searchWorkouts)
        const { myWorkouts, removedWorkout, searchWorkout} = this.state
        return (
            <Switch>
                <Route exact path='/workouts' render={() => 
                    <Library 
                        workouts={this.filterWorkouts()}
                        myWorkouts={myWorkouts}
                        currentUser={this.props.currentUser} 
                        handleAdd={this.handleAdd}
                        searchWorkout={searchWorkout}
                        handleSearchWorkout={this.handleSearchWorkout} 
                        handleFilter={this.handleFilter}
                        handleStartWorkout={this.handleStartWorkout}
                    />} 
                />
                <Route exact path='/myworkouts' render={() => 
                    <PersonalLibrary 
                        currentUser={this.props.currentUser}
                        myWorkouts={myWorkouts}
                        removedWorkout={removedWorkout} 
                        handleRemove={this.handleRemove} 
                        handleStartWorkout={this.handleStartWorkout}
                    />} 
                />
                <Route path='/workouts/new' render={() => 
                    <NewWorkout currentUser={this.props.currentUser} handleNew={this.handleNew}/>} 
                />
                <Route path='/workouts/:id/edit' render={routerProps => 
                    <EditWorkout 
                        {...routerProps} 
                        currentUser={this.props.currentUser}
                    />} 
                />
                <Route path='/workouts/:id' render={routerProps => 
                    <WorkoutPage 
                        {...routerProps} 
                        currentUser={this.props.currentUser}
                        myWorkouts={myWorkouts}
                        handleAdd={this.handleAdd}
                        handleDelete={this.handleDelete}
                        handleRemove={this.handleRemove} 

                    />} 
                />
            </Switch>
        )
    }
}

export default ListPages