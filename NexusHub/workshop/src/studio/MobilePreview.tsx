import React from 'react';
// A real 390px browsing context: original media queries and the editor both run at mobile width.
export default function MobilePreview(){
 const src=location.pathname+location.hash;
 return <div className="ds-device-shell"><header><span>Nexus Hub · Mobilförhandsvisning · 390 px</span><a href={src}>Till full bredd</a></header><iframe title="Nexus Hub i mobilbredd" src={src}/></div>;
}
