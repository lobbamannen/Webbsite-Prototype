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
var auditedClusters=[{"name":"poster_status_badge","ids":["Copilot::UX-002","DeepSeek::UX-008","Grok::UX-002","Vibe::UX-001","Gemini Argon::UX-017"]},{"name":"title_below_poster","ids":["Copilot::UX-001","Meta AI::UX-001","Kimi::FYND-21","Vibe::UX-004"]},{"name":"density_view_switch","ids":["Copilot::UX-012","Copilot::UX-023","DeepSeek::UX-001","DeepSeek::UX-015","Kimi::FYND-59","Perplexity::UX-057","Vibe::UX-070"]},{"name":"central_primary_action","ids":["DeepSeek::UX-002","Grok::UX-001"]},{"name":"backlinks","ids":["DeepSeek::UX-011","Gemini Argon::UX-052"]},{"name":"related_content_recommendations","ids":["Copilot::UX-009","Kimi::FYND-61"]},{"name":"reader_toc_navigation","ids":["Copilot::UX-021","DeepSeek::UX-021","Kimi::FYND-55","Perplexity::UX-064","Gemini Argon::UX-034"]},{"name":"reader_typography_controls","ids":["DeepSeek::UX-024","Grok::UX-005","Meta AI::UX-011","Meta AI::UX-038","Kimi::FYND-53","Vibe::UX-049","Perplexity::UX-039"]},{"name":"reader_focus_mode","ids":["DeepSeek::UX-019","Meta AI::UX-013","Meta AI::UX-040","Perplexity::UX-063"]},{"name":"reader_auto_hide_chrome","ids":["DeepSeek::UX-036","Grok::UX-004","Kimi::FYND-57","Gemini Argon::UX-040"]},{"name":"reader_scroll_progress","ids":["Kimi::FYND-56","Vibe::UX-052","Gemini Argon::UX-033"]},{"name":"media_card_playback_progress","ids":["DeepSeek::UX-065","Kimi::FYND-23","Vibe::UX-002","Gemini Argon::UX-003"]},{"name":"activity_timeline","ids":["Copilot::UX-017","DeepSeek::UX-032","Kimi::FYND-32","Kimi::FYND-71","Vibe::UX-007","Gemini Argon::UX-011"]},{"name":"command_palette","ids":["DeepSeek::UX-039","Meta AI::UX-071","Gemini Argon::UX-006"]},{"name":"search_results_by_type","ids":["DeepSeek::UX-044","Meta AI::UX-028","Kimi::FYND-46"]},{"name":"bottom_nav_max_five","ids":["Copilot::UX-025","DeepSeek::UX-035","Kimi::FYND-13","Meta AI::UX-023","Perplexity::UX-001","Gemini Argon::UX-066"]},{"name":"navigation_vs_action","ids":["Copilot::UX-015","Kimi::FYND-14","Perplexity::UX-006"]},{"name":"single_semantic_accent","ids":["DeepSeek::UX-047","DeepSeek::UX-079","Kimi::FYND-02","Meta AI::UX-017","Meta AI::UX-035","Vibe::UX-072","Vibe::UX-080","Perplexity::UX-080"]},{"name":"minimum_touch_target","ids":["DeepSeek::UX-072","Kimi::FYND-48","Meta AI::UX-030","Gemini Argon::UX-072"]},{"name":"accent_focus_ring","ids":["DeepSeek::UX-071","Kimi::FYND-10","Gemini Argon::UX-092"]},{"name":"skeleton_loading","ids":["DeepSeek::UX-056","DeepSeek::UX-057","Kimi::FYND-52","Perplexity::UX-081","Gemini Argon::UX-077"]},{"name":"back_to_top","ids":["DeepSeek::UX-082","Gemini Argon::UX-079"]},{"name":"removable_active_filter_chips","ids":["DeepSeek::UX-031","DeepSeek::UX-043","Kimi::FYND-36","Kimi::FYND-42","Perplexity::UX-054","Vibe::UX-064"]},{"name":"quick_filter_chips","ids":["Copilot::UX-003","DeepSeek::UX-030","Grok::UX-008","Kimi::FYND-34","Meta AI::UX-034","Perplexity::UX-053","Vibe::UX-012","Gemini Argon::UX-024"]},{"name":"sticky_filter_subheader","ids":["Copilot::UX-004","Gemini Argon::UX-070"]},{"name":"generic_empty_state_cta","ids":["Copilot::UX-018","DeepSeek::UX-058","Kimi::FYND-73","Perplexity::UX-082","Vibe::UX-091","Vibe::UX-092","Gemini Argon::UX-078"]},{"name":"saved_views_or_searches","ids":["DeepSeek::UX-046","Perplexity::UX-043","Perplexity::UX-044","Vibe::UX-046"]},{"name":"expandable_secondary_metadata","ids":["Copilot::UX-022","DeepSeek::UX-018","DeepSeek::UX-069","Kimi::FYND-51"]},{"name":"restore_scroll_position","ids":["Perplexity::UX-007","Kimi::FYND-45","Gemini Argon::UX-073"]},{"name":"document_master_detail","ids":["Kimi::FYND-62","Gemini Argon::UX-051"]},{"name":"filter_zero_results_recovery","ids":["DeepSeek::UX-060","Kimi::FYND-38"]},{"name":"search_zero_results_recovery","ids":["DeepSeek::UX-045","Kimi::FYND-74"]},{"name":"title_and_status_first_group","ids":["DeepSeek::UX-063","Kimi::FYND-25","Meta AI::UX-026"]}];
function resolvedHost(id){return directHosts[id]||hostMap[id]||(/^(new|proposed):/.test(id)?'global':id);}
var clusterFor={},mergedClusterCount=0,mergedSourceCount=0;
auditedClusters.forEach(function(c){
 var valid=c.ids.filter(function(id){return !!raw[id]&&!raw[id].rule;});
 if(valid.length<2)return;
 var fs={},hs={};valid.forEach(function(id){var f=String(raw[id].targetFamily||'');fs[f]=(fs[f]||0)+1;var h=resolvedHost(f);hs[h]=(hs[h]||0)+1;});
 var familyNames=Object.keys(fs),hostNames=Object.keys(hs);
 if(familyNames.length!==1&&hostNames.length!==1)return;
 var canonicalFamily=familyNames.sort(function(a,b){return fs[b]-fs[a]||c.ids.indexOf(a)-c.ids.indexOf(b);})[0];
 var merged={name:c.name,key:valid[0],family:canonicalFamily,sourceFamilies:{}};
 valid.forEach(function(id){clusterFor[id]=merged;merged.sourceFamilies[id]=raw[id].targetFamily;});
 mergedClusterCount++;mergedSourceCount+=valid.length;
});
var ruleClusterFor={},mergedRuleClusterCount=0,mergedRuleSourceCount=0;
auditedClusters.forEach(function(c){
 var ids=c.ids.filter(function(id){return !!raw[id]&&!!raw[id].rule;});
 if(ids.length<2)return;
 var item={name:c.name,key:ids[0]};
 ids.forEach(function(id){ruleClusterFor[id]=item;});
 mergedRuleClusterCount++;mergedRuleSourceCount+=ids.length;
});
Object.keys(raw).sort().forEach(function(key){
 var v=raw[key]||{}, sourceFamily=String(v.targetFamily||'').trim(), change=String(v.change||'').trim();
 if(!sourceFamily||!change)return;
 if(v.rule){var rc=ruleClusterFor[key],rsig=rc?'audited-rule:'+rc.name:norm(change),canonicalRule=rc&&raw[rc.key]?raw[rc.key]:v;var r=ruleRows.find(function(x){return x.sig===rsig;});if(!r){r={key:rc?rc.key:key,change:String(canonicalRule.change||change),sources:[],sourceFamilies:{},family:'designRules',sig:rsig,cluster:rc?rc.name:null};ruleRows.push(r);}if(r.sources.indexOf(key)<0)r.sources.push(key);r.sourceFamilies[key]=sourceFamily;return;}
 var cluster=clusterFor[key],family=cluster?cluster.family:sourceFamily;
 var bucket=groups[family]||(groups[family]=[]);
 var signature=cluster?'audited:'+cluster.name:norm(change);
 var item=bucket.find(function(x){return x.sig===signature;});
 if(!item){var canonical=cluster&&raw[cluster.key]?raw[cluster.key]:v;item={key:cluster?cluster.key:key,change:String(canonical.change||change),sources:[],sourceFamilies:{},family:family,sig:signature,cluster:cluster?cluster.name:null,overlapWith:[]};bucket.push(item);}
 if(item.sources.indexOf(key)<0)item.sources.push(key);
 item.sourceFamilies[key]=sourceFamily;
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
 version:2,
 mergedClusters:mergedClusterCount,
 mergedSources:mergedSourceCount,
 mergedRuleClusters:mergedRuleClusterCount,
 mergedRuleSources:mergedRuleSourceCount
};
})(window);
