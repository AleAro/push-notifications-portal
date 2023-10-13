import React, { Component,useContext, useEffect, useState } from 'react'
import MessageService from '../services/MessageService'
import { useNavigate } from "react-router-dom";




const ListMessageComponent = () => {

    const [Messages, setMessages] = useState([]);
    const navigate = useNavigate();


  function  deleteMessage(id){
        MessageService.deleteMessage(id).then( res => {
           setMessages(Messages.filter(Message => Message.id !== id))
        });
    }
 function   viewMessage(id){
     
        navigate(`/view-Message/${id}`);
    }
  function  editMessage(id){
       
        navigate(`/add-Message/${id}`);
    }

    useEffect(() => {
        MessageService.getMessages().then((res) => {
            setMessages(res.data)
         
        });
      }, []);

    

    function addMessage(){
    
        navigate("/add-Message/_add");
    }


        return (
            <div>
                 <h2 className="text-center">Messages List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={addMessage}> Add Message</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Message Title</th>
                                    <th> Message Description</th>
                                    <th> Message Link</th>
                                    <th> Message Status</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Messages.map(
                                        Message => 
                                        <tr key = {Message.id}>
                                             <td> { Message.title} </td>   
                                             <td> {Message.description}</td>
                                             <td> {Message.link}</td>
                                             <td> {Message.status}</td>
                                             <td>
                                                 <button onClick={() =>{ editMessage(Message.id)}} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={() =>{  deleteMessage(Message.id)}} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={() =>{  viewMessage(Message.id)}} className="btn btn-info">View </button>
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


export default ListMessageComponent