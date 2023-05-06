import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthenticationProvider } from './providers/AuthenticationProvider';
import { LoadingProvider } from './providers/LoadingProvider';
import { ModalProvider } from './providers/ModalProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ModalProvider>
          <AuthenticationProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthenticationProvider>
        </ModalProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
