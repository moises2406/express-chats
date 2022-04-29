import express from 'express';
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'



// initialize the app
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  transports: ['websocket']
});


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// start the socket server
io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);
    socket.emit('id', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
  socket.on('chat', (msg) => {
    console.log(msg);

    io.emit('chat', msg);
  });
});


// start the server
server.listen(3000, () => {
  console.log('listening on *:3000');
});