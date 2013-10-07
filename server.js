/**
 * Very Simple HTTP Server to show the game. Config to use with appfog
 * 
 * by https://github.com/young-steveo
 */

(function(module, undefined) {
  var http        = require('http'),
    fs          = require('fs'),
    http_config = {
        port : process.env.VMC_APP_PORT || 1337,
        host : null
    }
  
  module.exports = http.createServer(function(request, response) {
    var url = request.url, requested_file, split, ext, mime;
    
    if (url === '/') {
      requested_file = './index.html';
    } else {
      requested_file = './' + url;
    }

    split = requested_file.split('.');
    ext = split[split.length - 1];
    switch (ext) {
      case 'css':  mime = 'text/css'; break;
      case 'js':   mime = 'application/javascript'; break;
      case 'ico':  mime = 'image/x-icon'; break;
      case 'html': mime = 'text/html'; break;
      default:     mime = 'text/plain'; break;
    }
    fs.readFile(requested_file, function (err, data) {
      try {
        if (err) { throw err; }
        response.writeHeader(200, { "Content-Type" : mime });
        response.write(data);
        response.end();
      } catch(e) {
        // wtf.  No file.
      }
    });
  }).listen(http_config.port, http_config.host);
}(module));