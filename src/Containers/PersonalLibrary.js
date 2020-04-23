import React from 'react'
import ContentPage from '../Components/ContentPage'

class PersonalLibrary extends React.Component{

    state ={
        myWorkouts: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/personal_libraries')
        .then(res => res.json())
        .then(myWorkouts => this.setState({myWorkouts}))
    }

    displaymyWorkouts = () => {
        return this.state.myWorkouts.map(workout => {
            return <ContentPage key={workout.id} workout={workout}/>
        })
    }

    render() {
        console.log(this.state.myWorkouts)
        return (
            <div>
                <h3>Personal Library</h3>
                {this.displaymyWorkouts()}
            </div>
        )
    }
}

export default PersonalLibrary