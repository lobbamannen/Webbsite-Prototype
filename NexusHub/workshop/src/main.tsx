import React from 'react';
import {createRoot} from 'react-dom/client';
import './mock-api.js';
import '../../original/globals.css';
import Portal from './app/portal';
const el=document.getElementById('root');
if(el)createRoot(el).render(<Portal/>);
