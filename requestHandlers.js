/**
 * Created by GanChao on 2017/12/7.
 */
const querystring = require('querystring'),
    fs = require("fs"),
    formidable = require("formidable");

function start(req, res){
    console.log("Request handler 'start' was called.");

    let body ='<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    res.writeHead(200, {
        'Content-Type' : 'text/html'
    });
    res.write(body);
    res.end();
}

function upload(req, res){
    console.log("Request handler 'upload' was called.");

    let form = new formidable.IncomingForm();
    form.uploadDir='tmp';

    console.log('about to parse');
    form.parse(req, (error, fields, files) => {
        console.log('parse done');
        fs.renameSync(files.upload.path, './tmp/test.png');
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('received image:<br/>');
        res.write(`<img src="/show" />`);
        res.end();
    })
}

function show(req, res){
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/test.png","binary",function(error, file){
        if(error){
            res.writeHead(500,{"Content-Type":"text/plain"});
            res.write(error +"\n");
            res.end();
        }else{
            res.writeHead(200,{"Content-Type":"image/png"});
            res.write(file,"binary");
            res.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;