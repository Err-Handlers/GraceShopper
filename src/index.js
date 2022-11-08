import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client"
import  App  from './components/App';
// css stylesheets can be created for each component
// place them in the src/style directory, and import them like this:
import './style/index.css';
const root = createRoot(document.querySelector("#root"))
root.render(<BrowserRouter><App /></BrowserRouter>);
