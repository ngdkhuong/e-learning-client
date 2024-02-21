import ReactDOM from 'react-dom/client';
// import Modal from 'react-modal';
import CONFIG_KEYS from './config';
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Modal.setAppElement('#root');

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={CONFIG_KEYS.GOOGLE_AUTH_CLIENT_ID}>
            <RouterProvider router={AppRouter}></RouterProvider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);
