import fs from 'node:fs';
import path from 'node:path';

export function build(){
    /*Create _site directory*/    
    fs.mkdir('./_site', { recursive: true }, (err) => {
        if (err) throw err;
      });
    
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
    // wait support md in builder
  }
  if (path.extname(file) == ".json"){
    // doesn't work with JSA v1.0.0
  }
}