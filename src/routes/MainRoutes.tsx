import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import CommonLayout from 'layout/CommonLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - applications
const AppPurchaseList = Loadable(lazy(() => import('pages/apps/purchase/purchase-list')));
const AppReceptionList = Loadable(lazy(() => import('pages/apps/reception/reception-list')));
const SupplierList = Loadable(lazy(() => import('pages/apps/supplier/supplier-list')));

const AppProductDetails = Loadable(lazy(() => import('pages/apps/product/product-details')));
const AppProductList = Loadable(lazy(() => import('pages/apps/product/products')));
const AppAddProduct = Loadable(lazy(() => import('pages/apps/product/add-product')));
const AppAddCategory = Loadable(lazy(() => import('pages/apps/categories/add-category')));
const AppAddPurchase = Loadable(lazy(() => import('pages/apps/purchase/add-purchase')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: '',
          children: [
            {
              path: 'reception',
              element: <AppReceptionList />
            },
            {
              path: 'purchase',
              element: <AppPurchaseList />
            },
            {
              path: '',
              children: [
                {
                  path: 'supplier',
                  element: <SupplierList />
                }
              ]
            },
            {
              path: 'p',
              children: [
                {
                  path: 'product-details/:id',
                  element: <AppProductDetails />
                },
                {
                  path: 'product-list',
                  element: <AppProductList />
                },
                {
                  path: 'add-new-product',
                  element: <AppAddProduct />
                },
                {
                  path: 'add-category',
                  element: <AppAddCategory />
                },
                {
                  path: 'add-new-purchase',
                  element: <AppAddPurchase />
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <CommonLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        }
      ]
    },
    {
      path: '/auth',
      element: <CommonLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        }
      ]
    }
  ]
};

export default MainRoutes;
