import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './layouts/AdminLayout';
import Orders from './pages/Orders';
import Products from './pages/Products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/registro',
        element: <Register />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
        {
            index: true,
            element: <Orders />
        },
        {
            path: '/admin/products',
            element: <Products />
        }
    ]
  },
]);

export default router;
