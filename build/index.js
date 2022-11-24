import fs from 'node:fs';
import { fileMapping } from './fileMaping.js';

export function build(){
  if (fs.existsSync('./_site')) {
    fs.readdirSync('./_site').forEach(f => fs.rmSync(`./_site/${f}`));
  } else {
    fs.mkdir('./_site', { recursive: true }, (err) => {
      if (err) throw err;
    });
  }    
  
  fileMapping(`./src`)
};
