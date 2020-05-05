import React from 'react'
import ContentPage from '../Components/ContentPage'
import Button from 'react-bootstrap/Button'

class Library extends React.Component{

    state = {
        startIndex: 0
    }

    myWorkouts = () => {
        const currentPL = this.props.myWorkouts.filter(workout => workout.user_id === this.props.currentUser)
        return currentPL.map(workout => workout.workout_id)
    }

    displayWorkouts = () => {
        const startIndex = this.state.startIndex
        const props = this.props
        const list = props.workouts.map(workout => {
            const currentPL = this.myWorkouts()
            if(currentPL.includes(workout.id)){
                return <div key={workout.id} ></div>
            } return <ContentPage 
                key={workout.id} 
                workout={workout} 
                currentUser={props.currentUser}
                handleAdd={props.handleAdd} 
                handleDelete={props.handleDelete}
                handleStartWorkout={props.handleStartWorkout}
            />
        })

        return list.slice(startIndex, startIndex + 6)
    }

    handleSubmit = e => {
        e.preventDefault()
    }

    filterFeatures = () => {
        return (
            <div className="filterFeatures">
                <form onSubmit={this.handleSubmit}>
                    <input className="form-control form-control-sm" type="text" name="searchWorkout" value={this.props.searchWorkout} onChange={this.props.handleSearchWorkout} placeholder="Search.."/>
                </form>
                <div >
                    <select  className="form-control form-control-sm" value={this.props.filterWorkout} onChange={this.props.handleFilter}>
                            <option value="">Duration</option>
                            <option value="quick">under 15 mins</option>
                            <option value="short">15 - 30 mins</option>
                            <option value="medium">30 - 45 mins</option>
                            <option value="long">over 45 mins</option>
                    </select>
                </div>
            </div>
        )
    }

    handlePageButton= e => {
        const num = parseInt(e.target.value, 0)
        this.setState({startIndex: this.state.startIndex + num })
    }

    pageButtons = () => {
        const maxLength = this.props.workouts.length
        const myWorkouts = this.myWorkouts().length
        const max = (maxLength) - myWorkouts
        console.log(max)
        return( 
            <div className="page">
                {this.state.startIndex > 0 &&
                    <div className="button">
                        <Button 
                            variant="btn btn-outline-dark"
                            value={-6}
                            onClick={this.handlePageButton}
                        >◀◀︎ Prev </Button >
                    </div>
                }
                { this.state.startIndex < (max - 6) &&                 
                    <div className="button">
                        <Button 
                            variant="btn btn-outline-dark"
                            value={6}
                            onClick={this.handlePageButton}
                        >Next ▷▷</Button >
                    </div>
                }
            </div>
        )
    }

    render() {
        console.log("index", this.state.startIndex)
        return (
            <div>
                <div className="splitTop">
                    <div className="row">
                    <div className="col-sm-8">
                        <div className="library">
                            <h2>Library</h2>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="header">
                            {this.filterFeatures()}
                        </div>
                    </div>
                </div>
                </div>
                <div className="row">
                    <div className="standard">
                            <div className='list'>
                                {this.displayWorkouts()}
                            </div>
                                {this.pageButtons()}
                        </div>
                    </div>
            </div>
        )
    }
}

export default Library