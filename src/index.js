import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client"
import  App  from './components/App';

import './style/index.css';
const root = createRoot(document.querySelector("#root"))
root.render(<BrowserRouter><App /></BrowserRouter>);
