import {useDesign} from '@/studio/context';
'use client';
import React,{useEffect,useMemo,useState} from 'react';
import {Film,Clapperboard,Search,Plus,ChevronLeft,ExternalLink,Star,Heart,CalendarDays,Play,RefreshCw,Save,X,Popcorn,Loader2,AlertCircle,Trash2,Edit3} from 'lucide-react';
import './films.css';
import MediaOverview from '@/components/dashboard/MediaOverview';
import DiscoveryToolbar from '@/components/dashboard/DiscoveryToolbar';
import {filmDiscovery} from '@/lib/media-discovery.mjs';
import {matchesGenreGroup} from '@/lib/genre-taxonomy.mjs';
import {GenreSubfilters} from '@/components/dashboard/MediaOverview';
import RepositoryPoster,{usePosterRevision} from '@/components/repository-poster';

type Status='Inte sett'|'Sedd'|'Pågående'|'Vill se'|'Avbruten';
type Access='okänt'|'abonnemang'|'gratis'|'hyrd'|'köpt'|'annat';
type Viewing={date:string|null,provider:string|null,accessType:Access,priceSek:number|null};
type FilmEntry={imdbId:string,title:string,year:number,displayTitle:string,genres:string[],status:Status,favorite?:boolean,ourRating:number|null,ourReview:string|null,synopsis:string|null,series:{name:string,number:number}|null,viewings:Viewing[],startedViewingDate:string|null,plannedViewingDate:string|null,statusEvidence:{type:'direkt'|'serieuppgift',note:string},metadataSource:string};
type FilmRegistry={schemaVersion:string,lastUpdated:string,description:string,films:FilmEntry[]};
type FilmResponse={sha:string,register:FilmRegistry};
const STATUSES:Status[]=['Inte sett','Sedd','Pågående','Vill se','Avbruten'];
const ACCESS:Access[]=['okänt','abonnemang','gratis','hyrd','köpt','annat'];
const statusClass=(value:Status)=>value==='Sedd'?'seen':value==='Pågående'?'watching':value==='Vill se'?'planned':'stopped';
const dateLabel=(v:string|null)=>v?new Date(v+'T12:00:00').toLocaleDateString('sv-SE'):'Okänt datum';
const money=(v:number|null)=>v===null?'Okänt belopp':v.toLocaleString('sv-SE',{style:'currency',currency:'SEK',maximumFractionDigits:2});
const emptyFilm=():FilmEntry=>({imdbId:'',title:'',year:0,displayTitle:'',genres:[],status:'Inte sett',favorite:false,ourRating:null,ourReview:null,synopsis:null,series:null,viewings:[],startedViewingDate:null,plannedViewingDate:null,statusEvidence:{type:'direkt',note:'Status registrerad av användaren i Nexus Hub.'},metadataSource:''});
const blankViewing=():Viewing=>({date:null,provider:null,accessType:'okänt',priceSek:null});
const trimOrNull=(s:string)=>s.trim()||null;
const providerLabel=(v:Viewing)=>v.provider||'Okänd tjänst/plats';
const handleResponse=async(r:Response)=>{let payload:any;try{payload=await r.json();}catch{throw Error('Servern returnerade inget giltigt svar. Kontrollera GitHub innan ett nytt sparförsök.');}if(!r.ok)throw Object.assign(Error(payload.error||'Något gick fel.'),{status:r.status});return payload;};

