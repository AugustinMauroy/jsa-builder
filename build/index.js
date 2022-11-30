import fs from 'node:fs';
import { fileMapping } from './fileMaping.js';

export function build(){
  if (checkDirectory() === true) {
      removeFile('./_site')
    }
    if (checkDirectory() === false) {
      fs.mkdir('./_site',()=>{
        console.log("\x1b[32m",'Success',"\x1b[0m",' "_site" had be created')
      });
    }
  
  console.log("\x1b[32m",'Success',"\x1b[0m",'Build start')

  fileMapping()
};


function checkDirectory(){
  try {
    fs.readdirSync('./_site');
    return true
  } catch (error) {
    return false
  }
};

function removeFile(dirPath) {
  try { var files = fs.readdirSync(dirPath); }
  catch(e) { return; }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
      removeFile(filePath);
    }
  fs.rmdirSync(dirPath);
};