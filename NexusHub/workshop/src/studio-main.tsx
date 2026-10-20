import React from 'react';
import {createRoot} from 'react-dom/client';
import './mock-api.js';
import '../../original/globals.css';
import Studio from './studio/Studio';
import MobilePreview from './studio/MobilePreview';
createRoot(document.getElementById('root')!).render(new URLSearchParams(location.search).get('preview')==='mobile'?<MobilePreview/>:<Studio/>);
