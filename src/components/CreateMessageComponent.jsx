import React, { Component } from 'react'
import MessageService from '../services/MessageService';

class CreateMessageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
       
            id: this.props.match.params.id,
            status: '',
            title: '',
            description: '',
            link: ''
        }
        this.changetitleHandler = this.changetitleHandler.bind(this);
        this.changedescriptionHandler = this.changedescriptionHandler.bind(this);
        this.saveOrUpdateMessage = this.saveOrUpdateMessage.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            MessageService.getMessageById(this.state.id).then( (res) =>{
                let Message = res.data;
                this.setState({title: Message.title, status: Message.status,
                    description: Message.description,
                    link : Message.link
                    
                });
            });
        }        
    }
    saveOrUpdateMessage = (e) => {
        e.preventDefault();
        let Message = {title: this.state.title, status: this.state.status, description: this.state.description, link: this.state.link};
        console.log('Message => ' + JSON.stringify(Message));

        // step 5
        if(this.state.id === '_add'){
            MessageService.createMessage(Message).then(res =>{
                this.props.history.push('/Messages');
            });
        }else{
            MessageService.updateMessage(Message, this.state.id).then( res => {
                this.props.history.push('/Messages');
            });
        }
    }
    
    changetitleHandler= (event) => {
        this.setState({title: event.target.value});
    }

    changedescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({link: event.target.value});
    }

    cancel(){
        this.props.history.push('/Messages');
    }

    gettitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Message</h3>
        }else{
            return <h3 className="text-center">Update Message</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.gettitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="Titulo" name="title" className="form-control" 
                                                value={this.state.title} onChange={this.changetitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Descripción" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changedescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Link" name="link" className="form-control" 
                                                value={this.state.link} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateMessage}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateMessageComponent