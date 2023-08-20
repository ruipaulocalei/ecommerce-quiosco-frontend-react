import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([{
    path: '/',
    element: <Layout />,
    children:[
        {
            index: true,
            element: <Home />,
        }
    ]
}, 
{
    path: '/auth',
    element: <AuthLayout />,
    children: [
        {
            path: '/auth/login',
            element: <Login />
        },
        {
            path: '/auth/registro',
            element: <Register />
        },
    ]
},
])

export default router