function Poster({film,large=false,revision}:{film:FilmEntry,large?:boolean,revision:string}){
 return <div className={'film-poster '+(large?'large':'')}><RepositoryPoster kind="films" posterKey={film.imdbId} revision={revision} alt={'Filmaffisch: '+film.title}><div className="film-poster-fallback"><Clapperboard size={large?58:38} strokeWidth={1.1}/><span>{film.title}</span></div></RepositoryPoster></div>;
}
function FilmForm({value,original,save,cancel,saving}:{value:FilmEntry,original:boolean,save:(f:FilmEntry)=>void,cancel:()=>void,saving:boolean}){
 const [draft,setDraft]=useState<FilmEntry>(()=>structuredClone(value)),[genreText,setGenreText]=useState(value.genres.join(', ')),[seriesName,setSeriesName]=useState(value.series?.name||''),[seriesNumber,setSeriesNumber]=useState(value.series?.number?.toString()||''),[formError,setFormError]=useState('');
 const set=(patch:Partial<FilmEntry>)=>setDraft(f=>({...f,...patch}));
 const viewing=(index:number,patch:Partial<Viewing>)=>setDraft(f=>({...f,viewings:f.viewings.map((v,i)=>i===index?{...v,...patch}:v)}));
 const submit=(e:React.FormEvent)=>{e.preventDefault();setFormError('');
  const id=draft.imdbId.trim();
  if(!/^tt\d{7,9}$/.test(id)){setFormError('IMDb-ID ska börja med tt följt av 7–9 siffror.');return;}
  if(seriesName.trim()&&(!Number.isInteger(Number(seriesNumber))||Number(seriesNumber)<1)){setFormError('Ange filmens nummer i serien.');return;}
  if(!genreText.split(',').some(s=>s.trim())){setFormError('Ange minst en genre.');return;}
  save({...draft,imdbId:id,title:draft.title.trim(),displayTitle:draft.title.trim()+' – ('+draft.year+')',genres:genreText.split(',').map(s=>s.trim()).filter(Boolean),viewings:draft.viewings.map(v=>({...v,provider:trimOrNull(v.provider||'')})),series:seriesName.trim()?{name:seriesName.trim(),number:Number(seriesNumber)}:null,ourReview:trimOrNull(draft.ourReview||''),synopsis:trimOrNull(draft.synopsis||''),metadataSource:'https://www.imdb.com/title/'+id+'/'});
 };
 return <form className="film-form" onSubmit={submit}>
  <div className="film-form-heading reader-toolbar"><h2>{original?'Redigera film':'Lägg till film'}</h2><button type="button" className="film-quiet text-button" disabled={saving} onClick={cancel}><X size={18}/>Avbryt</button></div>
  <p className="film-muted">Ändringar sparas direkt till GitHub. Okända betyg, datum, tjänster och priser lämnas tomma.</p>
  {formError&&<p className="film-error" role="alert">{formError}</p>}
  <div className="film-fields">
   <label>Titel<input required maxLength={250} value={draft.title} onChange={e=>set({title:e.target.value})} placeholder="Filmens originaltitel"/></label>
   <label>IMDb-ID<input required pattern="tt[0-9]{7,9}" disabled={original} value={draft.imdbId} onChange={e=>set({imdbId:e.target.value})} placeholder="tt1234567"/></label>
   <label>Årtal<input required type="number" min="1880" max="2100" value={draft.year||''} onChange={e=>set({year:Number(e.target.value)})}/></label>
   <label>Genre / underkategori, kommaseparerat<input required value={genreText} onChange={e=>setGenreText(e.target.value)} placeholder="Skräck, Paranormalt"/></label>
   <label>Status<select value={draft.status} onChange={e=>set({status:e.target.value as Status,statusEvidence:{type:'direkt',note:'Status bekräftad vid redigering i Nexus Hub.'}})}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></label>
   <label>Vårt betyg, 0–10 (valfritt)<input type="number" min="0" max="10" step=".5" value={draft.ourRating??''} onChange={e=>set({ourRating:e.target.value===''?null:Number(e.target.value)})} placeholder="Inte betygsatt"/></label>
   <label>Påbörjad<input type="date" value={draft.startedViewingDate||''} onChange={e=>set({startedViewingDate:e.target.value||null})}/></label>
   <label>Planerad visning<input type="date" value={draft.plannedViewingDate||''} onChange={e=>set({plannedViewingDate:e.target.value||null})}/></label>
   <label>Filmserie<input value={seriesName} maxLength={150} onChange={e=>setSeriesName(e.target.value)} placeholder="T.ex. Insidious"/></label>
   <label>Nummer i serien<input type="number" min="1" value={seriesNumber} onChange={e=>setSeriesNumber(e.target.value)} placeholder="1"/></label>
   <label className="film-full">Handling utan spoilers<textarea rows={3} value={draft.synopsis||''} onChange={e=>set({synopsis:e.target.value})} maxLength={5000}/></label>
   <label className="film-full">Vårt personliga omdöme<textarea rows={4} value={draft.ourReview||''} onChange={e=>set({ourReview:e.target.value})} maxLength={12000} placeholder="Vad tyckte vi om filmen?"/></label>
  </div>
  <div className="film-form-heading"><h3>Visningshistorik</h3><button className="film-quiet" type="button" onClick={()=>setDraft(f=>({...f,viewings:[...f.viewings,blankViewing()]}))}><Plus size={17}/>Lägg till visning</button></div>
  <p className="film-muted">Ändra en äldre okänd visning om du vill komplettera den. Skapa en ny vid omtittning.</p>
  {draft.viewings.map((v,i)=><div className="film-viewing-edit" key={i}>
   <div className="film-viewing-header"><strong>Visning {i+1}</strong><button type="button" className="film-quiet" onClick={()=>{if(confirm('Vill du verkligen ta bort denna visning från historiken?'))setDraft(f=>({...f,viewings:f.viewings.filter((_,j)=>j!==i)}));}}><Trash2 size={15}/>Ta bort</button></div>
   <div className="film-fields">
    <label>Datum<input type="date" value={v.date||''} onChange={e=>viewing(i,{date:e.target.value||null})}/></label>
    <label>Var såg vi filmen?<input maxLength={160} value={v.provider||''} onChange={e=>viewing(i,{provider:e.target.value})} placeholder="T.ex. Netflix eller biograf"/></label>
    <label>Åtkomst<select value={v.accessType} onChange={e=>viewing(i,{accessType:e.target.value as Access})}>{ACCESS.map(a=><option key={a} value={a}>{a==='okänt'?'Okänt':a.charAt(0).toUpperCase()+a.slice(1)}</option>)}</select></label>
    <label>Extra kostnad (kr)<input type="number" min="0" step=".01" value={v.priceSek??''} onChange={e=>viewing(i,{priceSek:e.target.value===''?null:Number(e.target.value)})} placeholder="Okänt"/></label>
   </div>
  </div>)}
  <div className="film-actions"><button className="secondary" type="button" disabled={saving} onClick={cancel}>Avbryt</button><button className="primary" disabled={saving}>{saving?<Loader2 size={17} className="spin"/>:<Save size={17}/>}Spara till GitHub</button></div>
 </form>;
}
export default function Films({initialItem}:{initialItem?:string|null}={}){
 const design=useDesign();
 const [posterRevision,refreshPosters]=usePosterRevision();
 const [data,setData]=useState<FilmResponse|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState(''),[notice,setNotice]=useState(''),[conflict,setConflict]=useState(false),[saving,setSaving]=useState(false);
 const [selected,setSelected]=useState<string|null>(null),[draft,setDraft]=useState<FilmEntry|null>(null),[isNew,setIsNew]=useState(false);
 const [query,setQuery]=useState(''),[status,setStatus]=useState('alla'),[genre,setGenre]=useState('alla'),[series,setSeries]=useState('alla'),[favorite,setFavorite]=useState('alla'),[sort,setSort]=useState('titel');
 const [browsing,setBrowsing]=useState(false),[jump,setJump]=useState(0),[genreGroup,setGenreGroup]=useState<string|null>(null);
 useEffect(()=>{if(browsing&&jump>0)requestAnimationFrame(()=>document.getElementById('nh-film-results')?.scrollIntoView({behavior:'smooth',block:'start'}));},[jump,browsing]);
 const load=async()=>{setLoading(true);setError('');void refreshPosters();try{setData(await handleResponse(await fetch('/api/films',{cache:'no-store'})));}catch(e:any){setError(e.message);}finally{setLoading(false);}};
 useEffect(()=>{load();},[]);
  useEffect(()=>{if(initialItem){setSelected(initialItem);setDraft(null);setError('');}},[initialItem]);
 useEffect(()=>{if(design['studio.mediaRequest']){setSelected(null);setDraft(null);setBrowsing(true);setJump(n=>n+1);}},[design['studio.mediaRequest']]);
 const films=data?.register.films||[];
 const discovery=useMemo(()=>filmDiscovery(films),[films]);
 const resetFilters=()=>{setStatus('alla');setGenre('alla');setGenreGroup(null);setSeries('alla');setFavorite('alla');setQuery('');setSort('titel');};
 const chooseCategory=(id:string|null)=>{resetFilters();if(id?.startsWith('status:'))setStatus(id.slice(7));else if(id?.startsWith('genregroup:'))setGenreGroup(id.slice('genregroup:'.length));else if(id?.startsWith('genre:'))setGenre(id.slice(6));else if(id?.startsWith('filmseries:'))setSeries(id.slice(11));setBrowsing(true);setJump(n=>n+1);};
 const showAll=()=>{resetFilters();setBrowsing(true);setJump(n=>n+1);};
 const closeBrowse=()=>{resetFilters();setBrowsing(false);window.scrollTo({top:0,behavior:'smooth'});};
 const activeCategory=genreGroup?'genregroup:'+genreGroup:status!=='alla'?'status:'+status:genre!=='alla'?'genre:'+genre:series!=='alla'?'filmseries:'+series:null;
 const showing=browsing||!!query.trim();
 const genres=useMemo(()=>[...new Set(films.flatMap(f=>f.genres))].sort((a,b)=>a.localeCompare(b,'sv')),[films]);
 const activeGenreGroup=genreGroup?discovery.groups.find(x=>x.id==='genre')?.items.find(x=>x.id==='genregroup:'+genreGroup):null;
 const seriesOptions=useMemo(()=>[...new Set(films.flatMap(f=>f.series?[f.series.name]:[]))].sort((a,b)=>a.localeCompare(b,'sv')),[films]);
 const visible=useMemo(()=>films.filter(f=>(status==='alla'||f.status===status)&&(!genreGroup||matchesGenreGroup(f,genreGroup))&&(genre==='alla'||f.genres.includes(genre))&&(series==='alla'||f.series?.name===series)&&(favorite==='alla'||Boolean(f.favorite)===(favorite==='ja'))&&[f.title,f.year.toString(),f.imdbId,f.genres.join(' '),f.series?.name||''].join(' ').toLocaleLowerCase('sv').includes(query.trim().toLocaleLowerCase('sv'))).sort((a,b)=>sort==='år'?b.year-a.year:sort==='betyg'?(b.ourRating??-1)-(a.ourRating??-1):sort==='serie'?(a.series?.name||'Övriga').localeCompare(b.series?.name||'Övriga','sv')||(a.series?.number||0)-(b.series?.number||0):a.title.localeCompare(b.title,'sv')),[films,status,genreGroup,genre,series,favorite,query,sort]);
 const film=films.find(f=>f.imdbId===selected);
 const open=(f:FilmEntry)=>{setDraft(null);setSelected(f.imdbId);setError('');setNotice('');};
 const startEdit=(f:FilmEntry)=>{setDraft(structuredClone(f));setIsNew(false);setConflict(false);setError('');};
 const startNew=()=>{setSelected(null);setDraft(emptyFilm());setIsNew(true);setConflict(false);setError('');setNotice('');};
 const save=async(f:FilmEntry)=>{if(!data)return;setSaving(true);setError('');setNotice('');setConflict(false);
  try{const result=await handleResponse(await fetch('/api/films',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({expectedSha:data.sha,action:isNew?'create':'update',film:f})}));
   setData({sha:result.sha,register:result.register});setSelected(f.imdbId);setDraft(null);setIsNew(false);setNotice(result.warning||'Filmen är sparad i GitHub.');}
  catch(e:any){setError(e.message||'Kunde inte spara.');if(e.status===409)setConflict(true);}
  finally{setSaving(false);}};
 return <section className="film-library">
  {draft||film?<div className="film-intro film-compact-intro"><div><p className="eyebrow">NEXUS HUB · FILMER</p><h1><Film size={27}/>Filmer</h1></div></div>:<MediaOverview mode="films" total={discovery.total} metrics={discovery.metrics} groups={discovery.groups} selectedId={activeCategory} onSelect={chooseCategory} onShowAll={showAll} onCreate={startNew} onRefresh={load} loading={loading} toolbar={<DiscoveryToolbar query={query} onQuery={value=>{setQuery(value);if(value.trim())setBrowsing(true);}} placeholder="Sök titel, år eller IMDb-ID…" browsing={showing} onShowAll={showAll} onClose={closeBrowse} showAllLabel={'Visa alla '+films.length+' filmer'}>
    {showing&&<details className="nh-discovery-options" open={design['media.filters']==='open'||undefined}><summary>Sortera och kombinera filter</summary><div className="film-filters nh-advanced-filters">
     <label><span>Status</span><select value={status} onChange={e=>setStatus(e.target.value)}><option value="alla">Alla statusar</option>{STATUSES.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
     <label><span>Genre</span><select value={genre} onChange={e=>{setGenreGroup(null);setGenre(e.target.value);}}><option value="alla">Alla genrer</option>{genres.map(x=><option key={x}>{x}</option>)}</select></label>
     <label><span>Filmserie</span><select value={series} onChange={e=>setSeries(e.target.value)}><option value="alla">Alla filmserier</option>{seriesOptions.map(x=><option key={x}>{x}</option>)}</select></label>
     <label><span>Favorit</span><select value={favorite} onChange={e=>setFavorite(e.target.value)}><option value="alla">Alla filmer</option><option value="ja">Favoriter</option><option value="nej">Ej favoriter</option></select></label>
     <label><span>Sortera</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="titel">Titel A–Ö</option><option value="år">Nyaste år</option><option value="betyg">Vårt betyg</option><option value="serie">Filmserie</option></select></label>
    </div></details>}
   </DiscoveryToolbar>}/>}
  {notice&&<div className="film-success" role="status">{notice}<button className="film-quiet" onClick={()=>setNotice('')} aria-label="Stäng"><X size={15}/></button></div>}
  {error&&<div className="film-error" role="alert"><AlertCircle size={19}/><span>{error}</span>{conflict?<button type="button" onClick={()=>{if(confirm('Hämta den senaste GitHub-versionen? Dina osparade ändringar i formuläret försvinner.')){setDraft(null);setConflict(false);load();}}}>Ladda senaste GitHub-version</button>:<button onClick={load}>Uppdatera</button>}</div>}
  {draft?<FilmForm key={isNew?'new':draft.imdbId} original={!isNew} value={draft} save={save} cancel={()=>{setDraft(null);setError('');setConflict(false);}} saving={saving}/>:film?<div className="film-detail">
   <div className="film-detail-top reader-toolbar"><button className="film-quiet text-button" onClick={()=>setSelected(null)}><ChevronLeft size={19}/>Till biblioteket</button><div className="film-detail-actions"><button className="secondary film-favorite-toggle" disabled={saving} onClick={()=>save({...film,favorite:!film.favorite})}><Heart size={17} fill={film.favorite?'currentColor':'none'}/>{film.favorite?'Ta bort favorit':'Markera som favorit'}</button><button className="primary" onClick={()=>startEdit(film)}><Edit3 size={17}/>Redigera</button></div></div>
   <div className="film-detail-hero"><Poster film={film} large revision={posterRevision}/><div className="film-detail-content"><span className={'film-status '+statusClass(film.status)}>{film.status}</span>{film.favorite&&<span className="film-favorite-label"><Heart size={15} fill="currentColor"/>Favorit</span>}<h2>{film.displayTitle}</h2><p className="film-muted">{film.genres.join(' · ')}</p>{film.ourRating!==null?<div className="film-rating"><Star fill="currentColor"/>{film.ourRating} / 10 <small>Vårt betyg</small></div>:<p className="film-muted">Inte betygsatt ännu</p>}<p>{film.synopsis||'Ingen handling registrerad ännu.'}</p>{film.series&&<p><strong>Filmserie:</strong> {film.series.name}, del {film.series.number}</p>}<a className="film-imdb" href={'https://www.imdb.com/title/'+film.imdbId+'/'} target="_blank" rel="noopener noreferrer"><ExternalLink size={16}/>Visa på IMDb</a></div></div>
   <div className="film-detail-sections"><section><h3>Vårt omdöme</h3><p>{film.ourReview||'Vi har inte skrivit något omdöme än.'}</p></section><section><h3>Visningshistorik</h3>{film.viewings.length?film.viewings.map((v,i)=><div className="film-viewing" key={i}><CalendarDays size={19}/><div><strong>{dateLabel(v.date)}</strong><p>{providerLabel(v)} · {v.accessType} · {money(v.priceSek)} i extra kostnad</p></div></div>):<p>Inga visningar registrerade.</p>}{film.startedViewingDate&&<p><Play size={15}/> Påbörjad: {dateLabel(film.startedViewingDate)}</p>}{film.plannedViewingDate&&<p><CalendarDays size={15}/> Planerad: {dateLabel(film.plannedViewingDate)}</p>}</section></div>
  </div>:<React.Fragment>
   
   {showing&&<div className="nh-discovery-results" id="nh-film-results">
   {activeGenreGroup&&<GenreSubfilters category={activeGenreGroup} onSelect={chooseCategory} mode="films"/>}
   <div className="film-list-heading"><h2>{visible.length} filmer</h2><button className="film-quiet" disabled={loading} onClick={load}><RefreshCw size={17}/>Läs om från GitHub</button></div>
   {loading&&!data?<div className="film-loading"><Loader2 size={24} className="spin"/>Läser filmregistret…</div>:<div className="film-grid">{visible.map(f=><button className="film-card" key={f.imdbId} onClick={()=>open(f)}><Poster film={f} revision={posterRevision}/><span className={'film-status '+statusClass(f.status)}>{f.status}</span>{f.favorite&&<span className="film-favorite-label"><Heart size={14} fill="currentColor"/>Favorit</span>}<strong>{f.title}</strong><small>{f.year}{f.series?' · '+f.series.name+' #'+f.series.number:''}</small><span className="film-card-rating">{f.ourRating!==null?<><Star size={14} fill="currentColor"/> {f.ourRating}/10</>:'Ej betygsatt'}</span></button>)}</div>}
   {!loading&&!visible.length&&<div className="film-empty"><Popcorn size={34}/><p>Inga filmer matchade urvalet.</p></div>}
   <p className="film-source">Metadata, vår historik och våra betyg läses från GitHub. Affischerna hämtas från vårt GitHub-bibliotek via Nexus Hub. Externa filmbilder ändrar aldrig vårt register.</p>
   </div>}
  </React.Fragment>}
 </section>;
}

