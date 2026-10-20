'use client';
import React,{useEffect,useMemo,useState} from 'react';
import {Tv,Search,RefreshCw,Loader2,Star,ChevronLeft,ExternalLink,CalendarDays,CheckCircle2,AlertCircle,Globe2,Heart,Bookmark} from 'lucide-react';
import './films.css';
import './series.css';
import MediaOverview from '@/components/dashboard/MediaOverview';
import DiscoveryToolbar from '@/components/dashboard/DiscoveryToolbar';
import {seriesDiscovery,seriesIsWatchlisted} from '@/lib/media-discovery.mjs';
import {matchesGenreGroup} from '@/lib/genre-taxonomy.mjs';
import {GenreSubfilters} from '@/components/dashboard/MediaOverview';
import RepositoryPoster,{usePosterRevision} from '@/components/repository-poster';

type Provider={provider:string;seasons:number;offerType?:string|null;availableSeasonNumbers?:number[]|null;evidence?:string};
type Source={label:string;url:string;checkedAt?:string};
type Research={checkedAt?:string|null;swedenAvailableSeasonNumbers?:number[]|null;swedenProviderSeasonCounts?:Provider[]|null;internationalVerifiedReleasedSeasonCount?:number|null;swedenJustWatchUrl?:string|null;note?:string;sources?:Source[]};
type Entry={title:string;startYear:number|null;originalTitle?:string|null;swedishTitle?:string|null;imdbId?:string|null;genres:string[];synopsis?:string|null;status:string;ourRating:number|null;ourReview:string|null;favorite?:boolean|null;wantToWatch?:boolean;watchedSeasons:number[]|null;seasonRatings:Record<string,number|null>;viewingProvider:string|null;viewingDate:string|null;notes:string;releasedSeasonsAsOfDate:number|null;allSeasonsAvailableInSwedenWatched:boolean;seasonCoverageConfirmedOn:string;seasonAvailabilityResearch?:Research|null;metadataSources?:Source[]};
type Register={schemaVersion:number;lastUpdated:string;series:Entry[]};
const numbers=(v:unknown):number[]=>Array.isArray(v)?[...new Set(v.filter((n):n is number=>Number.isInteger(n)&&n>0))].sort((a,b)=>a-b):[];
const textNumbers=(v:number[])=>v.length?v.join(', '):'Inte specificerade';
const link=(v:string|null|undefined)=>{try{const u=new URL(v||'');return u.protocol==='https:'?u.href:null;}catch{return null;}};
const access=(v?:string|null)=>({FLATRATE:'Abonnemang',RENT:'Hyra',BUY:'Köp',FREE:'Gratis'} as Record<string,string>)[v||'']||v||'Okänd typ';
function Poster({item,large=false,revision}:{item:Entry;large?:boolean;revision:string}){
 const posterKey=item.imdbId||item.title+'|'+(item.startYear??'');
 return <div className={'film-poster series-poster'+(large?' large':'')}><RepositoryPoster kind="series" posterKey={posterKey} revision={revision} alt={'Affisch: '+item.title}><div className="film-poster-fallback"><Tv size={large?48:34}/><span>{item.title}</span></div></RepositoryPoster></div>;
}
function Detail({item,back,onToggleWatchlist,watchSaving,posterRevision}:{item:Entry;back:()=>void;onToggleWatchlist:()=>void;watchSaving:boolean;posterRevision:string}){
 const r=item.seasonAvailabilityResearch,sv=numbers(r?.swedenAvailableSeasonNumbers),seen=numbers(item.watchedSeasons),providers=r?.swedenProviderSeasonCounts||[];
 const sources=[...(item.metadataSources||[]),...(r?.sources||[])].filter(x=>link(x.url));
 const unique=[...new Map<string,Source>(sources.map((x):[string,Source]=>[x.url,x])).values()];
 const imdb=item.imdbId&&/^tt\d+$/.test(item.imdbId)?'https://www.imdb.com/title/'+item.imdbId+'/':null;
 return <article className="series-detail">
  <div className="film-detail-top reader-toolbar"><button className="film-quiet text-button" onClick={back}><ChevronLeft size={19}/>Till serierna</button><span className="series-read-only">Register från GitHub</span></div>
  <div className="film-detail-hero"><Poster item={item} large revision={posterRevision}/><div className="film-detail-content"><div className="series-flags"><span className={'film-status '+(item.allSeasonsAvailableInSwedenWatched?'seen':'planned')}>{item.allSeasonsAvailableInSwedenWatched?'Sedd i Sverige':item.status}</span>{item.favorite&&<span className="series-favorite"><Heart size={13} fill="currentColor"/>Favorit</span>}{seriesIsWatchlisted(item)&&<span className="series-wishlist-badge"><Bookmark size={13} fill="currentColor"/>Vill se</span>}</div><h2>{item.title}{item.startYear?' ('+item.startYear+')':''}</h2>{item.originalTitle&&item.originalTitle!==item.title&&<p className="film-muted">Originaltitel: {item.originalTitle}</p>}{item.swedishTitle&&item.swedishTitle!==item.title&&<p className="film-muted">Svensk titel: {item.swedishTitle}</p>}<p className="film-muted">{item.genres.join(' · ')}</p>{item.ourRating!==null?<div className="film-rating"><Star fill="currentColor"/>{item.ourRating}/10 <small>Vårt seriebetyg</small></div>:<p className="film-muted">Ej betygsatt</p>}<p>{item.synopsis||'Ingen handling registrerad.'}</p><div className="series-watchlist-action"><button type="button" className={'secondary series-wishlist-toggle'+(seriesIsWatchlisted(item)?' selected':'')} disabled={watchSaving} aria-pressed={seriesIsWatchlisted(item)} onClick={onToggleWatchlist}><Bookmark size={17} fill={seriesIsWatchlisted(item)?'currentColor':'none'}/>{watchSaving?'Sparar i GitHub…':seriesIsWatchlisted(item)?'Ta bort från Vill se':'Lägg till i Vill se'}</button><small>Önskelistan sparas separat från sedda säsonger och betyg.</small></div><div className="series-links">{imdb&&<a className="film-imdb" href={imdb} target="_blank" rel="noopener noreferrer"><ExternalLink size={15}/>IMDb</a>}{link(r?.swedenJustWatchUrl)&&<a className="film-imdb" href={link(r?.swedenJustWatchUrl)||'#'} target="_blank" rel="noopener noreferrer"><ExternalLink size={15}/>Svenskt utbud</a>}</div></div></div>
  <div className="series-season-overview"><div><small>Individuellt belagda svenska säsonger</small><strong>{sv.length||'–'}</strong><span>{textNumbers(sv)}</span></div><div><small>Registrerade sedda säsonger</small><strong>{seen.length||'–'}</strong><span>{textNumbers(seen)}</span></div><div><small>Internationellt utgivna enligt registret</small><strong>{r?.internationalVerifiedReleasedSeasonCount??item.releasedSeasonsAsOfDate??'–'}</strong><span>Separat från svenska kataloger</span></div></div>
  {item.allSeasonsAvailableInSwedenWatched&&<p className="series-coverage"><CheckCircle2 size={18}/>Alla säsonger tillgängliga i Sverige är markerade som sedda (bekräftat {item.seasonCoverageConfirmedOn||'datum okänt'}). Detta innebär inte att internationellt otillgängliga säsonger är sedda.</p>}
  <div className="film-detail-sections">
   <section><h3>Streamingkataloger i Sverige</h3><p>Detta anger rapporterat utbud, inte var serien faktiskt sågs. Ett katalogantal ger inte automatiskt kända säsongsnummer.</p><div className="series-provider-list">{providers.map((p,i)=>{const n=numbers(p.availableSeasonNumbers);return <div className="series-provider" key={p.provider+'-'+i}><strong>{p.provider}</strong><small>{access(p.offerType)} · {p.seasons} {p.seasons===1?'säsong':'säsonger'} i katalogen</small><p>{n.length?'Belagda säsongsnummer: '+textNumbers(n):'Individuella säsongsnummer inte angivna för tjänsten.'}</p>{p.evidence&&<small>{p.evidence}</small>}</div>;})}{!providers.length&&<p>Inga tjänsteposter registrerade.</p>}</div></section>
   <section><h3>Vårt omdöme</h3><p>{item.ourReview||'Inget personligt omdöme registrerat.'}</p>{Object.keys(item.seasonRatings||{}).length>0&&<div className="series-season-ratings"><strong>Säsongsbetyg</strong><div>{Object.entries(item.seasonRatings).map(([n,value])=><span key={n}>Säsong {n}: {value===null?'Ej betygsatt':value+'/10'}</span>)}</div></div>}</section>
   <section><h3>Visning och källreservationer</h3><p><CalendarDays size={15}/> Faktisk visningstjänst: {item.viewingProvider||'Inte uppgiven'}</p><p>Visningsdatum: {item.viewingDate||'Inte uppgivet'}</p>{r?.checkedAt&&<p>Senaste registrerade katalogkontroll: {r.checkedAt}</p>}{r?.note&&<p>{r.note}</p>}{item.notes&&<p>{item.notes}</p>}</section>
   {unique.length>0&&<section><h3>Källor i registret</h3><div className="series-source-list">{unique.map(s=><a key={s.url} href={link(s.url)||'#'} target="_blank" rel="noopener noreferrer"><ExternalLink size={15}/>{s.label}{s.checkedAt?' · '+s.checkedAt:''}</a>)}</div></section>}
  </div>
 </article>;
}
export default function Series({initialItem}:{initialItem?:string|null}={}){
 const [posterRevision,refreshPosters]=usePosterRevision();
 const [data,setData]=useState<Register|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState(''),[query,setQuery]=useState(''),[genre,setGenre]=useState('alla'),[provider,setProvider]=useState('alla'),[status,setStatus]=useState('alla'),[sort,setSort]=useState('titel'),[page,setPage]=useState(0),[chosen,setChosen]=useState<number|null>(null);
 const [browsing,setBrowsing]=useState(false),[jump,setJump]=useState(0),[genreGroup,setGenreGroup]=useState<string|null>(null);
 const [sourceSha,setSourceSha]=useState(''),[watchSaving,setWatchSaving]=useState(false),[notice,setNotice]=useState('');
 useEffect(()=>{if(browsing&&jump>0)requestAnimationFrame(()=>document.getElementById('nh-series-results')?.scrollIntoView({behavior:'smooth',block:'start'}));},[jump,browsing]);
 const load=async()=>{setLoading(true);setError('');void refreshPosters();try{const response=await fetch('/api/series',{cache:'no-store'}),body=await response.json();if(!response.ok)throw Error(body.error||'Kunde inte läsa serierna.');if(body.register?.schemaVersion!==1||!Array.isArray(body.register.series))throw Error('Okänt serieformat.');setData(body.register);setSourceSha(body.sha||'');}catch(e:any){setError(e.message||'Okänt fel.');}finally{setLoading(false);}};
 useEffect(()=>{load();},[]);
 const toggleWatchlist=async(item:Entry)=>{
  if(!sourceSha||watchSaving){setError('Ladda serieregistret innan du ändrar Vill se.');return;}
  setWatchSaving(true);setError('');setNotice('');
  try{
   const response=await fetch('/api/series',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'set-watchlist',expectedSha:sourceSha,target:{title:item.title,startYear:item.startYear,imdbId:item.imdbId??null},wantToWatch:!seriesIsWatchlisted(item)})});
   const body=await response.json();
   if(!response.ok)throw Error(body.error||'Kunde inte spara Vill se.');
   setData(body.register);setSourceSha(body.sha);setNotice(body.warning||'Vill se är sparat i GitHub.');
  }catch(e:any){setError(e.message||'Det gick inte att uppdatera Vill se.');}
  finally{setWatchSaving(false);}
 };
 const items=data?.series||[];
  useEffect(()=>{if(!initialItem||!items.length)return;const index=items.findIndex(item=>item.imdbId===initialItem||(!item.imdbId&&`${item.title}|${item.startYear??''}`===initialItem));if(index>=0){setChosen(index);window.scrollTo(0,0);}},[initialItem,data]);
 const discovery=useMemo(()=>seriesDiscovery(items),[items]);
 const resetFilters=()=>{setStatus('alla');setGenre('alla');setGenreGroup(null);setProvider('alla');setQuery('');setSort('titel');setPage(0);};
 const chooseCategory=(id:string|null)=>{resetFilters();if(id?.startsWith('status:'))setStatus(id.slice(7));else if(id?.startsWith('genregroup:'))setGenreGroup(id.slice('genregroup:'.length));else if(id?.startsWith('genre:'))setGenre(id.slice(6));else if(id?.startsWith('provider:'))setProvider(id.slice(9));setBrowsing(true);setJump(n=>n+1);};
 const showAll=()=>{resetFilters();setBrowsing(true);setJump(n=>n+1);};
 const closeBrowse=()=>{resetFilters();setBrowsing(false);window.scrollTo({top:0,behavior:'smooth'});};
 const activeCategory=genreGroup?'genregroup:'+genreGroup:status!=='alla'?'status:'+status:genre!=='alla'?'genre:'+genre:provider!=='alla'?'provider:'+provider:null;
 const showing=browsing||!!query.trim();
 const genres=useMemo(()=>[...new Set(items.flatMap(x=>x.genres||[]))].sort((a,b)=>a.localeCompare(b,'sv')),[items]);
 const activeGenreGroup=genreGroup?discovery.groups.find(x=>x.id==='genre')?.items.find(x=>x.id==='genregroup:'+genreGroup):null;
 const providers=useMemo(()=>[...new Set(items.flatMap(x=>(x.seasonAvailabilityResearch?.swedenProviderSeasonCounts||[]).map(p=>p.provider)))].sort((a,b)=>a.localeCompare(b,'sv')),[items]);
 const filtered=useMemo(()=>items.map((item,index)=>({item,index})).filter(({item})=>(status==='alla'||(status==='sedda'?item.allSeasonsAvailableInSwedenWatched:status==='villse'?seriesIsWatchlisted(item):status==='favoriter'?!!item.favorite:!item.allSeasonsAvailableInSwedenWatched))&&(!genreGroup||matchesGenreGroup(item,genreGroup))&&(genre==='alla'||item.genres.includes(genre))&&(provider==='alla'||(item.seasonAvailabilityResearch?.swedenProviderSeasonCounts||[]).some(p=>p.provider===provider))&&[item.title,item.originalTitle||'',item.swedishTitle||'',item.startYear||'',item.imdbId||'',item.genres.join(' ')].join(' ').toLocaleLowerCase('sv').includes(query.trim().toLocaleLowerCase('sv'))).sort((a,b)=>sort==='år'?(b.item.startYear||0)-(a.item.startYear||0):sort==='betyg'?(b.item.ourRating??-1)-(a.item.ourRating??-1):sort==='säsonger'?numbers(b.item.seasonAvailabilityResearch?.swedenAvailableSeasonNumbers).length-numbers(a.item.seasonAvailabilityResearch?.swedenAvailableSeasonNumbers).length:a.item.title.localeCompare(b.item.title,'sv')),[items,status,genreGroup,genre,provider,sort,query]);
 const visible=filtered.slice(page*24,(page+1)*24);
 const choose=(x:number)=>{setChosen(x);window.scrollTo(0,0);};
 return <section className="film-library series-library">
  {chosen!==null&&items[chosen]?<div className="film-intro film-compact-intro"><div><p className="eyebrow">NEXUS HUB · SERIER</p><h1><Tv size={27}/>Serier</h1></div></div>:<MediaOverview mode="series" total={discovery.total} metrics={discovery.metrics} groups={discovery.groups} selectedId={activeCategory} onSelect={chooseCategory} onShowAll={showAll} onRefresh={load} loading={loading} toolbar={<DiscoveryToolbar query={query} onQuery={value=>{setQuery(value);if(value.trim())setBrowsing(true);setPage(0);}} placeholder="Sök titel, år eller IMDb-ID…" browsing={showing} onShowAll={showAll} onClose={closeBrowse} showAllLabel={'Visa alla '+items.length+' serier'}>
    {showing&&<details className="nh-discovery-options"><summary>Sortera och kombinera filter</summary><div className="film-filters series-filters nh-advanced-filters">
     <label><span>Status</span><select value={status} onChange={e=>{setStatus(e.target.value);setPage(0);}}><option value="alla">Alla statusar</option><option value="sedda">Sedda i Sverige</option><option value="villse">Vill se</option><option value="övriga">Övriga</option><option value="favoriter">Favoriter</option></select></label>
     <label><span>Genre</span><select value={genre} onChange={e=>{setGenreGroup(null);setGenre(e.target.value);setPage(0);}}><option value="alla">Alla genrer</option>{genres.map(x=><option key={x}>{x}</option>)}</select></label>
     <label><span>Streamingkatalog</span><select value={provider} onChange={e=>{setProvider(e.target.value);setPage(0);}}><option value="alla">Alla tjänster</option>{providers.map(x=><option key={x}>{x}</option>)}</select></label>
     <label><span>Sortera</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="titel">Titel A–Ö</option><option value="år">Nyaste år</option><option value="betyg">Vårt betyg</option><option value="säsonger">Svenska säsonger</option></select></label>
    </div></details>}
   </DiscoveryToolbar>}/>}
  {notice&&<div className="film-success" role="status">{notice}</div>}
  {error&&<div className="film-error" role="alert"><AlertCircle size={18}/><span>{error}</span><button type="button" onClick={load}>Försök igen</button></div>}
  {chosen!==null&&items[chosen]?<Detail item={items[chosen]} back={()=>setChosen(null)} onToggleWatchlist={()=>toggleWatchlist(items[chosen])} watchSaving={watchSaving} posterRevision={posterRevision}/>:<>
   
   {showing&&<div className="nh-discovery-results" id="nh-series-results">
   {activeGenreGroup&&<GenreSubfilters category={activeGenreGroup} onSelect={chooseCategory} mode="series"/>}
   <div className="film-list-heading"><h2>{filtered.length} serier</h2><button className="film-quiet" disabled={loading} onClick={load}><RefreshCw size={17} className={loading?'spin':''}/>Läs om från GitHub</button></div>
   {loading&&!data?<div className="film-loading"><Loader2 className="spin" size={24}/>Hämtar serieregistret…</div>:<>
    <div className="film-grid">{visible.map(({item,index})=>{const seasons=numbers(item.seasonAvailabilityResearch?.swedenAvailableSeasonNumbers);return <button className="film-card series-card" key={index} onClick={()=>choose(index)}><Poster item={item} revision={posterRevision}/><span className="series-flags"><span className={'film-status '+(item.allSeasonsAvailableInSwedenWatched?'seen':'planned')}>{item.allSeasonsAvailableInSwedenWatched?'Sedd i Sverige':item.status}</span>{item.favorite&&<Heart size={17} fill="currentColor" className="series-heart"/>}{seriesIsWatchlisted(item)&&<Bookmark size={17} fill="currentColor" className="series-bookmark" aria-label="Vill se"/>}</span><strong>{item.title}</strong><small>{item.startYear||'År saknas'} · {seasons.length?seasons.length+' belagda sv. säsonger':'Svenska nummer ej angivna'}</small><span className="film-card-rating">{item.ourRating!==null?<><Star fill="currentColor" size={14}/>{item.ourRating}/10</>:'Ej betygsatt'}</span></button>;})}</div>
    {!visible.length&&<div className="film-empty"><Tv size={33}/><p>{status==='villse'?'Din Vill se-lista är tom. Öppna en serie och välj ”Lägg till i Vill se”.':'Inga serier matchar. Ändra filtren.'}</p><button className="secondary" onClick={()=>{resetFilters();}}>Visa alla i resultatet</button></div>}
    {filtered.length>24&&<nav className="series-pager" aria-label="Sidor med serier"><button className="secondary" disabled={!page} onClick={()=>{setPage(p=>p-1);window.scrollTo(0,0);}}>Föregående</button><span>Sida {page+1} av {Math.ceil(filtered.length/24)}</span><button className="secondary" disabled={(page+1)*24>=filtered.length} onClick={()=>{setPage(p=>p+1);window.scrollTo(0,0);}}>Nästa</button></nav>}
   </>}
   <p className="film-source"><Globe2 size={14}/> Serierna läses direkt från GitHubs kanoniska register. Svenska säsongsnummer, rapporterade tjänsteantal och internationellt utgivna säsonger hålls isär. Affischer serveras från Nexus Hub.</p></div>}
  </>}
 </section>;
}
