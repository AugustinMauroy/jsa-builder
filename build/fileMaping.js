import fs from 'node:fs';
import { fileProcessing } from "./fileProcessing.js";

export function fileMapping(input){
  let srcFiles = []
  if (input === undefined) {
    srcFiles = fs.readdirSync('./src')
  } else {
    srcFiles = fs.readdirSync(`./src/${input}`)
  }
  srcFiles.forEach(file => {
    if (input === undefined){
      if(tryDirectory(`./src/${file}`)){
        fileMapping(`${file}/`)
      }
      if(tryFile(`./src/${file}`)){
        fileProcessing(`${file}`)
      }
    }

    if (input !== undefined){
      if(tryDirectory(`./src/${input}/${file}`)){
        fileMapping(`${input}/${file}/`)
      }
      if(tryFile(`./src/${input}/${file}`)){
        fileProcessing(`${input}${file}`)
      }
    }
  });
};

function tryDirectory(directory){
  try {
    fs.readdirSync(directory)
    return true
  } catch (e) {
    return false
  }
};

function tryFile(file){
  try {
    fs.readFileSync(file,'utf-8')
    return true
  } catch (e) {
    return false
  }
};
