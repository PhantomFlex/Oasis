'use strict'
let express = require('express');
let app = express();
let fs = require('fs');
const nodemailer = require("nodemailer");

app.use(express.static('public'));

app.get('/menu', (request, response) => {
    response.sendFile(__dirname + "/public/index-menu.html");
});

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
});

app.get('/test', (request, response) => {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        secure: true, // true for 465, false for other ports
        auth: {
            user: "oasisgreen2bt@gmail.com",
            pass: "YpRoWyjX"
        }
    });
    let text = "Сообщение от сайта Oasis: ";
    if (request.query) {
        text += request.query.name + " " + request.query.email + " " + request.query.comment;
    } else {
        text += " Пустое сообшение";
    }
    let mail = {
        from: "oasisgreen2bt@gmail.com",
        to: "oasisgreen2bt@gmail.com",
        subject: "Send Email Using Node.js",
        text: text,
        html: text
    };
    response.send("OK")
    transporter.sendMail(mail, function(error, response){
        if(error){
            response.send("Что то пошло не так при отправке формы (")
        }else{
            response.send("OK")
        }

        transporter.close();
    });



});

app.get('/sample', (request, response) => {
    response.sendFile(__dirname + "/public/sample/index-menu.html");
});

app.listen(80, () => {
    console.log('Server running');
});
