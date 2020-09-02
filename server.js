const express = require('express');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = new http.Server(app);
const io = require('socket.io')(server);


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

io.on('connection', socket => {
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected');
    });

});


server.listen(5000);