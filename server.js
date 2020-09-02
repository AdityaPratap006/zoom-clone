const express = require('express');
const http = require('http');

const app = express();
const server = new http.Server(app);

app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});


server.listen(5000);