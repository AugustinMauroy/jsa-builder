import path from 'node:path';
import fs from 'node:fs';
import { jsaMD, jsaGetTemplate } from 'jsalpha-markdown';

export async function fileProcessing(file) {
    if (path.extname(file) == ".html"){
        fs.cp(`./src/${file}`, `./_site/${file}`, (err)=>{
          if(err) throw err
          else{
            console.log("\x1b[32m","Success","\x1b[0m",`${file} build`)
          }
        })
      }
      if (path.extname(file) == ".css"){
        fs.cp(file, `_site/${file}`, (err)=>{
          if(err) throw err 
          else{
            console.log("\x1b[32m","Success","\x1b[0m",`${file} build`)
          }
        })
      }
      if (path.extname(file) == ".js"){
        fs.cp(file, `_site/${file}`, (err)=>{
          if(err) throw err
          else{
            console.log("\x1b[32m","Success","\x1b[0m",`${file} build`)
          }
        })
      }
      if (path.extname(file) == ".md"){
        var template = `./src/_template${jsaGetTemplate(`./src/${file}`)}`
        fs.appendFile(`./_site/${path.basename(file, path.extname(file))}.html`, jsaMD(`./src/${file}`, template), function(err) {
          if(err) {
              console.log(err);
          }else{
            console.log("\x1b[32m","Success","\x1b[0m",`${file} build`)
          }
        });
      }
      if (path.extname(file) == ".json"){
        // doesn't work with JSA v1.0.1
      }
}
