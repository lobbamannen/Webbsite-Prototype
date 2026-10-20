// Härled enbart visningsmetadata från verkliga GitHub-sökvägar och filnamn.
// Läsbar originaltext förblir auktoritativ; gör inte om subjektiva ord till numeriska betyg.
export const STORY_ROOT='Berattelser/';
export function storyFromDocument(doc){
 if(!doc||typeof doc.path!=='string'||!doc.path.startsWith(STORY_ROOT))return null;
 const paths=(doc.formats||[]).map(x=>x.path).concat(doc.path);
 const md=paths.find(p=>typeof p==='string'&&p.endsWith('.md'));
 const docx=paths.find(p=>typeof p==='string'&&p.endsWith('.docx'));
 if(!md&&!docx)return null;
 const path=md||docx;
 const folder=path.slice(STORY_ROOT.length).split('/');
 if(folder.length!==2)return null;
 const category=folder[0];
 const filename=folder[1].replace(/\.(md|docx)$/i,'');
 let title=filename, ratingLabel=null, numericRating=null;
 const match=filename.match(/\s*[-—–]\s*((?:under\s+)?\d+(?:[,.]\d+)?(?:\s*[–-]\s*\d+(?:[,.]\d+)?)?\s+av\s+5)\s*★?\s*$/i);
 if(match){
  title=filename.slice(0,match.index).trim();
  ratingLabel=match[1].replace(/\s+/g,' ').replace(/\s+av\s+5$/i,'/5').trim();
  const exact=match[1].match(/^(\d+(?:[,.]\d+)?)\s+av\s+5$/i);
  if(exact)numericRating=Number(exact[1].replace(',','.'));
 }else{
  const qualitative=filename.match(/\s*[-—–]\s*(Obetygsatt|Riktigt bra|Bra)\s*$/i);
  if(qualitative){title=filename.slice(0,qualitative.index).trim();ratingLabel=qualitative[1];}
 }
 return {path,title,category,ratingLabel:ratingLabel||'Inget registrerat betyg',numericRating,docx:docx||null,markdown:md||null,sha:doc.sha||null,formats:doc.formats||[],rawName:filename};
}
export function storyList(documents){
 const items=[],seen=new Set();
 for(const d of documents||[]){const x=storyFromDocument(d);if(!x||seen.has(x.path))continue;seen.add(x.path);items.push(x);}
 return items;
}
export function storyExcerpt(text,limit=310){
 if(typeof text!=='string')return '';
 // Innehåll kommer från ursprungsdokumentet. Hoppa över metadata och rubriker;
 // extrahera bara befintlig prosa, skapa ingen egen synopsis.
 const paragraphs=text.split(/\n\s*\n/).map(p=>p.replace(/\r/g,'').trim()).filter(p=>
  p.length>95&&!p.startsWith('#')&&!p.startsWith('[')&&!p.startsWith('|')&&
  !/^(?:Betyg|Kategori|Titel|Berättelse|Tid):/i.test(p));
 const first=paragraphs[0]||'';
 const stripped=first.replace(/(\*\*|__)/g,'').replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g,'$1');
 return stripped.length>limit?stripped.slice(0,limit).replace(/\s+\S*$/,'')+'…':stripped;
}
