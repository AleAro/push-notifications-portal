import axios from 'axios';

const Message_API_BASE_URL = "https://onyni7ymnl.execute-api.us-east-2.amazonaws.com/nDev/pushNotifications";
const headers = {
    Authorization: "Hola Mundo",
  };
class MessageService {
   
    getMessages(){
        console.log("getting messages")
        return axios.get(Message_API_BASE_URL, {
            headers: headers,
          });
    }

    createMessage(Message){
        return axios.post(Message_API_BASE_URL, Message, {
            headers: headers,
          });
    }

    getMessageById(MessageId){
        return axios.get(Message_API_BASE_URL + '/' + MessageId, {
            headers: headers,
          });
    }

    updateMessage(Message, MessageId){
        return axios.put(Message_API_BASE_URL + '/' + MessageId, Message, {
            headers: headers,
          });
    }

    deleteMessage(MessageId){
        return axios.delete(Message_API_BASE_URL + '/' + MessageId, {
            headers: headers,
          });
    }
}

export default new MessageService()