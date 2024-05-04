import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './store.js';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <main className="nunito-sans text-[13px]" style={{ fontFamily: '12px' }}>
        <Toaster />
        <App />
      </main>
    </React.StrictMode>
  </Provider>
);
