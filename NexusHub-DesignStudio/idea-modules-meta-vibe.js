/* Finding-specific prototype renderers for Meta AI + Vibe research.
   Shared archetypes preserve each source finding separately; broad principles are shown as implementation criteria. */
(function(){
'use strict';
var N=window.NEXUS;
if(!N)return;
var esc=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
var all=window.NEXUS_IDEAS||[];
var nav=(N.views||[]), media=(N.data&&N.data.media)||[], stories=(N.data&&N.data.stories)||[], files=(N.data&&N.data.files)||[];
function family(title){
 var t=title.toLowerCase();
 if(/princip|konsekvens|mental modell|designstrategi|filosofi|identitet|omdesign|krav|designspråk|inte.decorativ|trust|strategi|läsning först|mobil =|mobil mindre|timeless|retention|varningsexempel/.test(t))return 'principle';
 if(/search|sök|filter|tagg|kategori|scope|sorter|smart/.test(t))return 'search-filter';
 if(/navigation|nav|meny|drawer|bottom|botten|destination|genväg|flik|tabb|toppnavigation|back|tillbaka/.test(t))return 'navigation';
 if(/reader|läs|typograf|serif|sans|fokusläge|reading|progress i|sidfärg|brödtext|aa-knapp/.test(t))return 'reader';
 if(/arkiv|dokument|pdf|upload|uppladd|mapp|clean|papperskorg|dublett|sparning/.test(t))return 'archive';
 if(/tomma|tomt|empty state|inga resultat/.test(t))return 'empty';
 if(/aktivitet|dagbok|recent|senast|journal/.test(t))return 'activity';
 if(/statistik|räknare|widget|personaliserad statistik/.test(t))return 'stats';
 if(/progress|framsteg|avsnitt|säsong|watchlist|statusbadge|status i kort/.test(t))return 'progress';
 if(/kort|affisch|poster|omslag|thumbnail|miniatyr|bildförhållande|masonry|kollage|hero-bakgrund/.test(t))return 'content-card';
 if(/färg|accent|yta|surface|skugga|hierarki|kontrast|opacity|opacitet|dark|mörk|geometr|pill|radius|spacing|luft|chrome|svart|vit|seremant/.test(t))return 'visual-system';
 if(/tillägg|plugin|katalog|extensions/.test(t))return 'catalog';
 if(/favorit|saved view|sparade vy|samling|collection|objekt/.test(t))return 'collections';
 if(/tryckyta|enhands|tumzon|tillgäng|skalning|skärmläs|font|lättlästa/.test(t))return 'accessibility';
 return 'workflow';
}
function target(kind){return kind==='reader'?'reader':kind==='archive'?'files':kind==='navigation'?'home':kind==='search-filter'?'films':kind==='activity'?'activity':kind==='catalog'?'plugins':kind==='collections'?'knowledge':kind==='stats'?'home':'films';}
function mediaCards(limit){
 return media.slice(0,limit||3).map(function(m){return '<button class="ai-module-media" data-open-media="'+esc(m.id)+'"><span style="background:'+esc(m.poster)+'">'+esc(m.glyph)+'</span><b>'+esc(m.title)+'</b><small>'+esc(m.year+' · '+m.type+' · ★ '+m.rating)+'</small></button>';}).join('');
}
function renderBody(kind,idea){
 if(kind==='content-card')return '<div class="ai-module-content-grid">'+mediaCards(3)+'</div><small>Affisch, status och metadata visas i en kompakt innehållsgrid.</small>';
 if(kind==='progress')return '<div class="ai-progress-list">'+media.slice(0,3).map(function(m,i){var p=[68,42,15][i];return '<button class="ai-module-row" data-open-media="'+esc(m.id)+'"><span>'+esc(m.glyph)+'</span><span><b>'+esc(m.title)+'</b><small>'+esc(m.type)+' · '+p+'% klart</small><i class="ai-progress-track"><i style="width:'+p+'%"></i></i></span><span>›</span></button>';}).join('')+'</div>';
 if(kind==='navigation')return '<nav class="ai-module-links" aria-label="Prototypnavigation">'+nav.slice(0,3).map(function(v){return '<button data-go="'+esc(v.id)+'">'+esc(v.icon+' '+v.name)+'</button>';}).join('')+'</nav><small>Tre synliga huvudmål; varje knapp öppnar motsvarande vy.</small>';
 if(kind==='search-filter')return '<div class="ai-module-links"><button data-action="search">⌕ Sök i hela Nexus</button><button data-action="idea-filter:Alla">Alla</button><button data-action="idea-filter:Film">Film</button><button data-action="idea-filter:Sett">Sett</button></div><small>Sök och filter öppnar eller uppdaterar prototypens biblioteksflöde.</small>';
 if(kind==='reader')return '<div class="ai-module-reader-tools"><button data-action="font-minus" aria-label="Minska text">A−</button><button data-action="font-plus" aria-label="Öka text">A+</button><button data-action="focus">Fokusläge</button></div><button class="ai-module-row" data-open-story="'+esc((stories[0]||{}).id||'dyatlov')+'"><span>◈</span><b>'+(esc((stories[0]||{}).title||'Öppna läsaren'))+'</b><span>→</span></button>';
 if(kind==='archive')return '<div class="ai-module-links"><button data-go="files">▤ Öppna arkivet</button><button data-file="0">Senast sparade dokumentet</button><button data-action="search">Sök i arkivet</button></div><small>'+(files.length||0)+' dokument i demobiblioteket.</small>';
 if(kind==='empty')return '<div class="ai-module-empty"><b>Inget innehåll ännu</b><p>Tomt läge med förklaring och en tydlig nästa åtgärd.</p><button data-go="'+target(kind)+'" class="action-btn">Utforska innehåll →</button></div>';
 if(kind==='activity')return '<div class="ai-module-activity"><div>◈ <b>Läsning</b><small>'+esc((stories[0]||{}).title||'Senaste dossier')+'</small></div><div>▣ <b>Media</b><small>'+esc((media[0]||{}).title||'Senast öppnat')+'</small></div><button data-go="activity">Visa hela historiken →</button></div>';
 if(kind==='stats')return '<div class="ai-module-stats"><span><b>'+media.length+'</b><small>titlar</small></span><span><b>'+stories.length+'</b><small>dossierer</small></span><span><b>'+files.length+'</b><small>dokument</small></span></div><button data-go="home">Visa startsidan</button>';
 if(kind==='catalog')return '<button class="ai-module-row" data-go="plugins"><span>✦</span><b>Sökbar tilläggskatalog</b><small>Kategorier · installerade · upptäck</small><span>→</span></button>';
 if(kind==='collections')return '<div class="ai-module-links"><button data-go="knowledge">◇ Sparade objekt</button><button data-go="files">▤ Samlingar</button><button data-action="builder">Skapa en vy</button></div>';
 if(kind==='accessibility')return '<div class="ai-module-reader-tools"><button data-action="font-minus">A−</button><button data-action="font-plus">A+</button><button data-action="focus">Växla fokusläge</button></div><small>Kontroller ändrar läsinställningar i denna prototyp.</small>';
 if(kind==='visual-system')return '<div class="ai-module-swatches"><i></i><i></i><i></i></div><small>Tre nivåer av mörka ytor och en accent med semantisk roll.</small><button data-action="builder">Jämför tema i byggaren</button>';
 if(kind==='principle')return '<details class="ai-module-criteria" open><summary>Designprincip · acceptanskriterier</summary><ul><li>Behåll källans avsikt: '+esc(idea.title.replace(/^[–—\s]+/,''))+'</li><li>Kontrollera läsbarhet och tydlig hierarki på mobil.</li><li>Prova med Nexus demodata före godkännande.</li></ul><button data-action="builder">Öppna komponentbyggaren</button></details>';
 return '<div class="ai-module-workflow"><button data-go="'+target(kind)+'">Prova flödet i Nexus →</button><button data-action="search">Sök</button><details><summary>Fyndets avsikt</summary><p>'+esc(idea.title)+'</p></details></div>';
}
function make(idea){var kind=family(idea.title);return {kind:kind,title:idea.title,source:idea.model+' '+idea.id,render:function(x){return renderBody(kind,x||idea);}};}
var registry=window.NEXUS_IDEA_MODULES||(window.NEXUS_IDEA_MODULES={});
all.filter(function(x){return x.model==='Meta AI'||x.model==='Vibe';}).forEach(function(x){registry[x.model+'::'+x.id]=make(x);});
})();