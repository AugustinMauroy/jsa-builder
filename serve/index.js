import http from 'node:http';
import fs from 'node:fs';
import { build } from '../build/index.js';

export function serve(){
    build()

    const server = http.createServer((req,res)=>{
        res.statusCode = 200
        res.setHeader('Content-Type', contentType(req.url))
        res.end(fileRouting(req.url))    
    });

    server.listen(8080,() => {
        console.log(`Server running at http://localhost:8080/`)
    });
};

function fileRouting(url){
    if (url === '/') {
        fs.readFileSync('./_site/index.html', 'utf-8',(err,data)=>{
            if (err) {
                console.error(err);;
            } else {
                return data;
            }
        })
    } else {
        fs.readFileSync(`./_site/${url}`, 'utf-8',(err,data)=>{
            if (err) {
                console.error(err);;
            } else {
                return data;
            }
        })
    }
};

function contentType(url){
    return 'text/html'
};
