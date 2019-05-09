'use strict'

let express = require('express');
let app = express();
let fs = require('fs');
const nodemailer = require("nodemailer");

app.use(express.static('public'));

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
    if (transporter) {
        let text = "";
        console.log(request.query);
        if (request.query && request.query.name && request.query.email && request.query.about) {
            text += "<b>Имя:</b> " + request.query.name + "<br>" + "<b>Email или телефон:</b> " + request.query.email + "<br>" + "<b>Информация об участке:</b> " + request.query.about;
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

        }
    } else {
        console.log("Transporter not created.")
    }
    response.sendFile(__dirname + "/public/index.html");

});

app.listen(80, () => {
    console.log('Server running');
});
