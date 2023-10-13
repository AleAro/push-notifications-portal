import React, { Component } from 'react'
import MessageService from '../services/MessageService'

class ListMessageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                Messages: []
        }
        this.addMessage = this.addMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    deleteMessage(id){
        MessageService.deleteMessage(id).then( res => {
            this.setState({Messages: this.state.Messages.filter(Message => Message.id !== id)});
        });
    }
    viewMessage(id){
        this.props.history.push(`/view-Message/${id}`);
    }
    editMessage(id){
        this.props.history.push(`/add-Message/${id}`);
    }

    componentDidMount(){
        MessageService.getMessages().then((res) => {
            this.setState({ Messages: res.data});
        });
    }

    addMessage(){
        this.props.history.push('/add-Message/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Messages List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addMessage}> Add Message</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Message Title</th>
                                    <th> Message Description</th>
                                    <th> Message Link</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Messages.map(
                                        Message => 
                                        <tr key = {Message.id}>
                                             <td> { Message.title} </td>   
                                             <td> {Message.description}</td>
                                             <td> {Message.link}</td>
                                             <td>
                                                 <button onClick={ () => this.editMessage(Message.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteMessage(Message.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewMessage(Message.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListMessageComponent