import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from "react-router-dom";
import { App } from 'components/App';
import { ModalsProvider } from '@mantine/modals';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <MantineProvider theme={{ colorScheme: 'light' }}>
        <ModalsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalsProvider>
      </MantineProvider >
    </RecoilRoot>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
