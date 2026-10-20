// Only explicit overrides are stored. An empty design renders the original components.
export const STORAGE_KEY='nexus-original-studio-v2';
export const GROUPS=[
 {id:'global',name:'Utseende',view:null}, {id:'home',name:'Startsida',view:'hem'},
 {id:'cards',name:'Modulkort',view:'hem'}, {id:'navigation',name:'Navigation',view:null},
 {id:'media',name:'Film & serier',view:'filmer'}, {id:'stories',name:'Berättelser',view:'berattelser'},
 {id:'reader',name:'Läsning',view:'berattelser'}, {id:'files',name:'Filer & plugins',view:'sok'}
];
const choice=(key,label,options,description)=>({key,label,options:[['original','Original'],...options],description});
export const CONTROLS=[
 choice('global.background','Bakgrund',[['oled','OLED-svart'],['ink','Varmt bläck'],['purple','Mörk ametist']],'Ändrar bakgrunden i alla vyer.'),
 choice('global.accent','Accentfärg',[['lavender','Lavendel'],['violet','Violett'],['blue','Isblå'],['mint','Mint']],'Gemensam accent för aktiva val, primära knappar och modulkort.'),
 choice('global.font','Gränssnittets typsnitt',[['system','Systemfont'],['serif','Redaktionell serif'],['mono','Monospace']],'Läsarens typsnitt kan väljas separat.'),
 choice('global.textSize','Gränssnittets text',[['comfortable','Större och lättläst'],['large','Extra stor']],'Förstorar metadata och kontrolltexter utan att ändra läsarens textstorlek.'),
 choice('global.corners','Korthörn',[['square','Raka'],['soft','Mjuka'],['round','Extra rundade']],'Samma hörnradie för kort i hela biblioteket.'),
 choice('global.borders','Kortens avgränsning',[['none','Endast ytor'],['strong','Tydliga konturer']],'Ändrar kortens kantlinjer.'),
 choice('global.motion','Rörelse',[['none','Ingen rörelse'],['lift','Lätt lyft']],'Inställningen för minskad rörelse i enheten respekteras alltid.'),
 choice('global.focus','Tangentbordsfokus',[['accent','Tydlig accentram']],'Markerar fokuserade kontroller utan att ändra deras klickbeteende.'),
 choice('home.greeting','Välkomsthälsning',[['timed','Diskret, tidsanpassad'],['date','Veckodag och datum']],'En liten rad ovanför startsidans innehåll. Inga demonstrationskort.'),
 {key:'home.name',label:'Namn i hälsningen',type:'text',max:40,description:'Valfritt. Används bara i den tidsanpassade hälsningen.'},
 choice('home.stats','Databasöversikt',[['compact','Kompakt remsa']],'Ändrar bara databasöversikten på startsidan.'),
 choice('home.recent','Senaste innehåll',[['rows','Kompakta rader']],'Samma innehåll och länkar; ändrad presentation på startsidan.'),
 choice('home.spacing','Mellanrum mellan sektioner',[['compact','Tätt'],['airy','Luftigt']],'Ändrar bara avstånden mellan startsidans sektioner.'),
 choice('cards.layout','Modulernas layout',[['list','Lista'],['compact','Kompakta brickor'],['bento','Bento med bred första modul']],'Ändrar de riktiga modulknapparna, med samma destinationer.'),
 choice('cards.icons','Ikonernas inramning',[['plain','Fristående ikoner'],['circle','Cirklar'],['outlined','Konturramar']],'Behåller originalets riktiga SVG-ikoner.'),
 choice('cards.iconWeight','Ikonernas linjevikt',[['thin','Tunn'],['bold','Kraftig']],'Gäller modulernas ikoner, oberoende av layouten.'),
 choice('cards.description','Beskrivningar',[['hidden','Dölj beskrivningen']],'Titlar och destinationer behålls.'),
 choice('cards.counts','Antal i modulkorten',[['hidden','Dölj antal']],'Döljer antal i modulkorten utan att påverka databasöversikten.'),
 choice('cards.decoration','Bakgrundsillustrationer',[['hidden','Dölj illustrationerna'],['visible','Tydligare illustrationer']],'Ändrar de stora dekorativa ikonerna i kortens bakgrund.'),
 choice('cards.surface','Kortytor',[['flat','Enfärgade'],['glass','Glasytor']],'Ändrar kortens yta utan att ändra innehållet.'),
 choice('cards.spacing','Mellanrum mellan kort',[['tight','Tätt'],['airy','Luftigt']],'Gäller modulrutnätet på startsidan.'),
 choice('navigation.layout','Mobilens navigation',[['floating','Flytande docka'],['four','Fyra destinationer utan plusknapp']],'Hem, Berättelser, Film & serier och Meny behålls alltid.'),
 choice('navigation.labels','Navigationsetiketter',[['icons','Endast ikoner']],'Ikonerna behåller sina tillgängliga namn.'),
 choice('navigation.active','Aktiv destination',[['pill','Markerad kapsel'],['line','Tydlig accentlinje']],'Markerar den aktuella vyn.'),
 choice('navigation.header','Toppfält',[['scroll','Följer sidans scroll'],['glass','Genomskinligt glas']],'Påverkar originalets toppfält och behåller dess funktioner.'),
 choice('media.layout','Bibliotekets layout',[['rows','Affisch och metadata i rader'],['three','Tre affischer i bredd på mobil'],['dense','Tätt affischrutnät']],'Syns i resultatlistan efter Visa alla eller en sökning.'),
 choice('media.poster','Affischformat',[['wide','Liggande 16:9'],['square','Kvadratiskt']],'Samma demotitlar och detaljlänkar.'),
 choice('media.status','Status på kort',[['badge','Märke över affischen'],['hidden','Dölj status på kort']],'Ändrar presentationen; registrerad status påverkas inte.'),
 choice('media.metadata','Sekundär metadata',[['minimal','Endast titel och status']],'Döljer år och betyg på kort, men behåller dem i detaljvyn.'),
 choice('media.details','Detaljlayout',[['stack','Affisch över information'],['compact','Mindre affisch']],'Gäller detaljvyn för film och serie.'),
 choice('media.filters','Avancerade filter',[['open','Alltid synliga'],['sticky','Klistrade under toppfältet']],'Originalets fungerande sökning, sortering och filter behålls.'),
 choice('stories.layout','Berättelsebibliotek',[['list','Redaktionell lista'],['compact','Kompakta textrader']],'Samma berättelser och läslänkar.'),
 choice('stories.titles','Berättelsernas rubriker',[['serif','Serifrubriker']],'Gäller berättelsekort och läsvyns rubrik.'),
 choice('stories.metadata','Metadata på berättelsekort',[['minimal','Titel och kategori']],'Döljer sekundära etiketter på korten.'),
 choice('reader.font','Lästypsnitt',[['serif','Bokserif'],['sans','Sans serif'],['mono','Monospace']],'Ändrar bara den riktiga lästexten.'),
 choice('reader.size','Textstorlek',[['18','18 px'],['20','20 px'],['22','22 px'],['24','24 px']],'Samma inställning för dokument och berättelser.'),
 choice('reader.width','Radlängd',[['narrow','65 tecken'],['medium','75 tecken'],['wide','90 tecken']],'Begränsar lästextens bredd och centrerar den.'),
 choice('reader.lineHeight','Radavstånd',[['normal','1,65'],['airy','1,9'],['wide','2,1']],'Ändrar radavstånd i brödtexten.'),
 choice('reader.theme','Läsyta',[['paper','Varmt papper'],['dark','Mörkt bläck']],'Ändrar bara läsytan.'),
 choice('reader.focus','Fokusläge',[['on','Dölj omgivande navigation vid läsning']],'Gäller när en berättelse eller ett dokument är öppet. Designknappen och tillbaka finns kvar.'),
 choice('reader.contents','Innehållsförteckning',[['hidden','Dölj innehållsförteckning'],['top','Ovanför lästexten']],'Gäller berättelsens befintliga kapitelindex.'),
 choice('files.layout','Dokumentresultat',[['cards','Dokumentkort'],['compact','Kompakta rader']],'Gäller dokumentlistor i sökning och kunskapsbank.'),
 choice('files.summary','Dokumentutdrag',[['hidden','Dölj utdrag']],'Döljer sammanfattning i resultatlistan. Originaltexten finns i läsaren.'),
 choice('files.plugins','Pluginbibliotek',[['list','Kompakt lista'],['plain','Enfärgade kort']],'Ändrar de befintliga pluginlänkarna.'),
];
const byKey=new Map(CONTROLS.map(c=>[c.key,c]));
const SECTIONS=['stats','modules','recent'];
const MODULES=['filmer','berattelser','databas','plugins','sok','villse'];
export const DEFAULT_ORDER=SECTIONS;
export const MODULE_ORDER=MODULES;
export function cleanDesign(input={}){
 const values={};const v=input&&typeof input.values==='object'&&input.values?input.values:{};
 for(const c of CONTROLS){const x=v[c.key];if(c.type==='text'){if(typeof x==='string'&&x.trim())values[c.key]=x.slice(0,c.max);}else if(x!=='original'&&c.options.some(([id])=>id===x))values[c.key]=x;}
 for(const [key,allowed] of [['home.order',SECTIONS],['cards.order',MODULES]]){if(Array.isArray(v[key]))values[key]=[...new Set(v[key].filter(x=>allowed.includes(x))),...allowed.filter(x=>!v[key].includes(x))];}
 for(const [key,allowed] of [['home.hidden',SECTIONS],['cards.hidden',MODULES]]){if(Array.isArray(v[key]))values[key]=[...new Set(v[key].filter(x=>allowed.includes(x)))];}
 const oldHidden=['stats','recent'].filter(id=>v['home.'+id]==='hidden');if(oldHidden.length)values['home.hidden']=[...new Set([...(values['home.hidden']||[]),...oldHidden])];
 const savedIdeas=Array.isArray(input?.savedIdeas)?[...new Set(input.savedIdeas.filter(x=>typeof x==='string'&&x.length<150&&x.includes('::')))]:[];
 const out={version:2,values,savedIdeas};
 if(input?.legacySource&&typeof input.legacySource==='object')out.legacySource=JSON.parse(JSON.stringify(input.legacySource));
 return out;
}
export function createHistory(design){return {past:[],present:cleanDesign(design),future:[]};}
export function commit(history,design){const present=cleanDesign(design);if(JSON.stringify(present)===JSON.stringify(history.present))return history;return {past:[...history.past,history.present].slice(-80),present,future:[]};}
export function change(history,key,value){return commit(history,{...history.present,values:{...history.present.values,[key]:value}});}
export function patch(history,values){return commit(history,{...history.present,values:{...history.present.values,...values}});}
export function resetGroup(history,group){return commit(history,{...history.present,values:Object.fromEntries(Object.entries(history.present.values).filter(([key])=>!key.startsWith(group+'.')))});}
export function undo(h){return h.past.length?{past:h.past.slice(0,-1),present:h.past.at(-1),future:[h.present,...h.future]}:h;}
export function redo(h){return h.future.length?{past:[...h.past,h.present],present:h.future[0],future:h.future.slice(1)}:h;}
export function saveIdea(h,id){const arr=h.present.savedIdeas;return commit(h,{...h.present,savedIdeas:arr.includes(id)?arr.filter(x=>x!==id):[...arr,id]});}
export function exportDesign(d){return JSON.stringify({format:'nexus-design-studio',...cleanDesign(d)},null,2);}
export function importDesign(json){const d=typeof json==='string'?JSON.parse(json):json;if(!d||d.format!=='nexus-design-studio'||![1,2].includes(d.version))throw Error('Filen är inte en Nexus Design Studio-export.');if(d.version===1)return cleanDesign({savedIdeas:d.ideaBoard,legacySource:d});return cleanDesign(d);}
// Deliberate, reviewed mappings only. Unmapped ideas remain in the research library.
export const BINDINGS={
 'Gemini Argon::UX-013':{values:{'home.greeting':'timed'},description:'Lägger till en diskret hälsning ovanför startsidans befintliga innehåll.'},
 'Gemini Argon::UX-016':{values:{'media.layout':'three'},description:'Tre affischer per rad i mobilens film- och serieresultat.'},
 'Gemini Argon::UX-036':{values:{'reader.width':'medium'},description:'Begränsar lästexten till 75 tecken per rad.'},
 'Gemini Argon::UX-066':{values:{'navigation.layout':'four'},description:'Tar bort plusåtgärden ur bottenmenyn och behåller fyra destinationer.'},
 'Gemini Argon::UX-092':{values:{'global.focus':'accent'},description:'Tydlig lila fokusram på tangentbordsfokuserade kontroller.'},
 'Copilot::UX-002':{values:{'media.status':'badge'},description:'Flyttar den riktiga statusetiketten till affischens övre hörn.'},
 'Vibe::UX-001':{values:{'media.status':'badge'},description:'Visar kortets faktiska status över affischen.'},
 'Copilot::UX-005':{values:{'media.metadata':'minimal'},description:'Döljer sekundär metadata i korten; detaljvyn behåller informationen.'},
 'Copilot::UX-004':{values:{'media.filters':'sticky'},description:'Håller de avancerade filtren under toppfältet när de är öppna.'},
 'Gemini Argon::UX-070':{values:{'media.filters':'sticky'},description:'Klistrar de befintliga biblioteksfiltren under toppfältet.'},
 'Copilot::UX-006':{values:{'navigation.active':'line'},description:'Accentlinje markerar den aktuella destinationen.'},
 'Kimi::FYND-27':{values:{'global.borders':'none'},description:'Kortytorna avgränsar innehållet utan kantlinjer.'},
 'Kimi::FYND-22':{values:{'cards.spacing':'airy'},description:'Ökar mellanrummen mellan startsidans modulkort.'},
 'Kimi::FYND-32':{values:{'home.recent':'rows'},description:'Visar startsidans senaste innehåll som kompakta rader.'},
 'Kimi::FYND-54':{values:{'reader.font':'serif'},description:'Bokserif för lästext; gränssnittets typsnitt behålls.'},
 'Meta AI::UX-011':{values:{'reader.font':'serif'},description:'Väljer serif i den separata lästypografin. Sans kan väljas i samma reglage.'},
 'Meta AI::UX-037':{values:{'stories.titles':'serif'},description:'Ger berättelsernas rubriker serif utan att ändra övrig navigation.'},
 'Vibe::UX-057':{values:{'stories.titles':'serif'},description:'Serifrubriker i berättelsebibliotek och läsvy.'},
 'Vibe::UX-059':{values:{'reader.size':'20','reader.lineHeight':'airy'},description:'20 px brödtext med luftig radhöjd i läsaren.'},
 'Perplexity::UX-066':{values:{'reader.size':'20'},description:'Ändrar textstorleken lokalt i läsaren.'},
 'DeepSeek::UX-023':{values:{'reader.width':'narrow','reader.lineHeight':'normal'},description:'65 tecken bred lästext med 1,65 i radhöjd.'},
 'DeepSeek::UX-071':{values:{'global.focus':'accent'},description:'Accentram visar tangentbordsfokus.'},
 'Grok::UX-007':{values:{'navigation.header':'glass'},description:'Glaseffekt på det riktiga toppfältet.'},
};
export function classifyIdea(idea,targets){const t=targets?.[idea.model+'::'+idea.id];if(t?.rule)return 'Global designregel';const f=String(t?.targetFamily||'');if(/^(new|proposed):/.test(f))return 'Funktion / interaktionsmönster';if(/surface|type|density|shape|motion|designRules|accessib/.test(f))return 'Global designregel';if(/Card|labels|stats|filter|readerTools|season/.test(f))return 'Komponentegenskap';return 'Visuell komponent';}

export function previewView(area,hash,reading=false){
 if(area==='reader'&&reading)return null;
 if(area==='media')return hash.startsWith('#serier')?'serier':'filmer';
 if(area==='files'&&hash.startsWith('#plugins'))return 'plugins';
 return GROUPS.find(g=>g.id===area)?.view||null;
}
