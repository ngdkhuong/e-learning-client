import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Student } from './App';
import ErrorElement from './components/common/error-element';

const LazyListCourse = lazy(() => import('./components/pages/coure-pages/list-course'));

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Student />,
        errorElement: <ErrorElement />,
    },
]);
