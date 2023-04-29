import React from "react";
import "./ChatRoom.css";
import useChat from "../useChat";
import axios from 'axios';
import FileUpload from "../FileUpload/FileUpload";

const ChatRoom = (props) => {
  // const { roomId } = props.match.params;
  const roomId = localStorage.getItem('roomId');
  const [message, setMessage] = React.useState([]);
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [files,setFiles] = React.useState({});
  const [cid, setCid] = React.useState(null);



const user = localStorage.getItem('User');
  const url = "http://localhost:4000/api/messages/"+roomId;
  const fetchInfo = async () => {
    const res = await axios.get(url);
    console.log(res);
    setMessage(res.data.allmessages);
  };

  React.useEffect(() => {
    console.log("Reload");
    fetchInfo();
  }, []);
// Create a reference to the hidden file input element

  
// Programatically click the hidden file input element
// when the Button component is clicked


  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  
  const handleSendMessage = () => {
    const msg = {
      msg: newMessage,
      user_id: localStorage.getItem('User'),
      case_id: localStorage.getItem('roomId'),
    }
    sendMessage(msg);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {message.map((messag, i) => (
            
            <li
              key={i}
              
            >
              <div className={`message-item ${messag.user_id===user ? "me" : "other-user"
              }`}>{messag.user_id} </div>
              
              <div className={`message-item ${
                messag.user_id===user ? "my-message" : "received-message"
              }`}>{messag.content}</div>
              <hr />
            </li>
            
          ))}

        </ol>
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li key={i}>
             <div className={`message-item ${message.user_id===user ? "me" : "other-user"
              }`}>{message.user_id} </div>
             
             <div className={`message-item ${
                message.user_id===user ? "my-message" : "received-message"
              }`}>{message.body}</div>
            </li>
          ))}
        </ol>
      </div>
     <div className="input-container">
      {/* <input type="file" className="file-input" onChange={onChange} /> */}
     <FileUpload files={files} setFiles={setFiles} />

    
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
        />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
        </div>
    </div>
  );
};

export default ChatRoom;
