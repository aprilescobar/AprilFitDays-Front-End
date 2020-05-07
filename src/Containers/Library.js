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
        return list.slice(startIndex, startIndex + 24)
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
        this.setState({startIndex: this.state.startIndex + num }, () => window.scroll(0,0))
    }

    renderPageNums = (pageNums, page) => {
        if (page < 2 ){
            return pageNums.slice(page, page + 4) 
        } else {
            return pageNums.slice(page - 2, page + 3) 
        }
    }

    pageButtons = () => {
        const maxLength = this.props.workouts.length
        const myWorkouts = this.myWorkouts().length
        const max = (maxLength - myWorkouts)
        const pageNums = this.pageNums()
        const page = (this.state.startIndex/24)
        return( 
            <div className="page">
                {this.state.startIndex > 0 &&
                    <div className="button">
                        <Button 
                            variant="btn btn-outline-dark"
                            value={-24}
                            onClick={this.handlePageButton}
                        >◀◀︎ Prev </Button >
                    </div>
                }
                {this.renderPageNums(pageNums, page)}
                { this.state.startIndex < (max - 24) &&                 
                    <div className="button">
                        <Button 
                            variant="btn btn-outline-dark"
                            value={24}
                            onClick={this.handlePageButton}
                        >Next ▷▷</Button >
                    </div>
                }
            </div>
        )
    }

    setStartIndex = (newIndex) => {
        const maxLength = this.props.workouts.length
        const myWorkouts = this.myWorkouts().length
        const max = (maxLength - myWorkouts)

        if( newIndex >= 0 && newIndex < max){
            this.setState({ startIndex: newIndex }, window.scroll(0,0))
        }
    }

    pageNums = () => {
        const maxLength = this.props.workouts.length
        const myWorkouts = this.myWorkouts().length
        const max = (maxLength - myWorkouts)

        const lastPage = Math.ceil(max / 24)
        let pagesArray = []
        for(let i = 0; i < lastPage; i++){
            pagesArray.push(<Button 
                variant="btn btn-outline-dark"
                className="button"
                onClick={() => this.setStartIndex(i * 24)} 
                key={i}>{i + 1}</Button>)
        }
        return pagesArray
    }

    render() {
        const page = (this.state.startIndex/24) + 1
        console.log("index", page)
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
                    <div className="footer">
                         Copyright © 2020 AprilFitDays
                    </div>
            </div>
        )
    }
}

export default Library