/* Gemini Argon finding-level prototype renderers.
 * Loaded by the host app when it integrates NEXUS_IDEA_MODULES.
 * These are local, illustrative prototypes; actions do not persist application data.
 */
(function (w) {
  'use strict';
  var esc = function (v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  };
  var groups = {
    home: ['001','002','003','004','005','006','007','008','009','010','011','012','013','014','015'],
    media: ['016','017','018','019','020','021','022','023','024','025','026','027','028','029','030'],
    reader: ['031','032','033','034','035','036','037','038','039','040','041','042','043','044','045'],
    docs: ['046','047','048','049','050','051','052','053','054','055','056','057','058','059','060','061','062','063','064','065'],
    nav: ['066','067','068','069','070','071','072','073','074','075','076','077','078','079','080'],
    system: ['081','082','083','084','085','086','087','088','089','090','091','092','093','094','095','096'],
    plugins: ['097','098','099','100']
  };
  function button(text, style) {
    return '<span style="display:inline-block;border:1px solid #55417c;background:#292136;color:#f5f0ff;border-radius:999px;padding:10px 14px;min-height:22px;' + (style || '') + '">' + text + '</span>';
  }
  function neutralizeDisplayOnlyButtons(html) {
    var stack=[];
    return html.replace(/<\/?button\b[^>]*>/g,function(tag){
      if(tag.slice(0,2)==='</'){
        var displayOnly=stack.pop();
        return displayOnly?'</span>':tag;
      }
      var actionable=/data-(?:go|action|open-media|open-story|node|file|plugin|filter|chapter|inbox)=/.test(tag);
      stack.push(!actionable);
      if(actionable)return tag;
      return tag.replace(/^<button/,'<span').replace(/\s+type="button"/,'').replace(/\s+aria-(?:pressed|label)="[^"]*"/,'').replace(/cursor:[^;]+;?/g,'cursor:default;');
    });
  }
  function demo(id) {
    var card = 'border:1px solid rgba(255,255,255,.12);background:#171720;color:#f3f1f7;border-radius:14px;padding:14px;';
    var muted = 'color:#a9a5b2;font-size:12px;';
    if (id==='001') return '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">'+['Film & serier','Berättelser','Kunskapsbank','Inkorg','Filer','Aktivitet'].map(function(x,i){return '<button type="button" data-go="'+['films','stories','knowledge','inbox','files','activity'][i]+'" style="'+card+'text-align:left;min-height:54px;cursor:pointer"><span style="color:#b99aff">'+['◉','◈','✳','⌑','▤','↻'][i]+'</span> '+x+'</button>';}).join('')+'</div>';
    if (id==='002'||id==='009') return '<div style="'+card+'display:flex;align-items:center;justify-content:space-between"><b>Fortsätt titta</b><span style="border-radius:20px;background:#30263f;color:#d6c5ff;padding:4px 9px">6 <span style="'+muted+'">Se alla ›</span></span></div>';
    if (id==='003') return '<div style="display:flex;gap:9px;overflow:auto">'+['Severance','Dark','The Bear'].map(function(x,i){return '<article style="min-width:155px;'+card+'"><b>'+x+'</b><p style="'+muted+'">Avsnitt '+(i+2)+' · fortsätt</p><div style="height:4px;background:#393443;border-radius:3px"><span style="display:block;width:'+[42,68,24][i]+'%;height:4px;background:#a78bfa;border-radius:3px"></span></div></article>';}).join('')+'</div>';
    if (id==='004'||id==='037'||id==='081'||id==='084'||id==='085'||id==='090') return '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">'+[['Bakgrund','#0d0d12'],['Kort','#181820'],['Flytande lager','#262333']].map(function(x){return '<div style="background:'+x[1]+';border:1px solid #393544;border-radius:12px;padding:16px;color:#eee">'+x[0]+'<div style="'+muted+'">'+x[1]+'</div></div>';}).join('')+'</div>';
    if (id==='005'||id==='066'||id==='069'||id==='070'||id==='071'||id==='074') return '<nav aria-label="Prototypnavigation" style="display:flex;gap:7px;overflow:auto">'+['Hem','Film','Kunskap','Arkiv'].map(function(x,i){return '<button type="button" data-go="'+['home','films','knowledge','files'][i]+'" style="background:'+(i===1?'#30263f':'transparent')+';border:0;border-bottom:'+(i===1?'2px solid #b99aff':'2px solid transparent')+';color:'+(i===1?'#eee':'#aaa')+';padding:12px;cursor:pointer">'+x+'</button>';}).join('')+'</nav>';
    if (id==='006'||id==='049'||id==='062'||id==='075') return '<label style="display:flex;gap:8px;align-items:center;background:#121219;border:1px solid #504763;border-radius:12px;padding:9px 12px;color:#aaa">⌕ <input aria-label="Sök i Nexus Hub" placeholder="Sök i Nexus Hub…" style="min-width:0;flex:1;background:transparent;border:0;color:white;outline:none"><span aria-hidden="true" style="color:#c9b6ff">⌕</span></label>';
    if (id==='007'||id==='012'||id==='065'||id==='089') return '<div style="'+card+'display:flex;gap:12px;align-items:center"><span style="width:10px;height:10px;background:#75d6a2;border-radius:50%;box-shadow:0 0 12px #75d6a2"></span><div><b>Demoläge aktivt</b><div style="'+muted+'">Lokal data · synkronisering ej ansluten</div></div><span style="margin-left:auto;color:#a78bfa">Uppdaterad nu</span></div>';
    if (id==='008') return '<div style="'+card+'"><div style="'+muted+'">SLUMPMÄSSIG UPPTÄCKT</div><h3 style="margin:7px 0">Återupptäck Djatlovpasset</h3><p style="'+muted+'">Ett osett eller äldre objekt väljs ur biblioteket.</p><div style="display:flex;gap:8px">'+button('Visa annan')+button('Öppna dossier')+'</div></div>';
    if (id==='013') return '<div style="'+card+'"><div style="'+muted+'">TISDAG · NEXUS HUB</div><h3 style="margin:7px 0">God kväll</h3><p style="'+muted+'">Välkommen tillbaka. Fortsätt där du slutade.</p></div>';
    if (id==='078') return '<div style="'+card+'text-align:center"><div style="font-size:24px">✦</div><b>Inga sparade objekt ännu</b><p style="'+muted+'">Utforska biblioteket och spara något att återvända till.</p>'+button('Utforska biblioteket')+'</div>';
    if (id==='065') return '<label style="'+card+'display:flex;align-items:center;justify-content:space-between"><span><b>Tillgänglig offline</b><small style="display:block;'+muted+'">Senast cachad: nyss · lokal demo</small></span><input type="checkbox" checked aria-label="Behåll offline"></label>';
    if (id==='077') return '<div style="display:grid;gap:8px">'+[1,2,3].map(function(){return '<div aria-label="Laddar innehåll" style="height:18px;border-radius:8px;background:linear-gradient(90deg,#20202a,#35303d,#20202a)"></div>';}).join('')+'</div>';
    if (id==='080') return '<div style="'+card+'"><b>Uppdatera biblioteket</b><p style="'+muted+'">Dra nedåt från listans överkant på en pekskärm.</p><progress value="65" max="100" style="width:100%"></progress>'+button('Uppdatera nu')+'</div>';
    if (id==='095') return '<div style="'+card+'"><div style="font-size:25px">Filmbibliotek</div><div style="margin-top:12px;padding:8px;background:#24222c;border-radius:9px">⌕ Sök · Filter · Sortera</div><p style="'+muted+'">Exempel på stor rubrik som krymper till kompakt fast rubrik vid scroll.</p></div>';
    if (id==='096') return '<div style="display:grid;gap:8px">'+['Utseende','Läsning','Notiser'].map(function(x){return '<details style="'+card+'"><summary style="cursor:pointer">'+x+' <span style="float:right;color:#aaa">›</span></summary><label style="display:block;padding-top:10px">Aktivera '+x+' <input type="checkbox" checked></label></details>';}).join('')+'</div>';
    if (id==='010'||id==='034'||id==='060'||id==='061'||id==='064') return '<details style="'+card+'"><summary style="cursor:pointer;font-weight:700;padding:5px">▸ Innehåll och sektioner</summary><ul style="'+muted+'line-height:2"><li>Översikt</li><li>Senaste aktivitet</li><li>Relaterade objekt</li></ul></details>';
    if (id==='011'||id==='028') return '<ol style="border-left:1px solid #55417c;padding-left:18px;color:#eee;line-height:2"><li>Ny dossier sparad <small style="'+muted+'">Idag · 09:42</small></li><li>Film markerad som sedd <small style="'+muted+'">Igår</small></li><li>Anteckning uppdaterad <small style="'+muted+'">Måndag</small></li></ol>';
    if (id==='014') return '<details style="position:relative"><summary style="list-style:none;display:inline-block;'+card+'cursor:pointer;color:#cbb8ff">＋ Skapa nytt</summary><div style="display:grid;gap:7px;margin-top:8px">'+button('Lägg till anteckning')+button('Lägg till film')+button('Ladda upp fil')+'</div></details>';
    if (id==='015') return '<div style="'+card+'"><b>Lagring använd</b><div style="display:flex;height:10px;border-radius:8px;overflow:hidden;margin:12px 0"><i style="width:55%;background:#9b7cf3"></i><i style="width:30%;background:#5593d7"></i><i style="width:15%;background:#666"></i></div><span style="'+muted+'">Media 55% · Dokument 30% · Övrigt 15%</span></div>';
    if (id==='016'||id==='042'||id==='059') return '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px">'+['▰','▰','▰'].map(function(_,i){return '<div style="aspect-ratio:2/3;'+card+'display:grid;place-items:center;color:#b99aff;font-size:24px;background:linear-gradient(150deg,#39334b,#171720)">'+['◉','◈','▤'][i]+'</div>';}).join('')+'</div>';
    if (id==='017'||id==='020'||id==='024'||id==='029'||id==='030'||id==='035'||id==='047'||id==='057') return '<div style="display:flex;gap:8px;flex-wrap:wrap">'+['Sett ✓','Sci-fi','Mystik','Sparad ♡'].map(function(x,i){return '<button type="button" '+(i<3?'data-filter="'+['Sett','Sci-fi','Mystik'][i]+'"':'')+' style="border:1px solid #514667;border-radius:999px;background:#282333;color:#d7c9f1;padding:7px 10px;cursor:pointer">'+x+'</button>';}).join('')+'</div>';
    if (id==='018') return '<div style="'+card+'background:linear-gradient(180deg,rgba(107,76,153,.7),#171720 88%);min-height:90px;display:flex;align-items:end"><b>Severance</b></div>';
    if (id==='019'||id==='026'||id==='046') return '<div style="'+card+'"><b>Severance</b><p style="'+muted+'">2024 <span> · </span> Sci-fi <span> · </span> 2 säsonger <span> · </span> ★ 8.7</p></div>';
    if (id==='021'||id==='027'||id==='048') return '<div role="group" aria-label="Välj kategori" style="display:flex;gap:6px;overflow:auto">'+['Alla','Säsong 1','Säsong 2','Special'].map(function(x,i){return '<button type="button" aria-pressed="'+(!i)+'" style="border:1px solid #55417c;border-radius:999px;padding:9px 12px;background:'+(i===0?'#7956b5':'transparent')+';color:white">'+x+'</button>';}).join('')+'</div>';
    if (id==='022'||id==='038'||id==='063') return '<div style="display:grid;gap:8px">'+['Avsnitt 1 · Pilot','Avsnitt 2 · Halcyon','Avsnitt 3 · In perpetuity'].map(function(x){return '<label style="'+card+'display:flex;gap:10px;align-items:center"><input type="checkbox"> '+x+'</label>';}).join('')+'</div>';
    if (id==='023') return '<fieldset style="'+card+'"><legend>Betygsätt</legend><div role="radiogroup" aria-label="Betyg" style="display:flex;gap:8px">'+[1,2,3,4,5].map(function(x){return '<label style="font-size:23px;color:#d4b65b"><input type="radio" name="rating-'+id+'" value="'+x+'">★</label>';}).join('')+'</div>'+button('Spara betyg')+'</fieldset>';
    if (id==='025'||id==='058') return '<details style="'+card+'"><summary style="cursor:pointer">Sortera & filtrera</summary><div style="display:flex;gap:6px;margin-top:10px">'+button('Senast tillagt')+button('Osedda')+button('A–Ö')+'</div></details>';
    if (id==='031'||id==='039'||id==='043'||id==='052'||id==='055'||id==='056') return '<article style="'+card+'"><div style="'+muted+'">DOSSIER · 8 MIN LÄSNING</div><h3 style="font-family:Georgia,serif">Spår i snön</h3><p style="line-height:1.8">En kompakt ingress hjälper läsaren att förstå vad som väntar. <details><summary style="cursor:pointer;color:#cbb8ff">Visa källa / utdrag</summary><p style="'+muted+'">Källnotis visas här utan att lämna artikeln.</p></details></p></article>';
    if (id==='032'||id==='036'||id==='040'||id==='041') return '<div style="'+card+'"><div style="display:flex;justify-content:space-between"><b>Läsinställningar</b><span style="'+muted+'">12 min kvar</span></div><input type="range" min="14" max="24" value="18" aria-label="Textstorlek" style="width:100%"><progress value="38" max="100" style="width:100%"></progress><p style="'+muted+'">Läsprogression · 38%</p></div>';
    if (id==='044'||id==='050'||id==='051') return '<details style="'+card+'"><summary style="cursor:pointer">☷ Inspektör / bokmärken</summary><p style="'+muted+'">Titel · källa · senast ändrad</p>'+button('Spara bokmärke')+'</details>';
    if (id==='045') return '<div style="display:flex;gap:8px">'+['Bild 1','Bild 2','Bild 3'].map(function(x){return '<button type="button" style="'+card+'min-width:80px;min-height:70px;cursor:zoom-in" aria-label="Öppna '+x+' i förstoring">▧<br>'+x+'</button>';}).join('')+'</div>';
    if (id==='053') return '<div style="'+card+'"><label>Sök i sidan <input placeholder="sökord" style="background:#111;color:white;border:1px solid #514667;padding:8px"></label><p>Resultat: <mark style="background:#7c5bbe;color:white">sökord</mark> markeras i texten.</p></div>';
    if (id==='054'||id==='099') return '<label style="display:block;text-align:center;border:1px dashed #9675d8;border-radius:14px;padding:20px;color:#eee">⇧ Välj en fil från enheten<input type="file" style="display:block;margin:12px auto"><small style="display:block;color:#a9a5b2">Endast filväljaren demonstreras; inget laddas upp.</small></label>';
    if (id==='065'||id==='077'||id==='080') return '<div style="'+card+'"><b>Uppdatera bibliotek</b><p style="'+muted+'">Visa tydligt när innehåll hämtas eller finns tillgängligt offline.</p><progress value="65" max="100" style="width:100%"></progress>'+button('Uppdatera nu')+'</div>';
    if (id==='067'||id==='050') return '<details style="'+card+'"><summary style="cursor:pointer">Öppna detaljark</summary><div style="padding:12px 0"><b>Objektdetaljer</b><p style="'+muted+'">Metadata och åtgärder ligger nära tummen.</p>'+button('Klart')+'</div></details>';
    if (id==='068'||id==='087') return '<div style="'+card+'"><span style="color:#83d7a2">✓</span> Inställningen sparades <button type="button" aria-label="Stäng notis" style="float:right;background:transparent;color:white;border:0">×</button></div>';
    if (id==='072'||id==='092'||id==='094') return '<div style="'+card+'display:flex;gap:10px;align-items:center"><button type="button" style="min-width:48px;min-height:48px;border:2px solid #a78bfa;background:#272033;color:white;border-radius:12px">✓</button><span>Stor tryckyta · tydlig fokusram</span></div>';
    if (id==='073'||id==='079') return '<div style="'+card+'"><span style="'+muted+'">Du är kvar på samma plats i listan.</span><div style="text-align:right;margin-top:12px">'+button('↑ Till toppen')+'</div></div>';
    if (id==='074'||id==='076') return '<details style="'+card+'"><summary style="cursor:pointer">⋯ Fler alternativ</summary><div style="display:flex;gap:8px;margin-top:8px">'+button('Spara')+button('Arkivera')+button('Tillbaka')+'</div></details>';
    if (id==='075') return '<input type="search" placeholder="Sök…" aria-label="Sök, rensa med Escape" style="width:100%;box-sizing:border-box;padding:12px;border-radius:12px;border:1px solid #55417c;background:#121219;color:white">';
    if (id==='077') return '<div style="display:grid;gap:8px">'+[1,2,3].map(function(){return '<div aria-label="Laddar…" style="height:18px;border-radius:8px;background:linear-gradient(90deg,#20202a,#35303d,#20202a)"></div>';}).join('')+'</div>';
    if (id==='078') return '<div style="'+card+'text-align:center"><div style="font-size:24px">✦</div><b>Inget sparat ännu</b><p style="'+muted+'">Utforska biblioteket och spara något att återvända till.</p>'+button('Utforska')+'</div>';
    if (id==='082'||id==='083'||id==='086'||id==='088'||id==='093'||id==='095'||id==='096') return '<div style="display:flex;gap:8px;flex-wrap:wrap">'+[['Primär','#f9fafb'],['Sekundär','#9ca3af'],['Accent','#a78bfa']].map(function(x){return '<div style="border:1px solid #514667;border-radius:12px;padding:12px;color:'+x[1]+'">'+x[0]+'<small style="display:block;color:#777">Token · '+x[1]+'</small></div>';}).join('')+'</div>';
    if (id==='091') return '<label style="'+card+'display:flex;justify-content:space-between;align-items:center">Hög kontrast <input type="checkbox" aria-label="Slå på hög kontrast"></label>';
    if (id==='097') return '<div style="'+card+'display:flex;align-items:center;gap:10px"><span>✦</span><div style="flex:1"><b>Plugin exempel</b><div style="'+muted+'">Version 1.2 · demo</div></div><label><input type="checkbox" checked aria-label="Aktivera plugin"></label></div>';
    if (id==='098') return '<pre style="'+card+'font:12px/1.8 monospace;white-space:pre-wrap"><span style="color:#82b9ff">INFO</span> Local demo ready\n<span style="color:#8dd8a6">OK</span> Preferences saved\n<span style="color:#e5c06f">WARN</span> Sync is not connected</pre>';
    if (id==='100') return '<details style="border:1px solid rgba(248,113,113,.5);background:#211719;color:#fee2e2;border-radius:14px;padding:14px"><summary style="cursor:pointer">Danger zone · Visa åtgärder</summary><p style="font-size:12px">Återställning påverkar endast prototypens lokala demo.</p><label>Skriv RESET för att aktivera <input aria-label="Bekräfta RESET" placeholder="RESET"></label><br><button type="button" style="margin-top:10px;border:1px solid #dc6262;background:#542727;color:white;padding:9px;border-radius:9px">Återställ demo</button></details>';
    return '<div style="'+card+'">Exempelkontroll för denna idé.</div>';
  }
  var principles = { '004':1,'036':1,'037':1,'072':1,'081':1,'082':1,'083':1,'084':1,'085':1,'086':1,'088':1,'090':1,'092':1,'093':1,'094':1 };
  var registry = w.NEXUS_IDEA_MODULES = w.NEXUS_IDEA_MODULES || {};
  Object.keys(groups).forEach(function (family) {
    groups[family].forEach(function (num) {
      var id='UX-'+num, key='Gemini Argon::'+id;
      registry[key] = {
        model:'Gemini Argon', id:id, family:family, kind:principles[num]?'design-principle':'interaction-prototype',
        render:function (idea, ctx) {
          var example=demo(num);
          return principles[num] ? '<div><p style="margin:0 0 8px;color:#bca9dd;font-size:11px">DESIGNSYSTEMREGEL · visuell provyta, inte en separat komponent</p>'+example+'</div>' : example;
        }
      };
    });
  });
})(window);
