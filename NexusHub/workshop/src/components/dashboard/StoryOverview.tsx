'use client';
import React from 'react';
import {BookOpen, CheckCircle2, ChevronRight, Shuffle, Eye, Globe2, House, Landmark, Layers, Scale, Star} from 'lucide-react';

type StoryItem={path:string;category:string;numericRating:number|null};
type Props={
 mode:'mysterier'|'berattelser';stories:StoryItem[];categories:string[];counts:Record<string,number>;
 finishedCount:number;selectedCategory:string;loading:boolean;
 onSelectCategory:(name:string)=>void;onNavigate:(name:string)=>void;onSurprise:()=>void;toolbar?:React.ReactNode;
};
const iconFor=(name:string)=>name==='Hemsökta hus'?House:name==='True crime'?Scale:name==='Internetmysterier & nätfenomen'?Globe2:name==='Historiska & paranormala mysterier'?Landmark:BookOpen;
export default function StoryOverview({mode,stories,categories,counts,finishedCount,selectedCategory,loading,onSelectCategory,onNavigate,onSurprise,toolbar}:Props){
 const total=stories.length;
 const rated=stories.filter(x=>x.numericRating!==null).length;
 const metrics=[
  {label:'Berättelser',value:total,icon:BookOpen,tone:'purple'},
  {label:'Kategorier',value:categories.length,icon:Layers,tone:'blue'},
  {label:'Med exakt betyg',value:rated,icon:Star,tone:'pink'},
  {label:'Lästa i GitHub',value:finishedCount,icon:CheckCircle2,tone:'green'}
 ];
 return <section className="nh-module-dashboard nh-story-dashboard" aria-labelledby="nh-story-dashboard-title">
  <header className="nh-module-dashboard-header">
   <div className="nh-module-dashboard-title"><span className="nh-module-heading-icon"><BookOpen size={29} aria-hidden="true"/></span><div><span className="nh-module-eyebrow">NEXUS HUB · BERÄTTELSEBIBLIOTEKET</span><h1 id="nh-story-dashboard-title">{mode==='mysterier'?'Utforska mysterier':'Berättelser'}</h1><p>Hemsökta platser, verkliga fall, mysterier och fördjupande research – direkt från ditt arkiv.</p></div></div>
  </header>
  <div className="nh-story-primary-actions"><button type="button" className="primary" onClick={onSurprise} disabled={!total}><Shuffle size={17}/>Överraska mig</button></div>
  <nav className="nh-story-mode-tabs" aria-label="Byt berättelsevy"><button type="button" className={mode==='berattelser'?'active':''} aria-current={mode==='berattelser'?'page':undefined} onClick={()=>onNavigate('berattelser')}><BookOpen size={16}/>Berättelser</button><button type="button" className={mode==='mysterier'?'active':''} aria-current={mode==='mysterier'?'page':undefined} onClick={()=>onNavigate('mysterier')}><Eye size={16}/>Mysterier</button></nav>
  <div className="nh-module-stat-row nh-story-stat-row" aria-label="Berättelseöversikt">
   {metrics.map(({label,value,icon:Icon,tone})=><div key={label} className={'nh-module-stat nh-tone-'+tone}><Icon size={23} aria-hidden="true"/><strong>{loading&&!total?'–':value.toLocaleString('sv-SE')}</strong><span>{label}</span></div>)}
  </div>
  {toolbar}
  <div className="nh-module-category-head"><div><span className="nh-module-eyebrow">UPPTÄCK</span><h2>Utforska kategorier</h2><p>Välj ett ämne för att se dess berättelser direkt.</p></div></div>
  <div className="nh-module-category-grid" aria-label="Berättelsekategorier">
   {categories.map((name,index)=>{const Icon=iconFor(name);const count=counts[name]||0;return <button className={'nh-module-category-card nh-category-'+index%4+(selectedCategory===name?' selected':'')} key={name} type="button" aria-pressed={selectedCategory===name} onClick={()=>onSelectCategory(name)}>
    <span className="nh-category-icon"><Icon size={25} aria-hidden="true"/></span><span className="nh-category-copy"><strong>{name}</strong><small>{count} {count===1?'berättelse':'berättelser'}</small></span><ChevronRight size={17} className="nh-category-arrow" aria-hidden="true"/>
   </button>})}
  </div>
 </section>;
}
