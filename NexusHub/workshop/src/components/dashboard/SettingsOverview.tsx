'use client';
import React from 'react';
import {ArrowRight,Database,FolderCheck,ShieldCheck,Settings2,RefreshCw} from 'lucide-react';

type Props={
 fileCount?:number|null;verifiedFiles?:number|null;pending?:number|null;verifiedAt?:string|null;
 onOpenAudit:()=>void;onOpenSync:()=>void
};
const display=(value?:number|null)=>typeof value==='number'?value.toLocaleString('sv-SE'):'–';
export default function SettingsOverview({fileCount,verifiedFiles,pending,verifiedAt,onOpenAudit,onOpenSync}:Props){
 const timestamp=verifiedAt&&!Number.isNaN(Date.parse(verifiedAt))?new Date(verifiedAt).toLocaleString('sv-SE'):null;
 return <section className="nh-settings-overview nh-module-dashboard" aria-labelledby="nh-settings-title">
  <header className="nh-module-dashboard-header"><div className="nh-module-dashboard-title"><span className="nh-module-heading-icon"><Settings2 size={29} aria-hidden="true"/></span><div><span className="nh-module-eyebrow">NEXUS HUB · SYSTEM</span><h1 id="nh-settings-title">Inställningar & system</h1><p>Se systemets status och öppna verifiering eller synkronisering vid behov.</p></div></div></header>
  <div className="nh-module-stat-row nh-settings-stat-row" aria-label="Systemöversikt">
   <div className="nh-module-stat nh-tone-blue"><Database size={22}/><strong>{display(fileCount)}</strong><span>Filer i GitHub</span></div>
   <div className="nh-module-stat nh-tone-green"><FolderCheck size={22}/><strong>{display(verifiedFiles)}</strong><span>Versionsmatchningar</span></div>
   <div className="nh-module-stat nh-tone-orange"><RefreshCw size={22}/><strong>{display(pending)}</strong><span>Väntar på synk</span></div>
  </div>
  <p className="nh-settings-verification"><ShieldCheck size={17}/>GitHub är huvudkälla. {timestamp?'Senaste spegelinventering: '+timestamp+'.':'Tid för senaste spegelinventering saknas.'} En versionsmatchning är inte detsamma som byteverifiering.</p>
  <div className="nh-settings-actions"><button className="nh-settings-action" type="button" onClick={onOpenAudit}><ShieldCheck size={23}/><span><strong>Verifiera hela databasen</strong><small>Kontrollera verkliga lagrade filbytes och avvikelser</small></span><ArrowRight size={18}/></button>
  <button className="nh-settings-action" type="button" onClick={onOpenSync}><RefreshCw size={23}/><span><strong>Synkronisering & administration</strong><small>Lokal spegel, överföring, avvikelser och avancerade val</small></span><ArrowRight size={18}/></button></div>
 </section>;
}
