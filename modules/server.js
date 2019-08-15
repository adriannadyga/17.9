var http = require('http');
var colors = require('colors');

//dodanie modułu handlers.js
var handlers = require('./handlers.js');

function start() {
    function onRequest(request, response) {
        console.log('Odebrano zapytanie.'.green);
        console.log("Zapytanie " + request.url + " odebrane.");

        response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});

        //switch rozróżniający zapytania i wywołujący odpowiedni handler
        switch (request.url) {
            case '/':
            case '/start':
                handlers.welcome(request, response);
                break;
            case '/upload':
                handlers.upload(request, response);
                break;
            case '/show':
                handlers.show(request, response);
            default:
                handlers.error(request, response);
        }
    }

    http.createServer(onRequest).listen(9000);

    console.log("uruchomiono serwer!".green);
}

exports.start = start;