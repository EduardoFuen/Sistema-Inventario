import { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - applications
const AppPurchaseList = Loadable(lazy(() => import('pages/apps/purchase/purchase-list')));
const AppAddPurchase = Loadable(lazy(() => import('pages/apps/purchase/addPurchase')));
const AppViewPurchase = Loadable(lazy(() => import('pages/apps/purchase/viewPurchase')));

const AppReceptionList = Loadable(lazy(() => import('pages/apps/reception/reception-list')));
const AppReceptionView = Loadable(lazy(() => import('pages/apps/reception/viewReception')));
const AppInventoryList = Loadable(lazy(() => import('pages/apps/inventory/inventory-list')));

const SupplierList = Loadable(lazy(() => import('pages/apps/supplier/supplier-list')));
const AppAddSupplier = Loadable(lazy(() => import('pages/apps/supplier/addSupplier')));
const AppEditSupplier = Loadable(lazy(() => import('pages/apps/supplier/editSupplier')));

const AppProductList = Loadable(lazy(() => import('pages/apps/productMainView/productsMainView')));
const AppAddProduct = Loadable(lazy(() => import('pages/apps/product/addProduct')));
const AppEditProduct = Loadable(lazy(() => import('pages/apps/product/editProduct')));
const AppAddCategory = Loadable(lazy(() => import('pages/apps/categories/addCategory')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/reset-password')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));

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
              path: 'reception',
              element: <AppReceptionList />
            },
            {
              path: 'reception/view/:id',
              element: <AppReceptionView />
            },
            {
              path: 'purchase',
              element: <AppPurchaseList />
            },
            {
              path: 'purchase/add',
              element: <AppAddPurchase />
            },
            {
              path: 'purchase/view/:id',
              element: <AppViewPurchase />
            },
            {
              path: 'inventario',
              element: <AppInventoryList />
            },
            {
              path: '',
              children: [
                {
                  path: 'supplier',
                  element: <SupplierList />
                },
                {
                  path: 'supplier/add',
                  element: <AppAddSupplier />
                },
                {
                  path: 'supplier/edit/:id',
                  element: <AppEditSupplier />
                }
              ]
            },
            {
              path: '',
              children: [
                {
                  path: 'product-list',
                  element: <AppProductList />
                },
                {
                  path: 'product-list/add',
                  element: <AppAddProduct />
                },
                {
                  path: 'product-list/edit/:id',
                  element: <AppEditProduct />
                },
                {
                  path: 'product-list/category/add',
                  element: <AppAddCategory />
                },
                {
                  path: 'product-list/category/edit/:id/:index',
                  element: <AppAddCategory />
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
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
        }
      ]
    },
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
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
        },
        {
          path: 'register',
          element: <AuthRegister />
        }
      ]
    }
  ]
};

export default MainRoutes;
