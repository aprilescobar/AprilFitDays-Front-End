import React from 'react'

class NewWorkout extends React.Component {

    state ={
        name:'',
        duration: '',
        dur:'',
        media:'',
        description:''
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault()
        const {name, dur, description, media} = this.state
        const duration = parseInt(dur, 0)
        if ((name !== '') && (description !== '') && (media !== '') && (duration > 0)){
            this.props.handleNew({...this.state})
        } else {
            alert("Please complete the form")
        }
    }

    render () {
        return (
            <div className="newWorkout">
                <h2>Create Workout</h2>
                <div className="authform">
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            className="input-group input-group-sm" 
                            type="number" 
                            name="dur" 
                            value={this.state.dur} 
                            onChange={this.handleChange} 
                            placeholder="  Duration (in mins)" 
                        /><br />
                        <input 
                            className="input-group input-group-sm" 
                            type="text" 
                            name="name" 
                            value={this.state.name} 
                            onChange={this.handleChange} 
                            placeholder="  Name" 
                        /><br />
                        <input 
                            className="input-group input-group-sm" 
                            type="text" 
                            name="media" 
                            value={this.state.media} 
                            onChange={this.handleChange} 
                            placeholder="  YouTube Url" 
                        /><br />
                        <div className="input-group">
                            <textarea 
                                className="form-control" 
                                aria-label="With textarea" 
                                name="description" 
                                value={this.state.description} 
                                onChange={this.handleChange} 
                                placeholder="Description"
                            />
                        </div>
                        <input className="btn btn-secondary submit" type="submit" value="Submit" />
                    </form>
                </div>                 
            </div>
        )
    }
}

export default NewWorkout