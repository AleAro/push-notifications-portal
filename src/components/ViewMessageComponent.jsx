import React, { useEffect, useState } from 'react';
import MessageService from '../services/MessageService';
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from 'react-router';

import './ViewMessageComponent.css';

const ViewMessageComponent = () => {
    const navigate = useNavigate();

    const useQuery = () => {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    const query = useQuery();

    const [Message, setMessage] = useState({});
    const params = useParams();

    useEffect(() => {
        MessageService.getMessageById(params.id).then(res => {
            setMessage(res.data[0]);
        });
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container">
            <button className="back-button" onClick={handleBack}>← Go Back</button>
            <div className="card">
                <h3 className="text-center">View Message Details</h3>
                <div className="row">
                    <label className="label">Message Users:</label>
                    <div className="content">{Message.users}</div>
                </div>
                <div className="row">
                    <label className="label">Message Title:</label>
                    <div className="content">{Message.title}</div>
                </div>
                <div className="row">
                    <label className="label">Message Description:</label>
                    <div className="content">{Message.description}</div>
                </div>
                <div className="row">
                    <label className="label">Message Link:</label>
                    <div className="content">{Message.link}</div>
                </div>
                <div className="row">
                    <label className="label">Message Status:</label>
                    <div className="content">{Message.status}</div>
                </div>
            </div>
        </div>
    );
}

export default ViewMessageComponent;
