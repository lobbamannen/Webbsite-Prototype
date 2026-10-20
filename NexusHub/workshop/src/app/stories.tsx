import {useDesign} from '@/studio/context';
'use client';
import React,{useEffect,useMemo,useState} from 'react';
import {BookOpen,Eye,House,Globe2,Scale,ScrollText,Search,ChevronLeft,ChevronRight,Star,Bookmark,BookmarkCheck,CheckCircle2,ExternalLink,Download,RefreshCw,Shuffle,AlertTriangle,Loader2,Minus,Plus,Layers} from 'lucide-react';
import {Markdown} from './nexus';
import {useStoryStatus} from './use-story-status';
import {storyList,storyExcerpt} from '@/lib/stories.mjs';
import {storyCategoryOverview} from '@/lib/module-dashboard.mjs';
import './stories.css';
import StoryOverview from '@/components/dashboard/StoryOverview';
import DiscoveryToolbar from '@/components/dashboard/DiscoveryToolbar';

type Story={path:string,title:string,category:string,ratingLabel:string,numericRating:number|null,docx:string|null,markdown:string|null,sha:string|null,formats:{path:string,sha:string,format:string,size?:number}[],rawName:string};
type StoryCheck={state:string,path:string,checkedAt?:string,verifiedAt?:string,githubSha?:string|null,mirrorSha?:string|null,error?:string};
type Props={mode:'mysterier'|'berattelser',documents:any[],onNavigate:(view:string)=>void,mirrorChecks:Record<string,StoryCheck>,onInspect:(path:string,title?:string)=>void,onRefresh:()=>void,loading?:boolean,initialCategory?:string,initialPath?:string};
const categoryClass=(name:string)=>name==='Hemsökta hus'?'haunted':name==='True crime'?'crime':name==='Internetmysterier & nätfenomen'?'internet':'historical';
function CoverIcon({category,size=40}:{category:string,size?:number}){return category==='Hemsökta hus'?<House size={size} strokeWidth={1.2}/>:category==='True crime'?<Scale size={size} strokeWidth={1.2}/>:category==='Internetmysterier & nätfenomen'?<Globe2 size={size} strokeWidth={1.2}/>:<Eye size={size} strokeWidth={1.2}/>;}
const hasWarning=(c?:StoryCheck)=>!!c&&!['same'].includes(c.state);
const message=(error:any)=>error?.message||'Dokumentet kunde inte öppnas.';
function StoryCover({story,big=false}:{story:Story,big?:boolean}){return <div className={'story-cover '+categoryClass(story.category)+(big?' big':'')}>
 <div className="story-cover-top"><span>NEXUS HUB</span><span>BERÄTTELSER</span></div>
 <div className="story-cover-art" aria-hidden="true"><CoverIcon category={story.category} size={big?96:72}/><span className="story-cover-circle"/></div>
 <div className="story-cover-text"><small>{story.category}</small><strong>{story.title}</strong></div>
 </div>;}
