'use client';
import React from 'react';
import {Database,CheckCircle2} from 'lucide-react';
type Props={counts:{files:number|null};checkedAt?:string|null;onNavigate:(id:string)=>void;loading?:boolean};
function catalogTimeLabel(iso?:string|null,now=new Date()):string|null{
 if(!iso)return null;
 const value=new Date(iso);
 if(!Number.isFinite(value.getTime()))return null;
 const date=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Stockholm',year:'numeric',month:'2-digit',day:'2-digit'});
 const key=(d:Date)=>date.formatToParts(d).filter(p=>p.type==='year'||p.type==='month'||p.type==='day').map(p=>p.value).join('-');
 const today=key(now);
 const todayParts=date.formatToParts(now);
 const part=(type:string)=>Number(todayParts.find(p=>p.type===type)?.value||0);
 const yesterday=key(new Date(Date.UTC(part('year'),part('month')-1,part('day')-1,12)));
 const time=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Stockholm',hour:'2-digit',minute:'2-digit',hour12:false}).format(value);
 const day=key(value);
 const month=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Stockholm',day:'numeric',month:'long'}).format(value);
 const year=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Stockholm',year:'numeric'}).format(value);
 const currentYear=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Stockholm',year:'numeric'}).format(now);
 return day===today?'idag '+time:day===yesterday?'igår '+time:month+(year===currentYear?'':' '+year)+' '+time;
}
export default function DatabaseStats({counts,checkedAt,onNavigate,loading}:Props){
 const timestamp=catalogTimeLabel(checkedAt);
 return <section className="nh-dashboard-stats nh-surface" aria-labelledby="nh-statistics-title">
  <button type="button" className="nh-total-link" onClick={()=>onNavigate('sok')} aria-label="Utforska alla filer i databasen">
   <span className="nh-total-icon"><Database size={28} strokeWidth={1.7} aria-hidden="true"/></span>
   <span className="nh-total-copy">
    <span id="nh-statistics-title" className="nh-total-heading">Din databas</span>
    <span className="nh-total-count"><strong>{typeof counts.files==='number'?counts.files.toLocaleString('sv-SE'):'–'}</strong><span>filer i GitHub</span></span>
   </span>
  </button>
  <div className="nh-sync-state" aria-label={timestamp?'Katalog hämtad från GitHub':'Katalogstatus ej verifierad'}>
   <span>{timestamp&&<CheckCircle2 size={15} aria-hidden="true"/>}{timestamp?'Katalog hämtad':loading?'Hämtar…':'Ej verifierad'}</span>
   {timestamp&&<time dateTime={checkedAt||undefined} title="Tidpunkt då katalogen hämtades">{timestamp}</time>}
  </div>
 </section>;
}
