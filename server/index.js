const express  = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors  = require('cors')
// const ipfs  = require('ipfs-core')
const bodyParser  = require('body-parser')
const app = express()
const routes = require('./routes/routes')
const connect = require('./config/dbconnect')
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

connect(process.env.MONGO_DB_URL);
app.use('/api/',routes);


app.listen(port,()=>{
    console.log("Listening to ", port);
})