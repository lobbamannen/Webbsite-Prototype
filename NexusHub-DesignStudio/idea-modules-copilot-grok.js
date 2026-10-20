/* Copilot + Grok research-finding prototypes.
 * Individual model::id routing keeps source provenance explicit.
 * Shared render primitives are prototypes, not production integrations.
 */
(function(){
'use strict';
var N=window.NEXUS;
if(!N)return;
var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
var types={
"Copilot::UX-001":"poster","Copilot::UX-002":"status","Copilot::UX-003":"filters","Copilot::UX-004":"sticky-filters","Copilot::UX-005":"quiet-meta","Copilot::UX-006":"active-nav","Copilot::UX-007":"large-headings","Copilot::UX-008":"continue","Copilot::UX-009":"related","Copilot::UX-010":"breadcrumbs",
"Copilot::UX-011":"grid","Copilot::UX-012":"compact-list","Copilot::UX-013":"cover-summary","Copilot::UX-014":"large-hitarea","Copilot::UX-015":"nav-actions","Copilot::UX-016":"favorites","Copilot::UX-017":"activity","Copilot::UX-018":"empty-next","Copilot::UX-019":"persistent-search","Copilot::UX-020":"focus-reader","Copilot::UX-021":"toc","Copilot::UX-022":"progressive-meta","Copilot::UX-023":"grid-list","Copilot::UX-024":"spacing","Copilot::UX-025":"five-targets","Copilot::UX-026":"context-nav","Copilot::UX-027":"category-cards","Copilot::UX-028":"info-panel","Copilot::UX-029":"accent-palette","Copilot::UX-030":"design-system",
"Grok::UX-001":"central-action","Grok::UX-002":"poster-status","Grok::UX-003":"immersive-detail","Grok::UX-004":"auto-hide-nav","Grok::UX-005":"appearance","Grok::UX-006":"search-page","Grok::UX-007":"glass-nav","Grok::UX-008":"advanced-filters","Grok::UX-009":"progress","Grok::UX-010":"parallel-browse"
};
var titles={};
function itemBy(id){return N.data.media.find(function(x){return x.id===id;});}
function posterCard(id,extra){var m=itemBy(id)||N.data.media[0];return '<article class="card idea-proto-poster"><div class="poster" style="background:'+esc(m.poster)+'"><span class="poster-glyph">'+esc(m.glyph)+'</span>'+extra+'</div><div class="poster-info"><h4>'+esc(m.title)+'</h4><small>'+m.year+' · '+m.type+' · ★ '+m.rating+'</small></div></article>';}
function status(extra){return '<span class="idea-proto-badge">'+extra+'</span>';}
function controls(){return '<div class="idea-proto-controls"><button type="button" aria-pressed="true">Grid</button><button type="button" aria-pressed="false">Lista</button></div>';}
function render(idea,ctx){
 var key=idea.model+'::'+idea.id,type=types[key]||'principle',title=esc(idea.title),media=N.data.media,story=N.data.stories[0],html='';
 switch(type){
 case 'poster': html='<div class="idea-proto-row">'+posterCard('severance',status('Pågår'))+'<p>Omslaget leder; titel och status följer efter.</p></div>';break;
 case 'status': html=posterCard('dark',status('Sett'))+posterCard('silo',status('Vill se'));break;
 case 'filters': case 'sticky-filters': case 'advanced-filters': html='<div class="idea-proto-filter'+(type==='sticky-filters'?' is-sticky':'')+'"><button>Alla · 8</button><button>Film · 4</button><button>Serie · 4</button><button>Vill se · 3</button><button>Rensa</button></div><div class="idea-proto-mini-grid">'+media.slice(0,3).map(function(m){return posterCard(m.id,'');}).join('')+'</div>';break;
 case 'quiet-meta': html=posterCard('arrival','')+'<p class="idea-proto-muted">2016 · Film · ★ 7.9 <details><summary>Visa fler detaljer</summary><p>Sci-fi · Drama</p></details></p>';break;
 case 'active-nav': case 'central-action': case 'glass-nav': case 'auto-hide-nav': html='<nav class="idea-proto-nav" aria-label="Modulnavigation"><button>Hem</button><button>Bibliotek</button><button class="primary">＋<small>'+(type==='central-action'?'Logga':'Skapa')+'</small></button><button>Sök</button><button>Profil</button></nav><p>Vald vy markeras tydligt; den centrala åtgärden har separat knapp.</p>';break;
 case 'large-headings': html='<div class="idea-proto-heading"><small>FILM & SERIER / 08 TITLAR</small><h2>Fortsätt upptäcka</h2><p>Stor rubrik gör sektionsstart lätt att hitta.</p></div>';break;
 case 'continue': case 'progress': html='<div class="idea-proto-continue">'+media.slice(0,3).map(function(m,i){return '<div class="idea-proto-progress-row">'+posterCard(m.id,'')+'<div><b>'+esc(m.progress)+'</b><progress max="100" value="'+[62,100,24][i]+'"></progress><button type="button">Fortsätt</button></div></div>';}).join('')+'</div>';break;
 case 'related': html='<div class="idea-proto-related"><h4>Relaterat till Djatlovpasset</h4>'+N.data.nodes.slice(0,4).map(function(n){return '<button type="button">'+esc(n.id)+' <small>'+esc(n.kind)+'</small></button>';}).join('')+'</div>';break;
 case 'breadcrumbs': html='<nav aria-label="Brödsmulor" class="idea-proto-crumb"><a>Arkiv</a><span>›</span><a>Mysterier</a><span>›</span><b>Djatlovpasset</b></nav><h4>Dossierdetaljer</h4><p>Brödsmulan visas på djupa nivåer.</p>';break;
 case 'grid': case 'category-cards': html='<div class="idea-proto-grid">'+N.data.modules.slice(0,4).map(function(m){return '<button class="card" type="button"><b>'+esc(m.icon)+' '+esc(m.name)+'</b><small>'+esc(m.desc)+'</small></button>';}).join('')+'</div>';break;
 case 'compact-list': html='<div class="idea-proto-list">'+N.data.files.map(function(f){return '<button type="button"><b>'+esc(f.icon)+' '+esc(f.name)+'</b><small>'+esc(f.type)+' · '+esc(f.size)+'</small></button>';}).join('')+'</div>';break;
 case 'cover-summary': html='<article class="idea-proto-cover"><span>◈</span><div><small>'+esc(story.eyebrow)+'</small><h4>'+esc(story.title)+'</h4><p>'+esc(story.desc)+'</p><button type="button">Öppna berättelse</button></div></article>';break;
 case 'large-hitarea': html='<button class="idea-proto-hitarea" type="button"><b>Öppna Severance</b><small>Hela raden är klickbar · 56 px tryckyta</small><span>→</span></button>';break;
 case 'nav-actions': html='<div class="idea-proto-separated"><nav><button>Film</button><button>Berättelser</button><button>Filer</button></nav><div><button>♡ Spara</button><button>••• Mer</button></div></div>';break;
 case 'favorites': html='<div class="idea-proto-favorite"><button type="button" aria-pressed="false">♡ Lägg Severance i favoriter</button><button type="button" aria-pressed="true">♥ Arrival är favorit</button></div>';break;
 case 'activity': html='<ol class="idea-proto-timeline"><li><b>Idag · Läsning</b><span>Djatlovpasset · anteckning uppdaterad</span></li><li><b>Igår · Film</b><span>Severance · avsnitt 4</span></li><li><b>Måndag · Kunskap</b><span>Nya relationer i grafen</span></li></ol>';break;
 case 'empty-next': html='<div class="idea-proto-empty"><span>⌕</span><h4>Inga träffar ännu</h4><p>Prova en annan sökning eller rensa filtren.</p><button type="button">Rensa filter</button></div>';break;
 case 'persistent-search': case 'search-page': html='<div class="idea-proto-search"><label>Sök i hela Nexus<input type="search" placeholder="Titel, dossier eller dokument…"></label><small>Sökfältet ligger kvar medan resultaten visas</small><div><button>Severance · Film & serier</button><button>Djatlovpasset · Berättelser</button></div></div>';break;
 case 'focus-reader': html='<article class="idea-proto-reader"><header><small>BERÄTTELSER / KAPITEL 2 AV 6</small><button type="button">Visa sidopanel</button></header><h3>'+esc(story.title)+'</h3><p>'+esc(story.desc)+'</p><p>Texten får en lugn, centrerad läsyta medan sidonavigeringen tonas undan.</p></article>';break;
 case 'toc': html='<details class="idea-proto-toc" open><summary>Innehåll · 3 kapitel</summary><a>01 · Översikt</a><a>02 · Tidslinje</a><a>03 · Källor</a></details>';break;
 case 'progressive-meta': html=posterCard('severance','')+'<details class="idea-proto-details"><summary>Visa metadata</summary><p>2022 · Serie · Mystik · Sci-fi · ★ 8.7</p></details>';break;
 case 'grid-list': html=controls()+'<div class="idea-proto-switch"><div class="idea-proto-mini-grid">'+media.slice(0,2).map(function(m){return posterCard(m.id,'');}).join('')+'</div><div class="idea-proto-list">'+media.slice(0,2).map(function(m){return '<button>'+esc(m.title)+' · '+m.year+'</button>';}).join('')+'</div></div>';break;
 case 'spacing': case 'accent-palette': case 'design-system': html='<div class="idea-proto-tokens"><span style="--sw:#a78bfa"></span><span style="--sw:#c4b5fd"></span><span style="--sw:#ddd6fe"></span><p>Gemensamma tokens: accent, yta, text, mellanrum och hörnradie.</p><div class="idea-proto-spacing"><i></i><i></i><i></i></div></div>';break;
 case 'five-targets': html='<nav class="idea-proto-nav" aria-label="Fem primära destinationer">'+N.views.slice(0,5).map(function(v){return '<button>'+esc(v.icon)+' '+esc(v.name)+'</button>';}).join('')+'</nav><p>Fem huvuddestinationer visas; övriga finns i sekundär navigation.</p>';break;
 case 'context-nav': html='<details class="idea-proto-context"><summary>Fler dossieråtgärder</summary><button>Visa relaterade</button><button>Exportera anteckning</button><button>Öppna källor</button></details>';break;
 case 'info-panel': html='<div class="idea-proto-info"><section><small>DETALJ</small><h4>Severance</h4><p>Serie · 2022 · ★ 8.7</p></section><aside><b>Status</b><p>Pågår · Säsong 2 avsnitt 4</p><b>Genre</b><p>Mystik · Sci-fi</p></aside></div>';break;
 case 'immersive-detail': html='<div class="idea-proto-immersive" style="background:'+esc(media[0].poster)+'"><small>SERIE · 2022</small><h3>Severance</h3><p>Visuell titelbildyta prioriteras framför teknisk metadata.</p><button>Öppna detaljer</button></div>';break;
 case 'appearance': html='<div class="idea-proto-appearance"><label>Tema<select><option>Natt</option><option>Sepia</option><option>Ljust papper</option></select></label><label>Textstorlek<input type="range" min="14" max="26" value="18"></label><label>Radbredd<select><option>Smal</option><option>Normal</option><option>Bred</option></select></label></div>';break;
 case 'parallel-browse': html='<div class="idea-proto-split"><section><h4>Spelar nu</h4>'+posterCard('severance','')+'</section><section><h4>Bläddra vidare</h4>'+posterCard('dark','')+'</section></div>';break;
 default: html='<div class="idea-proto-principle"><b>Designregel</b><p>'+esc(idea.title)+'</p><small>Detta fynd är en systemprincip och visas som granskningskriterium, inte som fristående kontroll.</small></div>';
 }
 return '<section class="idea-specific-prototype" data-idea-key="'+esc(key)+'"><header><span>PROTOTYP · '+esc(idea.model)+' / '+esc(idea.id)+'</span><h3>'+title+'</h3></header><div class="idea-specific-body">'+html+'</div></section>';
}
Object.keys(types).forEach(function(key){
 var [model,id]=key.split('::');
 window.NEXUS_IDEA_MODULES=window.NEXUS_IDEA_MODULES||{};
 window.NEXUS_IDEA_MODULES[key]={model:model,id:id,behavior:types[key],render:render};
});
})();
