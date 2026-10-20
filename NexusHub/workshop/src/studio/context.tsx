import React,{createContext,useContext} from 'react';
export const DesignContext=createContext<Record<string,any>>({});
export const useDesign=()=>useContext(DesignContext);
