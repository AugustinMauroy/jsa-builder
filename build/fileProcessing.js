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
        fs.cp(`./src/${file}`, `_site/${file}`, (err)=>{
          if(err) throw err 
          else{
            console.log("\x1b[32m","Success","\x1b[0m",`${file} build`)
          }
        })
      }
      if (path.extname(file) == ".js"){
        fs.cp(`./src/${file}`, `_site/${file}`, (err)=>{
          if(err) throw err
          else{
            console.log("\x1b[32m","Success","\x1b[0m",`${file} build`)
          }
        })
      }
      if (path.extname(file) == ".md"){
        let fileWithoutExtension = file.substring(0, file.length - path.extname(file).length);
        let template = `./src/_template${jsaGetTemplate(`./src/${file}`)}`
        let sliced = file.split("/")

        for (let i = 0; i < sliced.length - 1; i++){
          if (path.extname(sliced[i]) == ""){
            if (!fs.existsSync(`./_site/${sliced[i]}`)){
              fs.mkdirSync(`./_site/${sliced[i]}`)
            }
          }
        }
        
        fs.writeFile(`./_site/${fileWithoutExtension}.html`, jsaMD(`./src/${file}`, template), {encoding: "utf8"}, function(err) {
          if(err) throw err
          else {
            console.log("\x1b[32m","Success","\x1b[0m",`${file} build`)
          }
        });
      }
      if (path.extname(file) == ".json"){
        // doesn't work with JSA v1.0.1
      }
}
