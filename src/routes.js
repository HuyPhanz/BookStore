import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import AuthPage from './pages/Auth/AuthPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import BookDetail from './pages/BookDetail';
import Home from "./pages/Home/Home";
import Product from "./pages/Products/Product";
import MaterialSource from "./pages/MaterialSource/MaterialSource";
import Store from "./pages/Store/Store";
import Feature from "./pages/Feature/Feature";


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/auth/:type',
      element: <AuthPage />,
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        {
          path: 'home',
          element: <Home/>
        },
        {
          path: 'product',
          element: <Product/>
        },
        {
          path: 'material-source',
          element: <MaterialSource/>
        },
        {
          path: 'store',
          element: <Store/>
        },
        {
          path: 'feature',
          element: <Feature/>
        },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        // { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
