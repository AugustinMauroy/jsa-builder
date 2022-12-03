import http from 'node:http';
import fs from 'node:fs';
import { build } from '../build/index.js';


export function serve(){
    build();

    const server = http.createServer((req, res) => {
        let url = req.url;
        let content = getInfo(url);
        console.log(content.path);
        let file = fs.readFile(content.path, 'utf8', (err, data) => {
            if (err) {
              return '404';
            }
            return data;
          });
        console.log(file);
        res.statusCode = 200
        res.setHeader('Content-Type', content.contentType);
        res.end(file);
    })

    server.listen(8080, ()=>{
        console.log(`Server running at http://localhost:8080`)
    });
};

function getInfo(path){
    if (path === '/') {
        return {
            path: './_site/index.html',
            contentType: 'text/html',
        }
    } else {
        if (isDirectory(path) === true) {
            if (indexHtml(path)){
                return {
                    path: `./_site${path}/index.html`,
                    contentType: 'text/html',
                }
            }
        } else if (isFile(path) === true) {
            return{
                path: `./_site${path}`,
                contentType: checkContent(path.split(".").at(-1)),
            }
        } else {
            return {
                path: './_site/404.html',
                contentType: 'text/html',
            }
        }
    }
}

function isDirectory(path){
        return fs.readdir(`./_site${path}`, (err, files)=>{
            if (err) {
                return false;
            }
            return true;
        })
}

function indexHtml(path){
        return fs.readFile(`./site${path}/index.html`,'utf-8', (err, data)=>{
            if (err) {
                return false;
            }
            return true;
        })
};

function isFile(input){
    let path = `./site${input}`
    console.log(path);
    return fs.readFile(path, 'utf-8', (err, data)=>{
            if (err) {
                return false;
            } else {
                return true;
            }
        });
};

function checkContent(path){
    switch (path) {
        case 'html':
            return 'text/html';
        case 'css':
            return 'text/css';
        case 'js':
            return 'text/javascript';
        case 'png':
            return 'image/png';
        case 'jpg':
            return 'image/jpg';
        case 'jpeg':
            return 'image/jpeg';
        case 'gif':
            return 'image/gif';
        case 'svg':
            return 'image/svg+xml';
        case 'ico':
            return 'image/x-icon';
        case 'json':
            return 'application/json';
        case 'pdf':
            return 'application/pdf';
        case 'zip':
            return 'application/zip';
        case 'rar':
            return 'application/x-rar-compressed';
        default:
            return 'text/plain';
    }
}
