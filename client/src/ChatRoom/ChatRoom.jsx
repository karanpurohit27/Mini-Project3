import React from "react";
import { useEffect } from "react";
import "./ChatRoom.css";
import useChat from "../useChat";
import axios from 'axios';
import {create} from 'ipfs-http-client'
const ChatRoom = (props) => {
  // const { roomId } = props.match.params;
  const roomId = localStorage.getItem('roomId');
  const [message, setMessage] = React.useState([]);
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [cid, setCid] = React.useState(null);

  const onChange = async (event) => {
    const ipfs = create();
    const file = event.target.files[0];

    const result = await ipfs.add(file);
    console.log(result);

    setCid(result.cid.toString());
  }


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
const hiddenFileInput = React.useRef(null);
  
// Programatically click the hidden file input element
// when the Button component is clicked
const handleClick = event => {
  hiddenFileInput.current.click();
};
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
      <button type="file" className="file-input" onClick={handleClick} >File</button><input type="file" ref={hiddenFileInput} onChange={onChange} style={{display: 'none'}} />

      {cid && (
        <p>CID: {cid}</p>
      )}
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
