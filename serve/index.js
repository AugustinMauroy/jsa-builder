import http from 'node:http';
import fs from 'node:fs';
import { build } from '../build/index.js';

export function serve(){
    build()

    const server = http.createServer(async (req,res) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end("<h1>Hello word!</h1>");    
    });

    server.listen(8080,() => {
        console.log("\x1b[32m",'Server running at',"\x1b[1m",'http://localhost:8080/',"\x1b[0m")
    });
};
