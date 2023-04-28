const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
// const connect = require('./config/dbconnect');
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

const routes = require('./routes/routes')
const connect = require('./config/dbconnect')

connect(process.env.MONGO_DB_URL);
// connect()

app.use('/api/',routes);



const PORT = process.env.PORT || 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const {insertMessage} = require('./functions')
const server = require("http").createServer(app);


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});





io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  // const room = messages.find({case_id:roomId})
  
  socket.join(roomId);

  // const msg = pastMessages(roomId);



// io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, msg);
  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    // const msg = new Messages({
      
    // })
    const cond = insertMessage(data);
    console.log(data, " Sent");
    if(cond){
      console.log(data, " Sent");
    }else{
      console.log(data, " not sent");
    }


    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});
 

