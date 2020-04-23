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
        const myList = this.state.myWorkouts.filter(list => list.user_id === this.props.currentUser)
        
        return myList.map(personal => {
            return <ContentPage key={personal.id} workout={personal.workout}/>

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