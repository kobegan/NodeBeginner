/**
 * Created by GanChao on 2017/12/5.
 */
const http = require('http');
const url = require('url');


function start(route, handle) {
    function onRequest(req, res) {
        let pathname = url.parse(req.url).pathname;
        console.log(`Request for ${pathname} received.`);

        route(handle, pathname, req, res);
/*        let data = '';

        req.setEncoding('utf8');
        req.on('data', (chunk) => {
            data += chunk;
            console.log("Received POST data chunk '"+
                chunk +"'.");
        });
        req.on('end', () => {

        });*/
    }

    http.createServer(onRequest).listen(8888, () => {
        console.log('server listening on port 8888');
    });
}

exports.start = start;