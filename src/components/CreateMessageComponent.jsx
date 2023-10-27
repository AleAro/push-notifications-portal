import React, { Component,useContext, useEffect, useState } from 'react'
import MessageService from '../services/MessageService';
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import './CreateMessageComponent.css';



const CreateMessageComponent = () => {
  const navigate = useNavigate();
    
  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();

    const [id, setId] = useState(query.get("id"));
    const [status, setStatus] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [users, setusers] = useState("*");
   
    const params= useParams()
   
        useEffect(() => {

        if(params.id === '_add'){
            return
        }else{
            console.log("PARAM")
            console.log(params.id)
            MessageService.getMessageById(params.id).then( (res) =>{
                let Message = res.data[0];
                console.log("K")
                console.log(Message.title)
                console.log(Message.status)
                console.log(Message.description)
                console.log(Message.link)
                console.log(Message.users)
                
                setTitle(Message.title)
                setStatus(Message.status)
                setDescription( Message.description)
                setLink( Message.link)
                setStatus( Message.status)
                setusers( Message.users)

              
            });
        }    
          }, []);
    
 
    function saveOrUpdateMessage (e)  {
        e.preventDefault();
     //   let Message = {title: title, status: status, description: description, link: link, users: users};
        let Message = {title: title, status: status, description: description, link: link};
        console.log('Message => ' + JSON.stringify(Message));

        // step 5
        if(params.id === '_add'){
            MessageService.createMessage(Message).then(res =>{
                navigate('/Messages')
                
            });
        }else{
            console.log("im here")
            MessageService.updateMessage(Message, params.id).then( res => {
                navigate('/Messages')
            });
        }
    }
    
   function changetitleHandler(event)  {
        setTitle(event.target.value);
    }

   function changedescriptionHandler(event)  {
        setDescription(event.target.value);
    }

   function  changeLinkHandler (event)  {
        setLink(event.target.value);
    }
    function  changeStatusHandler (event)  {
        setStatus(event.target.value);
    }

    function  changeusersHandler (event)  {
        setusers(event.target.value);
    }

   function  cancel(){
    navigate('/Messages')
       
    }

    function gettitle(){
        if(id === '_add'){
            return <h3 className="text-center">Add Message</h3>
        }else{
            return <h3 className="text-center">Update Message</h3>
        }
    }

        return (
            <div>
                <br></br>
                <div className="message-container">
            <div className="message-card">
                <h3 className="message-title">{gettitle}</h3>
                                    <form>
                                    <div className = "form-group">
                                            <label> users: </label>
                                             <input placeholder="users" name="users" className="form-control"
                                             value={users} />
                                    </div>
                                        <div className = "form-group">
                                            <label> Titulo: </label>
                                            <input placeholder="Titulo" name="title" className="form-control" 
                                                value={title} onChange={changetitleHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Descripcion: </label>
                                            <input placeholder="Descripción" name="description" className="form-control" 
                                                value={description} onChange={changedescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Link: </label>
                                            <input placeholder="Link" name="link" className="form-control" 
                                                value={link} onChange={changeLinkHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Status: </label>
                                            <input placeholder="Status" name="status" className="form-control" 
                                                value={status} onChange={changeStatusHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={saveOrUpdateMessage}>Save</button>
                                        <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

              
        )
    
}

export default CreateMessageComponent