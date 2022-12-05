import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from 'react-intl';

import Romanian from './lang/ro/ro.json';
import English from './lang/en/en.json';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const locale = navigator.language;
let lang;
if (locale==="ro") {
   lang = Romanian;
} else {
  lang = English;
}

root.render(
  // <IntlProvider locale ={locale} messages={English}>
  <StrictMode>
    <ColorModeScript />
    
      <App />
  </StrictMode>
  // </IntlProvider>

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
