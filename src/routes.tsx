import { createBrowserRouter } from 'react-router-dom';
import { Student } from './App';

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Student />,
    },
]);
