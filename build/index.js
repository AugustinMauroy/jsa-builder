import fs from 'node:fs';
import path from 'node:path';
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
  
  fileMapping('./src')
};


function checkDirectory(){
  try {
    fs.readdirSync('./_site');
    return true
  } catch (error) {
    return false
  }
};