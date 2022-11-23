import fs from 'node:fs';
import path from 'node:path';
import { jsaMD } from 'jsalpha-markdown';

export function build(){
  if (fs.existsSync('./_site')) {
    fs.readdirSync('./_site').forEach(f => fs.rmSync(`./_site/${f}`));
  } else {
    fs.mkdir('./_site', { recursive: true }, (err) => {
      if (err) throw err;
    });
  }    
    
  const srcFiles = fs.readdirSync('./src');
  srcFiles.forEach(file => {
    if(fs.lstatSync(`./src/${file}`).isDirectory()){
      
    }
    if(fs.lstatSync(`./src/${file}`).isFile){
      buildFile(file)
    }    
  });
};

function buildFile(file){
  if (path.extname(file) == ".html"){
    fs.cp(`./src/${file}`, `_site/${file}`, (err)=>{
      if(err) throw err
      else{
        console.log("\x1b[42m",`${file} are build`,"\x1b[0m")
      }
    })
  }
  if (path.extname(file) == ".css"){
    fs.cp(`./src/${file}`, `_site/${file}`, (err)=>{
      if(err) throw err 
      else{
        console.log("\x1b[42m",`${file} are build`,"\x1b[0m")
      }
    })
  }
  if (path.extname(file) == ".js"){
    fs.cp(`./src/${file}`, `_site/${file}`, (err)=>{
      if(err) throw err
      else{
        console.log("\x1b[42m",`${file} are build`,"\x1b[0m")
      }
    })
  }
  if (path.extname(file) == ".md"){
    fs.appendFile(`./_site/${path.basename(file, path.extname(file))}.html`, jsaMD(`./src/${file}`) , function(err) {
      if(err) {
          return console.log(err);
      }else{
        console.log("\x1b[42m",`${file} are build`,"\x1b[0m")
      }
  }); 
  }
  if (path.extname(file) == ".json"){
    // doesn't work with JSA v1.0.0
  }
}