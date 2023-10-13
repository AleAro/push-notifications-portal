import axios from 'axios';

const Message_API_BASE_URL = "https://onyni7ymnl.execute-api.us-east-2.amazonaws.com/nDev/pushNotifications/messages";

class MessageService {

    getMessages(){
        return axios.get(Message_API_BASE_URL);
    }

    createMessage(Message){
        return axios.post(Message_API_BASE_URL, Message);
    }

    getMessageById(MessageId){
        return axios.get(Message_API_BASE_URL + '/' + MessageId);
    }

    updateMessage(Message, MessageId){
        return axios.put(Message_API_BASE_URL + '/' + MessageId, Message);
    }

    deleteMessage(MessageId){
        return axios.delete(Message_API_BASE_URL + '/' + MessageId);
    }
}

export default new MessageService()