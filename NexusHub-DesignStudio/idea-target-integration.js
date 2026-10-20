/* Finding-to-builder integration registry.
 * Loaded after the five finding maps and before app.js. It preserves source IDs,
 * deduplicates only exact same-family change descriptions, and adds mapped choices
 * to the real component families consumed by the builder.
 */
(function(w){
'use strict';
var N=w.NEXUS, raw=w.NEXUS_IDEA_TARGETS||{};
if(!N||!Array.isArray(N.families))return;
var hostMap={
  'new:contentGrid':'launcher','new:navigationActions':'nav','new:favorites':'launcher',
  'new:emptyState':'search','new:search-empty':'search','proposed:emptyState':'search',
  'new:designRules':'globalRules','proposed:usabilityRules':'globalRules',
  'proposed:visualPrinciples':'globalRules','new:designTokens-spacing':'globalRules',
  'new:designTokens-icons':'globalRules','new:designTokens-dates':'globalRules',
  'proposed:accessibilitySettings':'globalRules','new:accessibility':'globalRules','accessibility':'globalRules',
  'new:parallelBrowse':'fileLayout','new:collectionLayout':'fileLayout','proposed:collectionCards':'launcher',
  'proposed:typedObjects':'knowledge','new:contentTypeIcon':'knowledge','proposed:objectRenderer':'knowledge',
  'new:loadingState':'activity','loadingState':'activity','layoutStability':'activity',
  'new:errorState':'inbox','errorState':'inbox','new:feedbackState':'inbox','feedback':'inbox',
  'new:backToTop':'activity','scrollControls':'activity','refreshControl':'activity',
  'emptyState':'search','highlights':'reader','flow-navigation':'nav','navigationState':'nav','navigationHistory':'nav','keyboardMenu':'search',
  'documentSearch':'search','savedFilters':'filter','favorites':'launcher','tagging':'knowledge',
  'systemStatus':'activity','storageUsage':'settings','discovery':'continue','bottomSheet':'filter',
  'settingsLayout':'settings','systemLog':'activity','dangerZone':'settings','unsupportedState':'settings',
  'proposed:discovery':'continue','proposed:responsiveLayout':'launcher','proposed:dailyNote':'home',
  'proposed:maintenanceFlow':'files','proposed:archiveLifecycle':'files','proposed:savedViews':'launcher',
  'proposed:readerTheme':'reader','proposed:sharing':'knowledge','proposed:dynamicCollections':'launcher',
  'proposed:interactionStates':'globalRules'
};
var directHosts={
  header:'header',nav:'nav',quick:'quick',search:'search',launcher:'launcher',hero:'hero',
  stats:'stats',continue:'continue',activity:'activity',filter:'filter',mediaLayout:'mediaLayout',
  mediaCard:'mediaLayout',mediaDetail:'mediaDetail',season:'mediaDetail',storyLayout:'storyLayout',
  storyCard:'storyLayout',reader:'reader',readerTools:'readerTools',knowledge:'knowledge',graph:'knowledge',
  fileLayout:'fileLayout',fileCard:'fileLayout',inbox:'inbox',plugin:'plugin',
  surface:'global',type:'global',density:'global',shape:'global',motion:'global',labels:'global'
};
var existing={};N.families.forEach(function(f){existing[f.id]=f;});
var groups={}, ruleRows=[];
function norm(s){return String(s||'').toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();}
Object.keys(raw).sort().forEach(function(key){
 var v=raw[key]||{}, family=String(v.targetFamily||'').trim(), change=String(v.change||'').trim();
 if(!family||!change)return;
 if(v.rule){var sig=norm(change);var r=ruleRows.find(function(x){return x.sig===sig;});if(!r){r={key:key,change:change,sources:[],family:family};ruleRows.push(r);}r.sources.push(key);return;}
 var bucket=groups[family]||(groups[family]=[]);
 var signature=norm(change), item=bucket.find(function(x){return x.sig===signature;});
 if(!item){item={key:key,change:change,sources:[],family:family,overlapWith:[]};bucket.push(item);}
 item.sources.push(key);
 (Array.isArray(v.overlapWith)?v.overlapWith:[]).forEach(function(id){if(item.overlapWith.indexOf(id)<0)item.overlapWith.push(id);});
});
var families=[];
Object.keys(groups).sort().forEach(function(id){
 var f=existing[id], host=directHosts[id]||hostMap[id]||(/^(new|proposed):/.test(id)?'global':id);
 var options=groups[id];
 if(!f){
  f={id:id,name:'AI · '+id.replace(/^(new|proposed):/,'').replace(/[-_]/g,' '),group:'AI-integration · komponentfamiljer',options:[]};
  N.families.push(f);existing[id]=f;
 }
 var baseCount=f.options.length;
 options.forEach(function(o){f.options.push('AI · '+o.change);});
 families.push({id:id,host:host,baseCount:baseCount,options:options});
});
var designRules=existing.designRules;
if(!designRules){designRules={id:'designRules',name:'Globala designregler',group:'AI-integration · globala regler',options:[]};N.families.push(designRules);}
var ruleStart=designRules.options.length;
ruleRows.forEach(function(r){designRules.options.push('REGEL · '+r.change);});
w.NEXUS_IDEA_INTEGRATION={
 families:families,
 rules:ruleRows,
 ruleStart:ruleStart,
 ruleFamily:'designRules',
 hostMap:hostMap,
 directHosts:directHosts,
 version:1
};
})(window);
