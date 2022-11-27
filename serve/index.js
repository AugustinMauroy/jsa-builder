import http from 'node:http';
import fs from 'node:fs';
import { build } from '../build/index.js';

export async function serve(){
    try{
        build()
    } finally {
    const server = http.createServer((req,res)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', contentType(req.url))
        let data = fileRouting(req.url);
        res.end(data);    
    });

    server.listen(8080,() => {
        console.log(`Server running at http://localhost:8080/`)
    });
    }
};

function fileRouting(url){
    if (url === '/') {
        return fs.readFileSync('./_site/index.html', 'utf-8',(err,data)=>{
            if (err) {
                return 'error404'
            } else {
                return data;
            }
        })
    } else {
        return fs.readFileSync(`./_site${url}.html`, 'utf-8',(err,data)=>{
            if (err) {
                return 'error404'
            } else {
                return data;
            }
        })
    }
};

function contentType(url){
    return 'text/html'
};


