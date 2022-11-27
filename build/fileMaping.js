import fs from 'node:fs';
import { fileProcessing } from "./fileProcessing.js";

export function fileMapping(input){
  let srcFiles = fs.readdirSync(input)

  srcFiles.forEach(file => {
    if(tryDirectory(`${input}/${file}`)){
      fileMapping(`${input}/${file}/`)
    }
    if(tryFile(`${input}/${file}`)){
      fileProcessing(`${file}`)
    }
  });
}

function tryDirectory(directory){
  try {
    fs.readdirSync(directory)
    return true
  } catch (e) {
    return false
  }
}
function tryFile(file){
  try {
    fs.readFileSync(file,'utf-8')
    return true
  } catch (e) {
    return false
  }
}