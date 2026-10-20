/**
 * Navigation taxonomy only. Original GitHub genres remain untouched.
 * Each known source term belongs to one primary browse group; a title may match
 * several groups when its source registry has several genres.
 */
export const GENRE_GROUPS=[
 {id:'dokumentar',label:'Dokumentär & fakta',genres:['Dokumentär','Historia','Samhälle','Biografi']},
 {id:'kriminal',label:'Kriminal & mysterier',genres:['Kriminal','Brott','True crime','Mysterium','Mystery','Mysterie','Thriller']},
 {id:'reality',label:'Reality & underhållning',genres:['Reality','Reality TV','Underhållning']},
 {id:'skrack',label:'Skräck & paranormalt',genres:['Skräck','Horror','Paranormalt']},
 {id:'scifi',label:'Science fiction & dystopi',genres:['Science fiction','Postapokalyptiskt','Dystopi']},
 {id:'action',label:'Action & äventyr',genres:['Action','Äventyr','Action och äventyr']},
 {id:'fantasy',label:'Fantasy',genres:['Fantasy']},
 {id:'drama',label:'Drama & romantik',genres:['Drama','Romantik','Vänskap']},
 {id:'komedi',label:'Komedi & familj',genres:['Komedi','Familj','Animation','Musikal']},
 {id:'natur',label:'Natur & resor',genres:['Natur','Djur','Resor']},
 {id:'livsstil',label:'Sport & livsstil',genres:['Sport','Hälsa','Arbete','Mat och bakning']},
 {id:'ovrigt',label:'Övriga genrer & format',genres:['Kortfilm']}
];
const byGenre=new Map();
for(const group of GENRE_GROUPS){
 for(const genre of group.genres){
  if(byGenre.has(genre))throw new Error('Genre har flera huvudgrupper: '+genre);
  byGenre.set(genre,group.id);
 }
}
export const categoryForGenre=genre=>byGenre.get(genre)||'ovrigt';
export const matchesGenreGroup=(entry,id)=>Array.isArray(entry?.genres)&&entry.genres.some(g=>typeof g==='string'&&g.trim()&&categoryForGenre(g.trim())===id);
/**
 * Counts count unique registry entries in each group (not source genre tags).
 * Child counts are per exact original source name and may overlap.
 * Unknown future source labels are exposed under Övriga rather than discarded.
 */
export function groupedGenreOptions(entries=[]){
 const source=Array.isArray(entries)?entries:[];
 const groups=new Map();
 for(const group of GENRE_GROUPS)groups.set(group.id,{id:'genregroup:'+group.id,label:group.label,count:0,children:new Map()});
 for(const entry of source){
  const names=new Set((Array.isArray(entry?.genres)?entry.genres:[]).filter(g=>typeof g==='string'&&g.trim()).map(g=>g.trim()));
  const uniqueGroupIds=new Set();
  for(const name of names){
   const groupId=categoryForGenre(name);
   uniqueGroupIds.add(groupId);
   const children=groups.get(groupId).children;
   children.set(name,(children.get(name)||0)+1);
  }
  for(const id of uniqueGroupIds)groups.get(id).count++;
 }
 return [...groups.values()].filter(group=>group.count>0).map(group=>({
  id:group.id,label:group.label,count:group.count,
  children:[...group.children].map(([name,count])=>({id:'genre:'+name,label:name,count})).sort((a,b)=>b.count-a.count||a.label.localeCompare(b.label,'sv'))
 })).sort((a,b)=>b.count-a.count||a.label.localeCompare(b.label,'sv'));
}
