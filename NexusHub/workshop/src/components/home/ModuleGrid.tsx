'use client';
import React from 'react';
import {useDesign} from '@/studio/context';
import {BookOpen, Clapperboard, Database, FolderOpen, Bookmark, Puzzle, ChevronRight} from 'lucide-react';
type Counts={files:number|null;documents:number|null;stories:number|null;plugins:number|null;films:number|null;series:number|null;watchlist:number|null};
type Props={counts:Counts;onNavigate:(view:string)=>void;onUpload:()=>void};
const modules=[
 {id:'filmer',title:'Film & serier',description:'Dina filmer, serier och betyg',icon:Clapperboard,tone:'purple',art:'cinema'},
 {id:'berattelser',title:'Berättelser',description:'Research, mysterier och historier',icon:BookOpen,tone:'pink',art:'stories'},
 {id:'databas',title:'Kunskapsbanken',description:'Läs dokument, metoder och forskning',icon:Database,tone:'blue',art:'knowledge'},
 {id:'plugins',title:'Plugins',description:'Dina ChatGPT-verktyg',icon:Puzzle,tone:'cyan',art:'plugins'},
 {id:'sok',title:'Utforska filer',description:'Hitta och öppna filer i hela arkivet',icon:FolderOpen,tone:'blue',art:'files'},
 {id:'villse',title:'Vill se',description:'Filmer och serier på din lista',icon:Bookmark,tone:'purple',art:'upload'}
] as const;
export default function ModuleGrid({counts,onNavigate,onUpload}:Props){
 const design=useDesign();
 const ordered=(design['cards.order']||modules.map(m=>m.id)).map((id:string)=>modules.find(m=>m.id===id)).filter((m:any)=>m&&!(design['cards.hidden']||[]).includes(m.id)) as typeof modules[number][];
 const formatted=(n:number|null)=>typeof n==='number'?n.toLocaleString('sv-SE'):null;
 const films=formatted(counts.films),series=formatted(counts.series),stories=formatted(counts.stories),plugins=formatted(counts.plugins),watchlist=formatted(counts.watchlist),documents=formatted(counts.documents),files=formatted(counts.files);
 const details:Record<string,string|null>={filmer:films!==null&&series!==null?films+' filmer · '+series+' serier':null,berattelser:stories!==null?stories+' berättelser':null,databas:documents!==null?documents+' dokument':null,sok:files!==null?files+' filer':null,plugins:plugins!==null?plugins+' pluginpaket':null,villse:watchlist!==null?watchlist+' objekt':null};
 return <section className="nh-modules" data-studio-target="cards" aria-label="Utforska Nexus Hub">
  <div className="nh-home-section-intro"><h2>Utforska Nexus Hub</h2><p>Gå direkt till det område du vill använda.</p></div><div className="nh-module-grid">{ordered.map(({id,title,description,icon:Icon,tone,art})=>
   <button type="button" key={id} data-studio-module={id} className={'nh-module-card nh-tone-'+tone+' nh-art-'+art} onClick={()=>onNavigate(id)}>
    <span className="nh-module-symbol"><Icon size={35} strokeWidth={1.65} aria-hidden="true"/></span>
    <span className="nh-module-copy"><strong>{title}</strong><span>{description}</span>{details[id]&&<span className="nh-module-count">{details[id]}</span>}</span>
    <span className="nh-module-decoration" aria-hidden="true"><Icon size={125} strokeWidth={0.7}/></span>
    <ChevronRight className="nh-module-chevron" size={22} aria-hidden="true"/>
   </button>)}</div>
 </section>;
}

