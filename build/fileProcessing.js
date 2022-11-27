import path from 'node:path';
import fs from 'node:fs';
import { jsaMD } from 'jsalpha-markdown';

export async function fileProcessing(file) {
    if (path.extname(file) == ".html"){
        fs.cp(`./src/${file}`, `./_site/${file}`, (err)=>{
          if(err) throw err
          else{
            console.log("\x1b[42m",`${file} are build`,"\x1b[0m")
          }
        })
      }
      if (path.extname(file) == ".css"){
        fs.cp(file, `_site/${file}`, (err)=>{
          if(err) throw err 
          else{
            console.log("\x1b[42m",`${file} are build`,"\x1b[0m")
          }
        })
      }
      if (path.extname(file) == ".js"){
        fs.cp(file, `_site/${file}`, (err)=>{
          if(err) throw err
          else{
            console.log("\x1b[42m",`${file} are build`,"\x1b[0m")
          }
        })
      }
      if (path.extname(file) == ".md"){
        fs.appendFile(`./_site/${path.basename(file, path.extname(file))}.html`, jsaMD(`./src/${file}`), function(err) {
          if(err) {
              return console.log(err);
          }else{
            console.log("\x1b[42m",`${file} are build`,"\x1b[0m")
          }
        });
      }
      if (path.extname(file) == ".json"){
        // doesn't work with JSA v1.0.1
      }
}