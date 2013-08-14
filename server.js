/**
 * Created with JetBrains WebStorm.
 * User: tmacbook
 * Date: 8/14/13
 * Time: 12:01 PM
 * Author:  TJ Marbois
 */
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var root = __dirname;

var server = http.createServer(function(req, res) {
    var url = parse(req.url);
    var path = join(root, url.pathname);
    fs.stat(path, function(err, stat) {
        if(err) {
            if('ENOENT' == err.code ) {
                res.statusCode = 404;
                res.end('Not found!\n');
                console.log('Not found 404!');
            } else {
                res.statusCode = 500;
                res.end('Internal Servers Errors!');
            }
        } else {
            res.setHeader('Content-Length', stat.size);
            var stream = fs.createReadStream(path);
            stream.pipe(res);
            console.log("File is being served? stat.size = " + stat.size);
            stream.on('error', function(err) {
                res.statusCode = 500;
                res.end('Internal Server Errors YO!\n');
                console.log("Internal Server Error Triggered YO! stat.size = " + stat.size + "\n");
                console.log(err);
            });
        }
    });
});
server.listen(3000);

