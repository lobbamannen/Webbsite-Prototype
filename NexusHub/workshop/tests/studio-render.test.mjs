import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {designCSS} from '../src/studio/styles.mjs';
const server=await createServer({server:{middlewareMode:true},appType:'custom',optimizeDeps:{noDiscovery:true,include:[]}});
after(()=>server.close());
const {default:ModuleGrid}=await server.ssrLoadModule('/src/components/home/ModuleGrid.tsx');
const {DesignContext}=await server.ssrLoadModule('/src/studio/context.tsx');
const counts={films:237,series:127,stories:25,plugins:18,files:3488,documents:85,watchlist:4};
const render=values=>renderToStaticMarkup(React.createElement(DesignContext.Provider,{value:values},React.createElement(ModuleGrid,{counts,onNavigate(){},onUpload(){}})));
test('empty design uses all original module cards and real SVG icons',()=>{
 const html=render({});assert.equal((html.match(/data-studio-module=/g)||[]).length,6);assert.ok(html.includes('237 filmer'));assert.ok(html.includes('<svg'));assert.ok(!html.includes('PROTOTYP'));
});
test('module reordering and hiding affect the real original components',()=>{
 const html=render({'cards.order':['plugins','filmer','berattelser','databas','sok','villse'],'cards.hidden':['filmer']});
 assert.ok(html.indexOf('data-studio-module="plugins"')<html.indexOf('data-studio-module="berattelser"'));assert.ok(!html.includes('data-studio-module="filmer"'));assert.ok(html.includes('18 pluginpaket'));
});
test('unmodified original receives no style overrides',()=>{
 assert.ok(!designCSS({}).includes('border-radius:'));assert.ok(!designCSS({}).includes('grid-template-columns'));assert.ok(!designCSS({}).includes('font-size:'));
});
test('each style control emits an actual independent style',async()=>{
 const {CONTROLS}=await import('../src/studio/config.mjs');
 const structural=new Set(['home.greeting','home.name','home.stats','home.recent','media.filters']);
 for(const c of CONTROLS){if(structural.has(c.key))continue;const value=c.options[1][0];assert.notEqual(designCSS({values:{[c.key]:value}}),designCSS({}),c.key+' must affect the actual preview');}
});

test('all design CSS parses as CSS without recovery',async()=>{
 const {createRequire}=await import('node:module');const require=createRequire(import.meta.url);const {transform}=require('lightningcss');
 const {CONTROLS}=await import('../src/studio/config.mjs');
 for(const c of CONTROLS)for(const [value] of c.options||[]){const r=transform({filename:c.key+'.css',code:Buffer.from(designCSS({values:{[c.key]:value}})),errorRecovery:false});assert.deepEqual(r.warnings,[],c.key+' '+value);}
});
test('editor stacking context stays above the original fixed navigation',async()=>{
 const {readFileSync}=await import('node:fs');const css=readFileSync(new URL('../src/studio/studio.css',import.meta.url),'utf8');
 const root=css.match(/\.ds-ui\{([^}]+)\}/)?.[1]||'';
 const position=root.match(/(?:^|;)position:([^;]+)/)?.[1]||'static';
 const z=Number(root.match(/(?:^|;)z-index:([^;]+)/)?.[1]||0);
 assert.ok(position!=='static'&&z>40,'The editor root, not just its children, must layer above the original navigation.');
});
