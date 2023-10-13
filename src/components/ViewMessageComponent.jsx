import React, { Component } from 'react'
import MessageService from '../services/MessageService'

class ViewMessageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            Message: {}
        }
    }

    componentDidMount(){
        MessageService.getMessageById(this.state.id).then( res => {
            this.setState({Message: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Message Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Message Title: </label>
                            <div> { this.state.Message.title }</div>
                        </div>
                        <div className = "row">
                            <label> Message Description: </label>
                            <div> { this.state.Message.description }</div>
                        </div>
                        <div className = "row">
                            <label> Message Link: </label>
                            <div> { this.state.Message.link }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewMessageComponent