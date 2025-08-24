import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import LessonsPage from './pages/LessonsPage.jsx';
import LessonDetailPage from './pages/LessonDetailPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <LessonsPage /> },
            { path: '/lessons/:lesson_id', element: <LessonDetailPage /> },
            { path: '/profile', element: <ProfilePage /> },
        ],
    },
]);

export default router;
