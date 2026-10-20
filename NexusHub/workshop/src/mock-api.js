// Safe, isolated UX fixtures. No external API calls, credentials or user files.
const timestamp='2026-10-20T13:15:27.000Z';
const filmGenres=['Kriminal','Thriller','Action','Äventyr','Skräck','Drama','Science fiction','Fantasy','Dokumentär','Komedi','Mysterie','Familj','Historia'];
const fNames=['Sagan om ringen: Härskarringen','Interstellar','The Dark Knight','Inception','Sagan om de två tornen','Sagan om konungens återkomst'];
const films=Array.from({length:237},(_,i)=>({
  imdbId:'tt'+String(1000000+i),title:fNames[i]||'Exempelfilm '+String(i+1).padStart(3,'0'),
  year:2000+i%25,displayTitle:(fNames[i]||'Exempelfilm '+String(i+1).padStart(3,'0'))+' – ('+(2000+i%25)+')',
  genres:[filmGenres[i%filmGenres.length],filmGenres[(i+3)%filmGenres.length]],
  status:i>=235?'Vill se':'Sedd',favorite:i%19===0,ourRating:i%7===0?8:null,
  ourReview:null,synopsis:'Fiktiv exempelbeskrivning för Nexus Hubs designverkstad.',
  series:i<3?{name:'Exempel på filmserie',number:i+1}:null,
  viewings:[],startedViewingDate:null,plannedViewingDate:null,
  statusEvidence:{type:'direkt',note:'Endast designdata'},metadataSource:''
}));
const series=Array.from({length:127},(_,i)=>({
  title:['Silo','Gåsmamman','Breaking Bad','Stranger Things'][i]||'Exempelserie '+String(i+1).padStart(3,'0'),
  originalTitle:null,swedishTitle:null,startYear:2010+i%16,imdbId:'tt'+String(2000000+i),
  genres:[filmGenres[i%filmGenres.length],filmGenres[(i+2)%filmGenres.length]],
  status:'Sedd',favorite:i%20===0,wantToWatch:i>=125,
  allSeasonsAvailableInSwedenWatched:i<125,ourRating:i%5===0?8:null,
  synopsis:'Exempeldata för layouttest',seasonAvailabilityResearch:{swedenAvailableSeasonNumbers:[1,2,3],swedenProviderSeasonCounts:[{provider:i%2?'Netflix':'HBO Max',seasonCount:3}]}
}));
const storyFolders=['Hemsökta hus','True crime','Internetmysterier & nätfenomen','Historiska & paranormala mysterier','Övriga berättelser'];
const docs=[
 ...Array.from({length:25},(_,i)=>{
 const name='Exempelberättelse '+String(i+1).padStart(2,'0'),category=storyFolders[i%storyFolders.length];
 return {path:'Berattelser/'+category+'/'+name+'.md',title:name,name:name,module:'berattelser',category,technical:false,repoKey:'databas',formats:[{path:'Berattelser/'+category+'/'+name+'.md',format:'md',size:5000}],summary:'Fiktivt exempel för UI/UX-granskning'};
 }),
 ...Array.from({length:85},(_,i)=>({
 path:'Kunskapsbanken/'+['Forskning','Metoder','Dokument','Historia','Teknik','Natur'][i%6]+'/Exempeldokument-'+String(i+1).padStart(3,'0')+'.md',
 title:'Exempeldokument '+String(i+1).padStart(3,'0'),module:'databas',
 category:['Forskning','Metoder','Dokument','Historia','Teknik','Natur'][i%6],
 technical:false,repoKey:'databas',formats:[{format:'md',size:4000}],summary:'Fiktiv dokumentpost för interaktiv designgranskning'
 })),
 ...Array.from({length:8},(_,i)=>({path:'Nyheter/Exempel-'+i+'.md',title:'Exempelnyhet '+(i+1),module:'nyheter',category:'Nyheter',technical:false,repoKey:'databas'}))
];
const plugins=Array.from({length:18},(_,i)=>({path:'plugins/exempel-'+(i+1),sourcePath:'plugins/exempel-'+(i+1),title:'Exempelplugin '+String(i+1).padStart(2,'0'),name:'Exempelplugin '+String(i+1).padStart(2,'0'),version:'1.0',archived:false,legacy:false,skills:[{name:'Exempelarbetsflöde'}],files:[]}));
const sha='0000000000000000000000000000000000000000';
const snapshot={
 repositories:{
 databas:{fileCount:3488,fetchedAt:timestamp,complete:true,documents:docs,recent:[],warnings:[]},
 plugins:{packages:plugins,files:[],recent:[]}
 },errors:[],fetchedAt:timestamp
};
let storyEntries={};
const originalFetch=window.fetch.bind(window);
const result=(obj,status=200)=>new Response(JSON.stringify(obj),{status,headers:{'Content-Type':'application/json'}});
window.fetch=async function(input,options={}){
 const raw=typeof input==='string'?input:input?.url||'';
 if(!raw.startsWith('/api/')) {
  // This isolated workshop never contacts the canonical Nexus Hub backend.
  if(/^https?:/i.test(raw))throw Error('Extern nätverksåtkomst är avstängd i designverkstaden');
  return originalFetch(input,options);
 }
 const url=new URL(raw,'https://designverkstad.invalid');
 const name=url.pathname.slice(5);
 const method=(options.method||'GET').toUpperCase();
 if(name==='films')return method==='GET'?result({sha,register:{schemaVersion:'1.0',lastUpdated:timestamp,description:'Exempeldata',films}}):result({error:'Designverkstad: inga filmändringar skickas till GitHub.'},403);
 if(name==='series')return method==='GET'?result({sha,register:{schemaVersion:1,lastUpdated:timestamp,series}}):result({error:'Designverkstad: inga serieändringar skickas till GitHub.'},403);
 if(name==='story-status'){
  if(method==='POST'){
   try{
    const body=JSON.parse(options.body||'{}');
    if(body.action==='set'&&body.path&&body.field){storyEntries[body.path]={...(storyEntries[body.path]||{saved:false,read:false}),[body.field]:!!body.value,updatedAt:new Date().toISOString()};}
    if(body.action==='migrate')for(const p of body.paths||[])storyEntries[p.path]={saved:!!p.saved,read:!!p.read,updatedAt:new Date().toISOString()};
   }catch{}
  }
  return result({register:{schemaVersion:1,entries:storyEntries},saved:true,source:'local-demo',sha});
 }
 if(name==='posters')return result({revision:sha});
 if(name==='portal/overview')return result(snapshot);
 if(name==='portal/mirror')return result({verifiedFiles:3488,totalFiles:3488,pending:0,lastTreeVerifiedAt:timestamp});
 if(name==='portal/compare')return result({items:[],checkedAt:timestamp,commit:sha});
 if(name==='portal/document'){
  const path=url.searchParams.get('path')||'Exempel.md';
  const item=docs.find(d=>d.path===path);
  return result({repoKey:'databas',path,title:item?.title||path.split('/').pop()?.replace(/\.md$/,''),category:item?.category||'Exempel',body:'# '+(item?.title||'Exempeldokument')+'\n\nDetta är en fiktiv artikel för att granska originalets läsvy, typografi och funktioner.\n\n## Bakgrund\n\nHär visas bara lokal testtext, aldrig privat material.\n\n## Fortsättning\n\nVi kan utvärdera rubriker, textrader och navigering i samma design som Nexus Hub.',commit:sha,fetchedAt:timestamp});
 }
 if(name==='portal/inbox')return result({entries:[],total:0});
 if(name==='portal/differences')return result({entries:[],total:0,items:[]});
 if(name==='portal/mirror-search'||name==='entries')return result({entries:[],total:0});
 if(name==='portal/sync')return result({error:'Designverkstaden är frånkopplad och kan inte synkronisera privata filer.'},403);
 if(name.startsWith('files'))return result({error:'Uppladdning är avstängd. Det här är en ren designprototyp.'},403);
 if(name.startsWith('mirror/'))return result({state:'same',verifiedAt:timestamp});
 return result({items:[],entries:[],total:0,files:[],packages:[],message:'Lokal designverkstad (exempeldata).'});
};
