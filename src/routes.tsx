import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Student } from './App';
import ErrorElement from './components/common/error-element';

const LazyListCourse = lazy(() => import('./components/pages/course-pages/list-course'));

const LazyStudentHomePage = lazy(() => import('./components/pages/students/student-home-page'));

const LazyStudentRegister = lazy(() => import('./components/pages/students/student-registration-page'));

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Student />,
        errorElement: <ErrorElement />,
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyStudentHomePage />
                    </Suspense>
                ),
            },
            {
                path: '/',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyListCourse />
                    </Suspense>
                ),
            },
            {
                path: '/register',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyStudentRegister />
                    </Suspense>
                ),
            },
        ],
    },
]);

export default AppRouter;
