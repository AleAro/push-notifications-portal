import React, { Component,useContext, useEffect, useState } from 'react'
import MessageService from '../services/MessageService'
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from 'react-router';

const ViewMessageComponent = () => {
    const navigate = useNavigate();
    
  const useQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();

    const [id, setId] = useState("");
    const [Message, setMessage] = useState({});
    const params= useParams()

       
    useEffect(() => {
       

        MessageService.getMessageById(params.id).then( res => {
            setMessage(res.data[0]);
        })
      
          }, []);


 
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Message Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Message Title: </label>
                            <div> { Message.title }</div>
                        </div>
                        <div className = "row">
                            <label> Message Description: </label>
                            <div> { Message.description }</div>
                        </div>
                        <div className = "row">
                            <label> Message Link: </label>
                            <div> { Message.link }</div>
                        </div>
                        <div className = "row">
                            <label> Message Status: </label>
                            <div> { Message.status }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }


export default ViewMessageComponent