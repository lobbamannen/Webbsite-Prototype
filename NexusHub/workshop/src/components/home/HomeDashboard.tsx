'use client';
import React,{useEffect,useState} from 'react';
import DatabaseStats from './DatabaseStats';
import ModuleGrid from './ModuleGrid';
import RecentActivity from './RecentActivity';
import {usePosterRevision} from '@/components/repository-poster';
import './home-dashboard.css';
import {seriesIsWatchlisted} from '@/lib/media-discovery.mjs';
import {databaseCategoryOverview} from '@/lib/module-dashboard.mjs';

type Props={
 catalog:any;pluginRepo:any;stories:any[];recentFiles:any[];commits:any[];
 onNavigate:(view:string)=>void;onOpenMedia:(view:'filmer'|'serier',item:string)=>void;onUpload:()=>void;onOpenStory:(path:string)=>void;onOpenFile:(item:any)=>void;
};
export default function HomeDashboard({catalog,pluginRepo,stories,recentFiles,commits,onNavigate,onOpenMedia,onUpload,onOpenStory,onOpenFile}:Props){
 const [posterRevision,refreshPosters]=usePosterRevision();
 const [films,setFilms]=useState<any[]>([]);
 const [series,setSeries]=useState<any[]>([]);
 const [filmsLoaded,setFilmsLoaded]=useState(false);
 const [seriesLoaded,setSeriesLoaded]=useState(false);
 useEffect(()=>{
  void refreshPosters();
  const controller=new AbortController();
  const get=async(url:string)=>{
   const response=await fetch(url,{cache:'no-store',signal:controller.signal});
   if(!response.ok)throw Error('Kunde inte läsa registret');
   return response.json();
  };
  get('/api/films').then(d=>{if(!controller.signal.aborted){setFilms(Array.isArray(d?.register?.films)?d.register.films:[]);setFilmsLoaded(Array.isArray(d?.register?.films));}})
   .catch(()=>{if(!controller.signal.aborted)setFilmsLoaded(false);});
  get('/api/series').then(d=>{if(!controller.signal.aborted){setSeries(Array.isArray(d?.register?.series)?d.register.series:[]);setSeriesLoaded(Array.isArray(d?.register?.series));}})
   .catch(()=>{if(!controller.signal.aborted)setSeriesLoaded(false);});
  return ()=>controller.abort();
 },[catalog?.fetchedAt]);
 const plugins=Array.isArray(pluginRepo?.packages)?pluginRepo.packages.filter((p:any)=>!p.archived&&!p.legacy):[];
 const counts={
  files:typeof catalog?.fileCount==='number'?catalog.fileCount:null,
  documents:Array.isArray(catalog?.documents)?databaseCategoryOverview(catalog.documents).count:null,
  stories:catalog?stories.length:null,
  plugins:pluginRepo?plugins.length:null,
  films:filmsLoaded?films.length:null,
  series:seriesLoaded?series.length:null,
  watchlist:filmsLoaded&&seriesLoaded?films.filter(f=>f.status==="Vill se").length+series.filter(s=>seriesIsWatchlisted(s)).length:null
 };
 return <div className="nh-home">
  <DatabaseStats counts={counts} checkedAt={catalog?.fetchedAt} onNavigate={onNavigate} loading={!catalog}/>
  <ModuleGrid counts={counts} onNavigate={onNavigate} onUpload={onUpload}/>
  <RecentActivity posterRevision={posterRevision} films={films} series={series} stories={stories} files={recentFiles} plugins={plugins} commits={commits} onNavigate={onNavigate} onOpenMedia={onOpenMedia} onOpenStory={onOpenStory} onOpenFile={onOpenFile}/>
 </div>;
}
