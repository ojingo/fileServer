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
    var stream = fs.createReadStream(path);
    stream.on('data', function(chunk) {
        res.write(chunk);
    });
    stream.on('end', function() {
        res.end();
    });
});
server.listen(3000);

