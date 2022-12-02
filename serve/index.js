import http from 'node:http';
import fs from 'node:fs';
import { build } from '../build/index.js';


export async function serve(){
    build();

    const server = http.createServer(async (req, res)=>{
        let url = req.url;
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end("Hello World!")
        console.log(getInfo(url));
    })

    server.listen(8080, ()=>{
        console.log(`Server running at http://localhost:8080`)
    });
};

async function getInfo(path){
    if (path === '/') {
        return {
            path: './_site/index.html',
            contentType: 'text/html',
        }
    } else {
        if (isDirectory(path)) {
            if (indexHtml(path)){
                return {
                    path: `./_site${path}/index.html`,
                    contentType: 'text/html',
                }
            }
        }
        if (isFile(path)) {
            return{
                path: `./_site${path}`,
                contentType: checkContent(path),
            }
        }
    }
}

async function isDirectory(path){
    try {
        fs.readdir(`./_site${path}`)
        return true;
    } catch (e) {
        return false;
    }
}

async function indexHtml(path){
    try {
        fs.readFile(`./site${path}/index.html`,'utf-8')
        return true;
    } catch (e) {
        return false;
    }
};

async function isFile(path){
    try {
        fs.readFile(`./site${path}`,'utf-8')
        return true;
    } catch (e) {
        return false;
    }
};

async function checkContent(path){
    try{
        
    } catch (e) {
        return 'text/plain';
    }
}