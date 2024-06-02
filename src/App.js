import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';

// This is components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// This is pages
import Main from './pages/Main/Main';
import SNSPage from './pages/SNS/SNS';
import Shop from './pages/Shop/Shop';

function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Main /> },
            { path: '/SNS', element: <SNSPage /> },
            { path: '/shop', element: <Shop /> },
        ],
    },
];

const router = createBrowserRouter(routes);

export default function App({ products }) {
    return (
        <RouterProvider router={router} />
    );
}