'use strict'
let express = require('express');
let app = express();
let fs = require('fs');
//let index = fs.readFile("public/index-menu.html");

app.use(express.static('public'));

app.get('/menu', (request, response) => {
    response.sendFile(__dirname + "/public/index-menu.html");
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
});

app.get('/sample', (request, response) => {
    response.sendFile(__dirname + "/public/sample/index-menu.html");
});

app.listen(80, () => {
    console.log('Server running');
});
