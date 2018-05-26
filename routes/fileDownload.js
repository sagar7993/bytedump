var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

router.get('/', function(req, res) {
    var fileDescription = {}; var files = [];
    var base = './routes/uploads/public/';
    var basePath = '/routes/uploads/public/';
    var directory = fs.readdirSync(base);
    directory.forEach(function(item, index){
        fs.stat((base + item), function (err, stats) {
            var isFile = stats.isFile();
            var isDirectory = stats.isDirectory();
            fileDescription = {
                "fileName" : item,
                "extension" : path.extname(base + item),
                "fileType" : helpers.getFileType(path.extname(base + item)),
                "path" : path.normalize(base),
                "basePath" : path.normalize(__dirname),
                "absolutePath" : path.normalize(__dirname + basePath),
                "isFile": isFile,
                "isDirectory" : isDirectory,
                "createdAt" : stats["birthtime"],
                "updatedAt" : stats["mtime"],
                "changedAt" : stats["ctime"],
                "accessedAt" : stats["atime"],
                "size" : helpers.getSize(stats["size"]),
                "absoluteSize": stats["size"]
            };
            files.push(fileDescription);
            helpers.checkLoopComplete(index, directory.length, files, res, 'web', 'fileDownload');
        });
    });
});

router.post('/', function(req, res) {
    var folderName = req.body.folderName;
    var client = req.body.client;
    var fileDescription = {}; var files = [];
    var base = './routes/uploads/public/' + folderName + '/';
    var basePath = '/routes/uploads/public/';
    try {
        var directory = fs.readdirSync(base);
        directory.forEach(function(item, index){
            fs.stat((base + item), function (err, stats) {
                var isFile = stats.isFile();
                var isDirectory = stats.isDirectory();
                fileDescription = {
                    "fileName" : item,
                    "extension" : path.extname(base + item),
                    "fileType" : helpers.getFileType(path.extname(base + item)),
                    "path" : path.normalize(base),
                    "basePath" : path.normalize(__dirname),
                    "absolutePath" : path.normalize(__dirname + basePath),
                    "isFile": isFile,
                    "isDirectory" : isDirectory,
                    "createdAt" : stats["birthtime"],
                    "updatedAt" : stats["mtime"],
                    "changedAt" : stats["ctime"],
                    "accessedAt" : stats["atime"],
                    "size" : helpers.getSize(stats["size"])
                };
                files.push(fileDescription);
                helpers.checkLoopComplete(index, directory.length, files, res, client, 'fileDownload');
            });
        });
    } catch(error) {
        res.render('error', {
            message: error,
            error: {}
        });
    }
});

router.post('/downloadFile', function(req, res) {
    var filePath = req.body.url;
    if (filePath == './' || filePath == '.' || filePath == '/' || filePath == '' || filePath == null || filePath == undefined) {
        res.render("index", { title : "ByteDump" });
    }
    else
    {
        var filePath = './routes/uploads/public/' + req.body.url;
        var extname = path.extname(filePath);
        var contentType = 'text/plain';
        switch (extname) {
            case '.txt':
                contentType = 'text/plain';
                break;
            case '.html':
            case '.htm':
                contentType = 'text/html';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.xml':
                contentType = 'application/xml';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
            case '.jpeg':
                contentType = 'image/jpeg';
                break;
            case '.mp3':
                contentType = 'audio/mp3';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
            case '.mp4':
                contentType = 'video/mp4';
                break;
            default:
                contentType = 'text/plain';
                break;
        }
        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    res.render('error', {
                        message: error.message,
                        error: error
                    });
                }
                else {
                    //res.writeHead(500);
                    //res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    //res.end();
                    res.render('error', {
                        message: error.message,
                        error: error
                    });
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType, 'Content-Disposition': 'attachment;filename=\"' + req.body.url + '\"' });
                res.end(content, 'utf-8');
                //res.write(content, 'binary');
                //res.end();
            }
        });
    }
});

module.exports = router;