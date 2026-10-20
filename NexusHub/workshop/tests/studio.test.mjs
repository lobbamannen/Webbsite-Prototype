import {test} from 'node:test';
import assert from 'node:assert/strict';
let api;try{api=await import('../src/studio/config.mjs');}catch{}
test('design engine is available',()=>assert.ok(api,'The original-based design engine must exist'));
if(api){
 test('original is represented by zero overrides',()=>assert.deepEqual(api.cleanDesign({}).values,{}));
 test('independent properties survive a change and a targeted reset',()=>{
  let s=api.createHistory();s=api.change(s,'cards.layout','list');s=api.change(s,'cards.icons','plain');s=api.change(s,'navigation.layout','floating');
  assert.equal(s.present.values['cards.layout'],'list');assert.equal(s.present.values['cards.icons'],'plain');
  s=api.resetGroup(s,'cards');assert.equal(s.present.values['navigation.layout'],'floating');assert.equal(s.present.values['cards.layout'],undefined);
 });
 test('undo and redo restore complete designs including saved ideas',()=>{
  let s=api.createHistory();s=api.change(s,'home.greeting','timed');s=api.saveIdea(s,'Gemini Argon::UX-013');const expected=structuredClone(s.present);
  s=api.undo(s);assert.deepEqual(s.present.savedIdeas,[]);s=api.redo(s);assert.deepEqual(s.present,expected);
  s=api.undo(s);s=api.change(s,'cards.layout','list');assert.equal(s.future.length,0);
 });
 test('exports round trip all valid settings, order and research selections',()=>{
  let s=api.createHistory();s=api.change(s,'cards.layout','list');s=api.change(s,'home.order',['recent','modules','stats']);s=api.saveIdea(s,'Vibe::UX-059');
  assert.deepEqual(api.importDesign(api.exportDesign(s.present)),s.present);
 });
 test('untrusted imports cannot inject CSS or invalid values',()=>{
  const d=api.cleanDesign({values:{'cards.layout':'<script>','global.accent':'red;}body{display:none','global.textSize':999,'home.order':['modules','modules','bogus'],'__proto__':'bad'}});
  assert.equal(d.values['cards.layout'],undefined);assert.equal(d.values['global.accent'],undefined);assert.equal(d.values['global.textSize'],undefined);
  assert.deepEqual(d.values['home.order'],['modules','stats','recent']);assert.throws(()=>api.importDesign('{"format":"other"}'));
 });
 test('legacy exports preserve old picks without pretending to translate them',()=>{
  const legacy={format:'nexus-design-studio',version:1,theme:'velvet',picks:{hero:13},ideaBoard:['Gemini Argon::UX-013']};
  const d=api.importDesign(JSON.stringify(legacy));assert.deepEqual(d.values,{});assert.deepEqual(d.savedIdeas,legacy.ideaBoard);assert.deepEqual(d.legacySource,legacy);
  assert.deepEqual(api.importDesign(api.exportDesign(d)),d);
 });
 test('all applied research mappings use validated controls',()=>{
  for(const [id,b] of Object.entries(api.BINDINGS)){assert.ok(b.description,id);assert.ok(Object.keys(b.values).length,id);for(const [key,value] of Object.entries(b.values))assert.deepEqual(api.cleanDesign({values:{[key]:value}}).values[key],value,id+' '+key);}
 });
}
