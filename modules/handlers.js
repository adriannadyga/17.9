var fs = require('fs-extra');
//gotowy moduł do obsługi zapytań wysyłanych za pomocą formularza
var formidable = require('formidable');

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    //metoda parse służy do odpowiedniego sformułowania zapytania
    form.parse(request, function(error, fields, files) {
        //metoda renameSync odpowiada za zmianę nazwy uploadowanego pliku która kryje się pod kluczem files.upload.path na nazwę test.png i zapisuje go na poziomie pliku index.js
        fs.moveSync(files.upload.path, "test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("recived image:<br>/>");
        response.write("<img src='/show' /");
        response.end();
    })
}
//handler pokazujący że obrazek znajduje się na serwerze
exports.show = function(request, response) {
    fs.readFile("test.png", "binary", function(error, file) {
        response.writeHead(200, {"Conent-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function(err, html) {
        //info dla przeglądarki o rodzaju wysyłanej odpowiedzi - ustawienie nagłówka content-type na text/html
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    })
}

exports.error = function(request, response) {
    console.log("Nie wiem co robić.");
    response.write("404 :(");
    response.end();
}