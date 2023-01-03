const http = require('http');
const url = require('url');
const fs = require('fs');
const handler = require('./controller/router');
const NotFoundRouting = require('./controller/handler/notFoundRouting');
const typeFile = {
    'jpg': 'images/jpg',
    'png': 'images/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'svg': 'image/svg+xml',
    'ttf': 'font/tff',
    'woff': 'font/woff',
    'woff2': 'font/woff',
    'eot': 'application/vnd.ms-fontobject'
}

const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname;
    const checkPath = pathName.match(/\.js|\.css|\.png|\.jpg|\.ttf|\.woff|\.woff2|\.eot/);
    if(checkPath) {
        const contentType = typeFile[checkPath[0].toString().split('.')[1]];
        res.writeHead(200, {'Content-Type': contentType});
        fs.createReadStream(__dirname + req.url).pipe(res);
    } else {
        const arrPath = pathName.split('/');
        let trimPath = '';
        if(arrPath.length > 2) {
            trimPath = arrPath[1] + '/' + arrPath[2];
        }
        else {
            trimPath = arrPath[arrPath.length - 1];
            
        }
        let chosenHandler;
        if (typeof handler[trimPath] === 'undefined') {
            chosenHandler = NotFoundRouting.showNotFound;
        }
        else {
            chosenHandler = handler[trimPath];
        }
        chosenHandler(req, res, +arrPath[3]), ;
    }
})

server.listen(8080, ()=> {
    console.log(`Server is running!`);
})