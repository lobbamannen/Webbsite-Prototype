'use client';
import React,{useEffect,useState} from 'react';

export function usePosterRevision():[string,()=>Promise<void>]{
 const [revision,setRevision]=useState('');
 const refresh=async()=>{
  try{
   const response=await fetch('/api/posters?index=1&refresh=1',{cache:'no-store'}),body=await response.json();
   if(!response.ok||!/^[a-f0-9]{40}$/.test(body.revision||''))throw Error('Bildindex saknas.');
   setRevision(body.revision);
  }catch{setRevision(String(Date.now()));}
 };
 return [revision,refresh];
}

export default function RepositoryPoster({kind,posterKey,revision,alt,children}:{kind:'films'|'series';posterKey:string;revision:string;alt:string;children:React.ReactNode}){
 const [failed,setFailed]=useState(false);
 const url='data:,';
 useEffect(()=>setFailed(false),[url]);
 return !failed?<img src={url} loading="lazy" alt={alt} onError={()=>setFailed(true)}/>:<>{children}</>;
}
