require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const socket = require('socket.io')
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.DB_PORT
const bodyParser = require('body-parser')
var cors = require('cors')
const routes = require('./src/routes/index')
const chatControllers = require('./src/controllers/chatControllers')
const userControllers = require('./src/controllers/userControllers')

app.use((req, res, next) => {
    res.io = io
    next()
  });
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/images', express.static('./images'))


const io = socket(server, {
    cors: {
      origin: '*',
    }
  })
// untuk socket
const users = {}
io.on("connection", (socket) => {
    console.log('ada client yang connect '+socket.id);
    
    socket.on('userOnline', (data) => {
      userControllers.userOnline(data, socket)
      users[socket.id] = data
      console.log('user online data : ', users)
      
    })
    console.log('user online app: ', users[socket.id])
  
    socket.on('initialUser', (dataUser)=>{
      socket.join('room:'+dataUser.room)
      console.log('user :'+dataUser.username + ' join ke '+dataUser.room);
      socket.broadcast.to('room:' + dataUser.room).emit('kirimKembali', `Both: ${dataUser.username} join group `)
    })
  
    socket.on('reciverMessage', (data) => {
      chatControllers.sendMessage(data, socket)
    })
  
    socket.on("disconnect", () => {
      if (users[socket.id])
        userControllers.userOffline(users[socket.id], socket)
      delete users[socket.id]
    });
  });

// routes
app.use('/api', routes)



app.listen(PORT, () => console.log(`server is running port ${PORT}
http://localhost:${PORT}`))

server.listen(4040, ()=>{
    console.log(`server is running port ${PORT}`);
  })