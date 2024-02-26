import React from 'react';
import ReactDOM from 'react-dom/client';
// import Modal from 'react-modal';
import './index.css';
import CONFIG_KEYS from './config';
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRouter from './routes';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { ThemeProvider } from '@material-tailwind/react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Modal.setAppElement('#root');

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={CONFIG_KEYS.GOOGLE_AUTH_CLIENT_ID}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider>
                        <RouterProvider router={AppRouter}></RouterProvider>
                        <ToastContainer />
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);
