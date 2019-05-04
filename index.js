'use strict'

let express = require('express');
let app = express();
let fs = require('fs');
const nodemailer = require("nodemailer");

app.use(express.static('public'));

app.get('/', (request, response) => {
    console.log("User connected: " + request);
    response.sendFile(__dirname + "/public/index.html");
});

app.get('/test', (request, response) => {
    console.log("User connected.");
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        secure: true, // true for 465, false for other ports
        auth: {
            user: "oasisgreen2bt@gmail.com",
            pass: "YpRoWyjX"
        }
    });
    if (transporter) {
        let text = "Сообщение от сайта Oasis: ";
        console.log(request.query);
        if (request.query) {
            text += request.query.name + " " + request.query.email + " " + request.query.about;
        } else {
            text += " Пустое сообшение";
        }
        let mail = {
            from: "oasisgreen2bt@gmail.com",
            to: "oasisgreen2bt@gmail.com",
            subject: "Сообщение от Oasis. Новый клиент",
            text: text,
            html: text
        };
        transporter.sendMail(mail, (error, response) => {
            if (error) {
                console.log(error);
                if (response) {
                    response.send("Что то пошло не так при отправке формы (")
                }
            } else {
                //response.send("OK")
            }
            transporter.close();
        });
    } else {
        console.log("Transporter not created.")
    }
    response.sendFile(__dirname + "/public/index.html");

});

app.listen(80, () => {
    console.log('Server running');
});
