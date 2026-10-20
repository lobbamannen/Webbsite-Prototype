'use client';
import React,{useEffect,useState} from 'react';
import {Bookmark,Clapperboard,Tv,ChevronRight} from 'lucide-react';
import {seriesIsWatchlisted} from '@/lib/media-discovery.mjs';
type Props={onNavigate:(view:string)=>void};
export default function WatchlistOverview({onNavigate}:Props){
 const [films,setFilms]=useState<any[]|null>(null),[series,setSeries]=useState<any[]|null>(null);
 useEffect(()=>{const controller=new AbortController();const get=async(url:string)=>{const response=await fetch(url,{signal:controller.signal,cache:'no-store'});if(!response.ok)throw Error('Registret kunde inte läsas');return response.json();};
  get('/api/films').then(d=>setFilms(Array.isArray(d?.register?.films)?d.register.films.filter((f:any)=>f.status==='Vill se'):[])).catch(()=>{if(!controller.signal.aborted)setFilms(null)});
  get('/api/series').then(d=>setSeries(Array.isArray(d?.register?.series)?d.register.series.filter((s:any)=>seriesIsWatchlisted(s)):[])).catch(()=>{if(!controller.signal.aborted)setSeries(null)});
  return ()=>controller.abort();
 },[]);
 return <section className="nh-module-dashboard nh-watchlist-dashboard" aria-labelledby="nh-watchlist-heading">
  <header className="nh-module-dashboard-header"><div className="nh-module-dashboard-title"><span className="nh-module-heading-icon"><Bookmark size={28}/></span><div><span className="nh-module-eyebrow">NEXUS HUB · FILM & SERIER</span><h1 id="nh-watchlist-heading">Vill se</h1><p>Filmer och serier markerade som Vill se i GitHub.</p></div></div></header>
  {([{title:'Filmer',items:films,view:'filmer',Icon:Clapperboard},{title:'Serier',items:series,view:'serier',Icon:Tv}] as const).map(({title,items,view,Icon})=><div key={view} className="nh-watchlist-group">
    <div className="nh-module-category-head"><div><h2>{title} · {items===null?'–':items.length.toLocaleString('sv-SE')}</h2></div><button className="nh-watchlist-open" type="button" onClick={()=>onNavigate(view)}>Öppna {title.toLowerCase()} <ChevronRight size={17}/></button></div>
    {items===null?<p className="nh-dashboard-note">Registret hämtas eller är tillfälligt otillgängligt.</p>:items.length===0?<p className="nh-dashboard-note">Inga poster markerade Vill se.</p>:<div className="nh-watchlist-items">{items.map((item:any,i:number)=><button type="button" key={String(item.imdbId||item.title)+i} onClick={()=>onNavigate(view)}><Icon size={18}/><span>{item.displayTitle||item.title||'Utan titel'}</span><ChevronRight size={16}/></button>)}</div>}
  </div>)}
 </section>;
}
