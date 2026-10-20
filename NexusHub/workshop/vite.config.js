import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const original=path.resolve(here,'../original');
const names=['portal-polish','hub-design-system','home-dashboard','module-dashboards','discovery-polish','films','series','stories','mirror-inspector','mirror-audit'];
export default defineConfig({
 base:'/Webbsite-Prototype/NexusHub/',
 resolve:{alias:[
  {find:'@',replacement:path.resolve(here,'src')},
  ...names.map(name=>({find:'./'+name+'.css',replacement:path.join(original,name+'.css')}))
 ]},
 build:{outDir:'../dist',emptyOutDir:true,cssCodeSplit:false},
 esbuild:{jsx:'automatic'}
});
