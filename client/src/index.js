import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from 'containers/App.js';

import registerServiceWorker from './registerServiceWorker';

//react-dom render renders the app. We wrap app in browser router for routing.
render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));

//the service worker allows the app to load faster by cacheing assets locally and serving it the next visit.
registerServiceWorker();
