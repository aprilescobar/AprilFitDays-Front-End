import React from 'react'

class NewWorkout extends React.Component {

    state ={
        name:'',
        description:'',
        media:''
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.handleNew({...this.state})
    }

    render () {
        return (
            <div className="newWorkout">
                <h2>Create Workout</h2>
                <div className="authform">
                    <form onSubmit={this.handleSubmit}>
                        <input className="input-group input-group-sm" type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="   Workout Name" /><br />
                        <input className="input-group input-group-sm" type="text" name="media" value={this.state.media} onChange={this.handleChange} placeholder="   YouTube Url" /><br />
                        <div class="input-group">
                        <textarea class="form-control" aria-label="With textarea" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Workout Description"></textarea>
                        </div>
                        <input className="btn btn-secondary submit" type="submit" value="Submit" />
                    </form>
                </div>                 
            </div>
        )
    }
}

export default NewWorkout