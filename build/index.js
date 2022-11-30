import fs from 'node:fs';
import { fileMapping } from './fileMaping.js';

export function build(){
  if (checkDirectory() === true) {
    fs.readdirSync('./_site').forEach(f => fs.rmSync(`./_site/${f}`));
    }
    if (checkDirectory() === false) {
      fs.mkdirSync('./_site',()=>{
        console.log("created");
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