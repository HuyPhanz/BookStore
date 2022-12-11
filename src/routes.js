import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/adminPage/UserPage';
import AuthPage from './pages/Auth/AuthPage';
import Page404 from './pages/Page404';
import Home from "./pages/Home/Home";
import Product from "./pages/Products/Product";
import MaterialSource from "./pages/MaterialSource/MaterialSource";
import Store from "./pages/Store/Store";
import Feature from "./pages/Feature/Feature";
import StorePage from "./pages/adminPage/StorePage";
import ProductTypePage from "./pages/adminPage/ProductTypePage";
import ProductPage from "./pages/adminPage/ProductPage";


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
      path: '/admin',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/admin/user" />, index: true },
        {
          path: 'user',
          element: <UserPage/>
        },
        {
          path: 'store',
          element: <StorePage/>
        },
        {
          path: 'product-type',
          element: <ProductTypePage/>
        },
        {
          path: 'products',
          element: <ProductPage/>
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
