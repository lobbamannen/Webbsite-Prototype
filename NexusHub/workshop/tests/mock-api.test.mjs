import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
function environment(storage=new Map()){
 const context={window:{fetch:async()=>{throw Error('Unexpected network request')}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},Response,URL,Date,console};
 vm.runInNewContext(fs.readFileSync(new URL('../src/mock-api.js',import.meta.url),'utf8'),context);
 return {fetch:context.window.fetch,storage};
}
test('demo film status and favorite can be changed locally, including toggling back',async()=>{
 const env=environment();const data=await(await env.fetch('/api/films')).json();const film={...data.register.films[0],status:'Inte sett',favorite:true};
 const response=await env.fetch('/api/films',{method:'POST',body:JSON.stringify({action:'update',film})});assert.equal(response.status,200);
 let d=await response.json();assert.equal(d.register.films[0].status,'Inte sett');assert.equal(d.register.films[0].favorite,true);
 await env.fetch('/api/films',{method:'POST',body:JSON.stringify({action:'update',film:{...film,status:'Sedd',favorite:false}})});
 d=await(await environment(env.storage).fetch('/api/films')).json();assert.equal(d.register.films[0].status,'Sedd');assert.equal(d.register.films[0].favorite,false);
});
test('story marks survive reloading the workshop and can be removed',async()=>{
 const env=environment(),path='Berattelser/Test/Demo.md';
 await env.fetch('/api/story-status',{method:'POST',body:JSON.stringify({action:'set',path,field:'saved',value:true})});
 let d=await(await environment(env.storage).fetch('/api/story-status')).json();assert.equal(d.register.entries[path].saved,true);
 await env.fetch('/api/story-status',{method:'POST',body:JSON.stringify({action:'set',path,field:'saved',value:false})});
 d=await(await environment(env.storage).fetch('/api/story-status')).json();assert.equal(d.register.entries[path].saved,false);
});
test('demo writes cannot reach the production backend',async()=>{
 const env=environment();await assert.rejects(env.fetch('https://example.com/api/films'),/Extern/);
 assert.equal((await env.fetch('/api/portal/sync',{method:'POST'})).status,403);
});
