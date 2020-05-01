import React from 'react'
import ReactPlayer from 'react-player'


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
        const {name, dur, media, description} = this.state
        return (
            <div className="standard">
                <h2>Create Workout</h2>
                {media !== '' &&                  
                    <div className='player-wrapper'> 
                        <ReactPlayer 
                                url={media} 
                                className='react-player' 
                                playing={false} 
                                controls={true} 
                                light={true} 
                                width='100%'
                                height='100%'
                        />
                    </div>
                }
                <div className="authform">
                    <form onSubmit={this.handleSubmit}>
                        <b>Name:</b>
                        <input 
                            className="input-group input-group-sm" 
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={this.handleChange} 
                            placeholder="  Keep it short please :)" 
                        /><br />
                        <b>Duration:</b>
                        <input 
                            className="input-group input-group-sm" 
                            type="number" 
                            name="dur" 
                            value={dur} 
                            onChange={this.handleChange} 
                            placeholder="(mins)" 
                        /><br />
                        <b>Media:</b>
                        <input 
                            className="input-group input-group-sm" 
                            type="text" 
                            name="media" 
                            value={media} 
                            onChange={this.handleChange} 
                            placeholder="  YouTube Url" 
                        /><br />
                        <b>Description:</b>
                        <div className="input-group">
                            <textarea 
                                className="form-control" 
                                aria-label="With textarea" 
                                name="description" 
                                value={description} 
                                onChange={this.handleChange} 
                                placeholder="Tell us about the workout!"
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