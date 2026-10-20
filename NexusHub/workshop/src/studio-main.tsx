import React from 'react';
import {createRoot} from 'react-dom/client';
import './mock-api.js';
import '../../original/globals.css';
import Studio from './studio/Studio';
createRoot(document.getElementById('root')!).render(<Studio/>);