export default function Stories({mode,documents,onNavigate,mirrorChecks,onInspect,onRefresh,loading=false,initialCategory='',initialPath=''}:Props){
 const design=useDesign();
 const all=useMemo(()=>storyList(documents) as Story[],[documents]);
 const [query,setQuery]=useState(''),[category,setCategory]=useState('alla'),[rating,setRating]=useState('alla'),[sort,setSort]=useState('titel');
 const [browsing,setBrowsing]=useState(false),[jump,setJump]=useState(0);
 useEffect(()=>{if(browsing&&jump>0)requestAnimationFrame(()=>document.getElementById('nh-story-results')?.scrollIntoView({behavior:'smooth',block:'start'}));},[jump,browsing]);
 const [selected,setSelected]=useState<string|null>(null),[article,setArticle]=useState<any>(null),[reading,setReading]=useState(false),[error,setError]=useState('');
 const {savedPaths:saved,readPaths:finished,loading:marksLoading,busy:marksBusy,error:marksError,reload:reloadMarks,mark:markInGitHub}=useStoryStatus();
 const [font,setFont]=useState(17);
 useEffect(()=>{if(initialPath&&initialPath.startsWith('Berattelser/')&&initialPath.endsWith('.md')){setSelected(initialPath);setArticle(null);}},[initialPath]);
 const summary=useMemo(()=>storyCategoryOverview(all),[all]);
 const categories=summary.categories,counts=summary.counts;
 const chooseCategory=(next:string)=>{setCategory(next);setQuery('');setRating('alla');setBrowsing(true);setJump(n=>n+1);};
 const showAll=()=>{setCategory('alla');setQuery('');setRating('alla');setSort('titel');setBrowsing(true);setJump(n=>n+1);};
 const closeBrowse=()=>{setCategory('alla');setQuery('');setRating('alla');setSort('titel');setBrowsing(false);window.scrollTo({top:0,behavior:'smooth'});};
 const showing=browsing||!!query.trim();
 const [showIssues,setShowIssues]=useState(false);
 const issues=all.filter(x=>hasWarning(mirrorChecks[x.path]));
 useEffect(()=>{if(initialCategory&&categories.includes(initialCategory)){setCategory(initialCategory);setBrowsing(true);}},[initialCategory,categories.join('|')]);
 const visible=useMemo(()=>all.filter(x=>(category==='alla'||x.category===category)&&(rating==='alla'||(rating==='betygsatt'?x.numericRating!==null:rating==='obetygsatt'?x.numericRating===null:rating==='sparade'?saved.includes(x.path):finished.includes(x.path)))&&[x.title,x.rawName,x.category].join(' ').toLocaleLowerCase('sv').includes(query.trim().toLocaleLowerCase('sv'))).sort((a,b)=>sort==='betyg'?(b.numericRating??-1)-(a.numericRating??-1)||a.title.localeCompare(b.title,'sv'):sort==='kategori'?a.category.localeCompare(b.category,'sv')||a.title.localeCompare(b.title,'sv'):a.title.localeCompare(b.title,'sv')),[all,query,category,rating,sort,finished,saved]);
 const story=all.find(s=>s.path===selected)||null;
 const open=(path:string)=>{setSelected(path);setArticle(null);setError('');window.scrollTo(0,0);};
 useEffect(()=>{if(design['studio.storyRequest']){setSelected(null);setArticle(null);setBrowsing(true);setJump(n=>n+1);}},[design['studio.storyRequest']]);
 useEffect(()=>{if(design['studio.readerRequest']&&all.length){setSelected(all[0].path);setArticle(null);}},[design['studio.readerRequest'],all.length]);
 const back=()=>{setSelected(null);setArticle(null);setError('');window.scrollTo(0,0);};
 useEffect(()=>{if(!selected)return;let active=true;setReading(true);setArticle(null);setError('');
  fetch('/api/portal/document?repo=databas&path='+encodeURIComponent(selected),{cache:'no-store'})
   .then(async r=>{const d:any=await r.json();if(!r.ok)throw Error(d.error||'GitHub-dokumentet kunde inte läsas.');return d;})
   .then(d=>{if(active)setArticle(d);})
   .catch(e=>{if(active)setError(message(e));})
   .finally(()=>{if(active)setReading(false);});
  return()=>{active=false;};
 },[selected]);
 const mark=(path:string,kind:'saved'|'finished')=>{void markInGitHub(path,kind==='saved'?'saved':'read');};
 const surprise=()=>{if(all.length)open(all[Math.floor(Math.random()*all.length)].path);};
 const ratingLabel=(s:Story)=>s.ratingLabel==='Inget registrerat betyg'?'Ej betygsatt':s.ratingLabel;
 const headings=useMemo(()=>{const body=article?.body||'';return body.split('\n').map((line:string,index:number)=>({line,index,match:line.match(/^#{1,3}\s+(.+)/)})).filter((x:any)=>x.match).map((x:any)=>({id:'heading-'+x.index,text:x.match[1].replace(/\*\*/g,'')})).slice(0,70);},[article]);
 const sourceUrl=story?'https://github.com/lobbamannen/Databas/blob/main/'+story.path.split('/').map(encodeURIComponent).join('/'):'';
 const docx=story?.formats.find(f=>f.path.endsWith('.docx'));
 const download=docx&&article?.commit?'/api/portal/original?repo=databas&path='+encodeURIComponent(docx.path)+'&ref='+article.commit+'&blob='+encodeURIComponent(docx.sha):null;
 const statusBanner=(<div className={'stories-github-status '+(marksError?'error':'')} role="status">{marksError?<><AlertTriangle size={17}/><span>{marksError} Markeringen bekräftas först när GitHub har sparat den. Eventuella äldre telefonmarkeringar behålls tills migrationen lyckas.</span><button className="stories-text-button" onClick={()=>void reloadMarks()}>Försök igen</button></>:marksLoading?<><Loader2 size={16} className="spin"/>Hämtar Sparad och Läst från GitHub…</>:marksBusy?<><Loader2 size={16} className="spin"/>Sparar markering i GitHub…</>:<><CheckCircle2 size={16}/>Sparad och Läst hämtas från GitHub <button className="stories-text-button" onClick={()=>void reloadMarks()}><RefreshCw size={14}/>Uppdatera</button></>}</div>);
 return <div className="stories-app">
  {story?<>{statusBanner}<div className="stories-reader-top reader-toolbar"><button className="stories-text-button text-button" onClick={back}><ChevronLeft size={18}/>Till {mode==='berattelser'?'berättelserna':'mysterierna'}</button><button className="stories-text-button" disabled={marksLoading||!!marksBusy||!!marksError} onClick={()=>mark(story.path,'saved')}>{saved.includes(story.path)?<BookmarkCheck size={18}/>:<Bookmark size={18}/>} {saved.includes(story.path)?'Sparad i GitHub':'Spara i GitHub'}</button></div>
   <header className="stories-reader-header"><StoryCover story={story} big/><div className="stories-reader-summary"><span className="stories-kicker">{story.category}</span><h1>{story.title}</h1><div className="stories-badges"><span className="stories-rating"><Star size={17}/>{ratingLabel(story)}</span>{finished.includes(story.path)&&<span className="stories-read-tag"><CheckCircle2 size={16}/>Läst</span>}</div><p>{article?.body?storyExcerpt(article.body,380)||'Originaltexten visas oförkortad med källhänvisningar.':'Originaltexten visas oförkortad med källhänvisningar.'}</p><div className="stories-reader-actions">{download&&<a href={download} className="secondary"><Download size={17}/>Hämta DOCX</a>}<a href={sourceUrl} className="secondary" target="_blank" rel="noopener noreferrer"><ExternalLink size={17}/>GitHub-original</a></div></div></header>
   {hasWarning(mirrorChecks[story.path])&&<button className="stories-warning" onClick={()=>onInspect(story.path,story.title)}><AlertTriangle size={17}/>Visa avvikelse i spegeln<ChevronRight size={18}/></button>}
   {error&&<div className="stories-error" role="alert"><AlertTriangle size={18}/>{error}<button className="stories-text-button" onClick={()=>open(story.path)}>Försök igen</button></div>}
   {reading?<div className="stories-loading"><Loader2 className="spin"/>Kontrollerar GitHub och öppnar berättelsen…</div>:article?.body?<div className="stories-reader-layout"><aside className="stories-contents"><h3>Innehåll</h3><nav aria-label="Berättelsens innehåll">{headings.map((h:{id:string,text:string})=><a key={h.id} href={'#'+h.id}>{h.text}</a>)}</nav><p>Rubriker hämtade ur originalberättelsen.</p></aside><article className="stories-reader-article"><div className="stories-reading-tools"><span><BookOpen size={18}/> Berättelse i fulltext</span><div><button aria-label="Mindre text" disabled={font<=15} onClick={()=>setFont(n=>Math.max(15,n-1))}><Minus size={17}/></button><span>{font}px</span><button aria-label="Större text" disabled={font>=24} onClick={()=>setFont(n=>Math.min(24,n+1))}><Plus size={17}/></button></div></div><div className="prose stories-prose" style={{fontSize:font}}><Markdown text={article.body}/></div><div className="stories-reading-end"><p>Du har nått slutet av berättelsen.</p><button className="secondary" disabled={marksLoading||!!marksBusy||!!marksError} onClick={()=>mark(story.path,'finished')}>{finished.includes(story.path)?<CheckCircle2 size={17}/>:<BookOpen size={17}/>} {finished.includes(story.path)?'Markerad som läst – ångra':'Markera som läst'}</button><button className="stories-text-button" onClick={back}>Till biblioteket <ChevronRight size={16}/></button><small>Sparad och Läst lagras i Berattelser/lasstatus.json i GitHub efter bekräftad skrivning. Originalberättelserna ändras inte.</small></div></article></div>:!reading&&!error?<div className="stories-loading">Det finns ingen läsbar Markdowntext för denna post. Använd originalfilen ovan.</div>:null}
   {article?.mirror&&<div className="stories-source-note"><strong>{article.mirror.state==='verified'?'GitHub-kontrollerat original':'Lokalt dokument med begränsad GitHub-verifiering'}</strong><span>{article.mirror.state==='verified'?'Lokal kopia verifierad':article.mirror.state==='stale'?'Reservkopia – GitHub kunde inte nås':article.mirror.state==='archived'?'Arkiverad version':'Källa: '+article.origin} · GitHub-commit {article.commit?.slice(0,12)||'okänd'}</span></div>}
  </>:<>
   <StoryOverview onSurprise={surprise} mode={mode} stories={all} categories={categories} counts={counts} finishedCount={finished.filter(x=>all.some(s=>s.path===x)).length} selectedCategory={category} loading={loading} onSelectCategory={chooseCategory} onNavigate={onNavigate} toolbar={<DiscoveryToolbar query={query} onQuery={value=>{setQuery(value);if(value.trim())setBrowsing(true);}} placeholder="Sök bland berättelserna…" browsing={showing} onShowAll={showAll} onClose={closeBrowse} showAllLabel={'Visa alla '+all.length+' berättelser'} secondary={<>
    <span className="nh-discovery-small-note"><CheckCircle2 size={15}/>Sparad och Läst via GitHub</span>
    
    <button className="nh-tool-action" type="button" onClick={onRefresh}><RefreshCw size={16}/>Uppdatera</button>
    <button className="nh-tool-action" type="button" disabled={marksLoading||!!marksBusy} onClick={()=>void reloadMarks()} title="Uppdatera Sparad och Läst"><CheckCircle2 size={16}/>Lässtatus</button>
   </>}>
    {showing&&<details className="nh-discovery-options"><summary>Sortera och filtrera berättelser</summary><div className="stories-filterbar nh-advanced-filters">
     <label>Betyg / läsning<select value={rating} onChange={e=>setRating(e.target.value)}><option value="alla">Alla</option><option value="betygsatt">Har exakt betyg</option><option value="obetygsatt">Utan exakt betyg</option><option value="lästa">Markerade som lästa</option><option value="sparade">Sparade i GitHub</option></select></label>
     <label>Sortera<select value={sort} onChange={e=>setSort(e.target.value)}><option value="titel">Titel A–Ö</option><option value="kategori">Kategori</option><option value="betyg">Högsta exakta betyg</option></select></label>
    </div></details>}
   </DiscoveryToolbar>}/>
   
   {(marksError||marksLoading||marksBusy)&&statusBanner}
   {showing&&<div className="nh-discovery-results" id="nh-story-results">
   <div className="stories-list-header"><h2>{visible.length} berättelser</h2><span>Från lobbamannen/Databas</span></div>
   {issues.length>0&&<div className="stories-issues"><button className="stories-issues-toggle" onClick={()=>setShowIssues(v=>!v)}><AlertTriangle size={17}/>{showIssues?'Dölj':'Visa'} avvikelser ({issues.length})<ChevronRight size={16}/></button>{showIssues&&<div className="stories-issues-list">{issues.map(s=><button key={s.path} onClick={()=>onInspect(s.path,s.title)}><AlertTriangle size={15}/><span><strong>{s.title}</strong><small>{mirrorChecks[s.path]?.state==='divergent'?'Lokal kontrollsumma kunde inte verifieras':mirrorChecks[s.path]?.state==='different'?'GitHub har en annan version':mirrorChecks[s.path]?.state==='missing'?'Saknar lokal kopia':mirrorChecks[s.path]?.state==='unknown'?'GitHub kunde inte verifieras':'Annat avvikande tillstånd'}</small></span><ChevronRight size={15}/></button>)}</div>}</div>}
   {loading&&!documents.length?<div className="stories-loading"><Loader2 className="spin"/>Läser GitHub-katalogen…</div>:<div className="stories-grid">{visible.map(s=><div className="stories-card" key={s.path}><button className="stories-card-main" onClick={()=>open(s.path)}><StoryCover story={s}/><div className="stories-card-info"><span className="stories-category-label">{s.category}</span><h3>{s.title}</h3><div className="stories-card-meta"><span className="stories-rating"><Star size={15}/>{ratingLabel(s)}</span>{finished.includes(s.path)&&<span className="stories-read-tag"><CheckCircle2 size={14}/>Läst</span>}</div><span className="stories-open">Läs berättelsen <ChevronRight size={16}/></span></div></button><div className="stories-card-controls"><button disabled={marksLoading||!!marksBusy||!!marksError} title={saved.includes(s.path)?'Ta bort från sparade i GitHub':'Spara berättelse i GitHub'} aria-label={saved.includes(s.path)?'Ta bort '+s.title+' från sparade':'Spara '+s.title} onClick={()=>mark(s.path,'saved')}>{saved.includes(s.path)?<BookmarkCheck size={17}/>:<Bookmark size={17}/>}</button>{hasWarning(mirrorChecks[s.path])&&<button className="stories-card-warning" onClick={()=>onInspect(s.path,s.title)}><AlertTriangle size={15}/>Visa avvikelse</button>}</div></div>)}</div>}
   {!loading&&visible.length===0&&<p className="stories-empty">Inga berättelser matchar filtret. Välj en annan kategori eller sökning.</p>}
   <p className="stories-disclaimer">Alla kategorier och berättelser hämtas från GitHub. Betyg återges från originalens filnamn; ord som ”Bra” och betygsintervall omvandlas inte till påhittade sifferbetyg. Omslagen är grafiska kategoriillustrationer, inte fotografier av platserna.</p>
   </div>}
  </>}
 </div>;
}

