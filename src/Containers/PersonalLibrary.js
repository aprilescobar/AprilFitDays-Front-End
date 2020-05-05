import React from 'react'
import ContentPage from '../Components/ContentPage'
import { Link } from 'react-router-dom'


class PersonalLibrary extends React.Component{

    state = {
        startIndex: 0
    }

    displaymyWorkouts = () => {
        const myList = this.props.myWorkouts.filter(list => list.user_id === this.props.currentUser)
        return myList.map(personal => {
            if (this.props.removedWorkout.includes(personal.id)){
                return <div key={personal.id} ></div>
            } else {
                return( 
                    <div key={personal.id} >
                        <ContentPage 
                            personal={true} 
                            plid={personal.id} 
                            workout={personal.workout} 
                            currentUser={this.props.currentUser}
                            handleRemove={this.props.handleRemove}
                            handleDelete={this.props.handleMyDelete}
                            handleStartWorkout={this.props.handleStartWorkout}
                        />
                    </div>
                ) 
            }
        })
    }

    filterFeatures = () => {
        return (
            <div className="filterFeatures">
                <form>
                    <input className="search" type="text" name="search" placeholder="Search.."/>
                </form>
                <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort By
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button className="dropdown-item" type="button">Duration</button>
                    <button className="dropdown-item" type="button">Recently Added</button>
                    <button className="dropdown-item" type="button">Frequently Used</button>
                </div>
                </div>
            </div>
        )
    }

    myWorkouts = () => {
        const myList = this.props.myWorkouts.filter(list => list.user_id === this.props.currentUser)
        if (myList.length > 0 ){
            return (   
                <div>
                    {/* {this.filterFeatures()} */}
                    <div className='list'>
                        {this.displaymyWorkouts()}
                    </div>
                </div>
            )
        }
        return (
            <div className="center"> 
                <p>Your personal library is empty. </p>
                Browse the <Link to="/workouts" className="link">Library</Link> and add some workouts to this page!
            
            </div>
        )
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <div className="header">
                    <h2>My Workouts</h2>
                </div>
                <div className="standard">
                    {this.myWorkouts()}
                </div>
            </div>
        )
    }
}

export default PersonalLibrary