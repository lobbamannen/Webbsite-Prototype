"use strict";
const root=document.getElementById("app");
const paths={
home:"M12 3 2 12h3v9h6v-6h2v6h6v-9h3L12 3Z",
search:"m21 21-4.35-4.35 M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16",
refresh:"M20 11a8 8 0 0 0-14.5-5M4 4v6h6 M4 13a8 8 0 0 0 14.5 5M20 20v-6h-6",
menu:"M4 6h16 M4 12h16 M4 18h16",
plus:"M12 5v14 M5 12h14",
book:"M12 7C9 4 5 4 2 5v14c4-1 7 0 10 3 3-3 6-4 10-3V5c-3-1-7-1-10 2Zm0 0v15",
film:"M4 11h16v10H4z M3 4l17-2 1 6-17 3z M7 3l4 7 M14 2l4 7",
database:"M3 6c0-5 18-5 18 0s-18 5-18 0Zm0 0v12c0 5 18 5 18 0V6 M3 12c0 5 18 5 18 0",
puzzle:"M8 3h5c0 3 4 3 4 0h4v6c-3 0-3 4 0 4v8h-7c0-3-4-3-4 0H3v-7c3 0 3-4 0-4V3h5Z",
folder:"M3 6h7l2 3h9v11H3z",
bookmark:"M5 3h14v19l-7-5-7 5z",
chevron:"m9 18 6-6-6-6",
eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7Zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
layers:"m12 2 10 6-10 6L2 8l10-6Zm-10 11 10 6 10-6",
tv:"M3 5h18v13H3z M8 22h8",
tools:"M4 20 16 8 M15 4a5 5 0 0 0 6 6l-5 5-6-6z",
archive:"M3 4h18v5H3z M5 9h14v12H5z M10 13h4",
file:"M6 2h8l5 5v15H6z M14 2v5h5",
check:"M20 6 9 17l-5-5 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20",
clock:"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v5l3 2",
x:"M5 5l14 14 M19 5 5 19"
};
const icon=(name,size=22,cl="")=>'<svg class="'+cl+'" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(paths[name]||paths.file)+'"/></svg>';
const modules=[
["filmer","Film & serier","Dina filmer, serier och betyg","film","purple","cinema","237 filmer · 127 serier"],
["berattelser","Berättelser","Research, mysterier och historier","book","pink","stories","25 berättelser"],
["databas","Kunskapsbanken","Dokument, metoder och forskning","database","blue","knowledge",""],
["plugins","Plugins","Dina ChatGPT-verktyg","puzzle","cyan","plugins","18 pluginpaket"],
["sok","Utforska filer","Sök och bläddra i GitHub-databasen","folder","blue","files",""],
["villse","Vill se","Filmer och serier på din lista","bookmark","purple","upload","4 objekt"]
];
const nav=[["hem","Hem","home"],["databas","Databas","layers"],["mysterier","Mysterier","eye"],["berattelser","Berättelser","book"],["filmer","Filmer","film"],["serier","Serier","tv"],["plugins","Plugins","puzzle"],["upptack","Upptäck","layers"],["verktyg","Verktyg","tools"],["nyheter","Nyhetsarkiv","file"],["favoriter","Sparade","bookmark"],["arkiv","Tekniskt arkiv","archive"],["sok","Utforska filer","search"],["villse","Vill se","bookmark"],["installningar","Inställningar & system","tools"]];
const demo={
filmer:[["Sagan om ringen: Härskarringen","Film · Sett"],["The Dark Knight","Film · Sett"],["Interstellar","Film · Sett"],["Inception","Film · Vill se"]],
serier:[["Silo","Serie · Sett"],["Breaking Bad","Serie · Sett"],["Gåsmamman","Serie · Sett"]],
berattelser:[["Olösta mysterier","Berättelser · Research"],["Historiska undersökningar","Berättelser · Historia"],["Undersökningar","Berättelser · Fakta"]],
mysterier:[["Olösta mysterier","Mysterier · Research"],["Historiska gåtor","Mysterier · Historia"]],
plugins:[["Deep Research Integrated","Pluginpaket · Exempel"],["Knowledge Tools","Pluginpaket · Exempel"]],
databas:[["Research och undersökningar","Kunskapsbanken · Dokument"],["Metoder och verktyg","Kunskapsbanken · Metoder"]],
sok:[["Dokument och forskningsmaterial","Filer · Exempel"],["Berättelser","Mapp · Exempel"],["Kunskapsbanken","Mapp · Exempel"]],
villse:[["Inception","Film · Vill se"],["Exempelserie","Serie · Vill se"]]
};
let view="hem",menuOpen=false,dialog="",filter="",recentTab="filmer",query="";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function go(page){view=page;dialog="";menuOpen=false;filter="";query="";location.hash=page;render();window.scrollTo({top:0,behavior:"instant"})}
function mainHome(){return '<div class="nh-home">'+
'<section class="nh-dashboard-stats nh-surface" aria-labelledby="nh-statistics-title"><button class="nh-total-link" data-go="sok"><span class="nh-total-icon">'+icon("database",30)+'</span><span class="nh-total-copy"><span class="nh-total-heading" id="nh-statistics-title">Din databas</span><span class="nh-total-count"><strong>3 488</strong><span>filer i GitHub</span></span></span></button><div class="nh-sync-state"><span>'+icon("check",15)+'Katalog hämtad</span><time>Exempelstatus · demo</time></div></section>'+
'<section class="nh-modules" aria-label="Utforska Nexus Hub"><div class="nh-module-grid">'+modules.map(m=>'<button class="nh-module-card nh-tone-'+m[4]+' nh-art-'+m[5]+'" data-go="'+m[0]+'"><span class="nh-module-symbol">'+icon(m[3],35)+'</span><span class="nh-module-copy"><strong>'+m[1]+'</strong><span>'+m[2]+'</span>'+(m[6]?'<span class="nh-module-count">'+m[6]+'</span>':"")+'</span><span class="nh-module-decoration">'+icon(m[3],125)+'</span>'+icon("chevron",22,"nh-module-chevron")+'</button>').join("")+'</div></section>'+
'<section class="nh-recent nh-surface"><div class="nh-section-top"><div class="nh-section-heading">'+icon("clock",25)+'<div><h2>Senaste i Nexus Hub</h2><p>Förhandsvisning av kort och navigering</p></div></div></div><div class="nh-recent-tabs">'+[["filmer","Filmer"],["serier","Serier"],["berattelser","Berättelser"],["sok","Filer"]].map(t=>'<button class="'+(recentTab===t[0]?"active":"")+'" data-tab="'+t[0]+'">'+t[1]+'</button>').join("")+'</div><div class="nh-recent-demo">'+(demo[recentTab]||demo.sok).map((x,i)=>'<button class="nh-recent-list-card" data-detail="'+i+'"><strong>'+esc(x[0])+'</strong><small>'+esc(x[1])+'</small>'+icon("chevron",18,"nh-card-arrow")+'</button>').join("")+'</div></section></div>'}
function modulePage(){let m=modules.find(x=>x[0]===view),name=m?.[1]||nav.find(x=>x[0]===view)?.[1]||"Nexus Hub",items=demo[view]||[["Översikt",name+" · Designexempel"],["Utforska",name+" · Designexempel"]];if(view==="filmer")items=[...demo.filmer,...demo.serier];if(view==="nyheter")items=[["Nyhetsarkiv","Nyheter · Demo"]];return '<section class="page-heading"><span class="module-icon large">'+icon(m?.[3]||"layers",27)+'</span><div><p class="eyebrow">NEXUS HUB · UI/UX-FÖRHANDSVISNING</p><h1>'+name+'</h1><p>Utseende och navigation i designverkstaden</p></div></section><div class="demo-toolbar">'+icon("search",20)+'<input id="demo-search" placeholder="Sök bland exempelposter…" value="'+esc(query)+'"></div><div class="demo-filters">'+["Alla","Sett","Inte sett","Vill se"].map(f=>'<button data-filter="'+f+'" class="'+((filter||"Alla")===f?"selected":"")+'">'+f+'</button>').join("")+'</div><div class="demo-panel"><h2>'+name+'</h2><p>Interaktiv förhandsvisning med fiktiva poster. Inga anrop görs till den privata databasen.</p><div id="demo-rows">'+listRows(items)+'</div></div>'}
function listRows(items){return items.filter(x=>(!filter||filter==="Alla"||x.join(" ").includes(filter))&&x.join(" ").toLowerCase().includes(query.toLowerCase())).map((x,i)=>'<button class="demo-row" data-detail="'+i+'"><span><strong>'+esc(x[0])+'</strong><small>'+esc(x[1])+'</small></span>'+icon("chevron",20)+'</button>').join("")||'<p>Inga träffar.</p>'}
function overlay(){if(!menuOpen&&!dialog)return "";if(menuOpen)return '<div class="demo-overlay" data-action="dismiss"><div class="demo-sheet" role="dialog"><button class="demo-close" data-action="dismiss">'+icon("x",19)+'</button><h2>Meny</h2><div class="demo-menu-grid">'+nav.map(n=>'<button data-go="'+n[0]+'">'+icon(n[2],18)+' '+n[1]+'</button>').join("")+'</div></div></div>';return '<div class="demo-overlay" data-action="dismiss"><div class="demo-sheet" role="dialog"><button class="demo-close" data-action="dismiss">'+icon("x",19)+'</button><p class="eyebrow">DESIGNVERKSTAD · DEMO</p><h2>'+esc(dialog)+'</h2><div class="demo-reader"><p>Detta är en interaktiv detaljvisning för att prova Nexus Hubs originaldesign, navigering och läsbarhet. Innehållet är fiktivt.</p><p>Här kan vi tillsammans justera gränssnittet utan att ändra Nexus Hubs riktiga filer eller data.</p></div></div></div>'}
function render(){
root.innerHTML='<div class="app-shell portal-shell"><aside class="sidebar"><a class="brand" href="#hem" data-go="hem"><img src="./original/favicon.svg" alt=""><span>NEXUS <b>HUB</b></span></a><p class="side-label">DIN KUNSKAP</p>'+nav.slice(0,12).map(n=>'<button class="nav-item '+(view===n[0]?"active":"")+'" data-go="'+n[0]+'">'+icon(n[2],19)+n[1]+'</button>').join("")+'<div class="sidebar-bottom"><button class="nav-item" data-action="upload">'+icon("plus",19)+'Bifoga dokument</button><button class="nav-item" data-go="installningar">'+icon("tools",19)+'Inställningar & system</button></div></aside>'+
'<div class="workspace"><header class="topbar"><a class="brand mobile-brand" href="#hem" data-go="hem"><img src="./original/favicon.svg" alt=""><span>NEXUS <b>HUB</b></span></a><div class="breadcrumb desktop-only">Din kunskap '+icon("chevron",14)+' '+(nav.find(n=>n[0]===view)?.[1]||"Hem")+'</div><div class="header-actions"><span class="private-pill"><span></span>Privat</span><button class="icon-button hub-top-search" aria-label="Sök i Nexus Hub" data-go="sok">'+icon("search",21)+'</button><button class="icon-button" aria-label="Uppdatera" data-action="refresh">'+icon("refresh",21)+'</button><button class="icon-button" aria-label="Öppna meny" data-action="menu">'+icon("menu",24)+'</button></div></header>'+
'<main>'+(view==="hem"?mainHome():modulePage())+'</main></div>'+
'<nav class="bottom-nav" aria-label="Huvudnavigation"><button class="'+(view==="hem"?"active":"")+'" data-go="hem">'+icon("home",22)+'<span>Hem</span></button><button class="'+(["berattelser","mysterier"].includes(view)?"active":"")+'" data-go="berattelser">'+icon("book",22)+'<span>Berättelser</span></button><button class="add-nav" data-action="upload"><span>'+icon("plus",26)+'</span><small>Lägg till</small></button><button class="'+(["filmer","serier"].includes(view)?"active":"")+'" data-go="filmer">'+icon("film",22)+'<span>Film & serier</span></button><button data-action="menu">'+icon("menu",22)+'<span>Meny</span></button></nav>'+
overlay()+'</div>';
}
root.addEventListener("click",e=>{const b=e.target.closest("[data-go],[data-action],[data-tab],[data-filter],[data-detail]");if(b){if(b.dataset.go){e.preventDefault();go(b.dataset.go)}else if(b.dataset.tab){recentTab=b.dataset.tab;render()}else if(b.dataset.filter){filter=b.dataset.filter;render()}else if(b.dataset.detail!==undefined){let src=view==="hem"?recentTab:view;let items=demo[src]||demo.sok;dialog=items[Number(b.dataset.detail)]?.[0]||"Detaljer";render()}else if(b.dataset.action==="menu"){menuOpen=true;render()}else if(b.dataset.action==="dismiss"){menuOpen=false;dialog="";render()}else if(b.dataset.action==="refresh"){render()}else if(b.dataset.action==="upload"){dialog="Lägg till dokument";render()}return}if(e.target.classList.contains("demo-overlay")){menuOpen=false;dialog="";render()}});
root.addEventListener("input",e=>{if(e.target.id==="demo-search"){const pos=e.target.selectionStart;query=e.target.value;const items=view==="filmer"?[...demo.filmer,...demo.serier]:demo[view]||[];const el=document.getElementById("demo-rows");if(el)el.innerHTML=listRows(items);}});
window.addEventListener("hashchange",()=>{const h=location.hash.slice(1);if(h&&nav.some(n=>n[0]===h)&&h!==view){view=h;render()}});
const start=location.hash.slice(1);if(nav.some(n=>n[0]===start))view=start;render();
