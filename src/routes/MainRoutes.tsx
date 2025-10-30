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

const AppCollectionList = Loadable(lazy(() => import('pages/apps/collection/collection-list')));
const AppAddCollection = Loadable(lazy(() => import('pages/apps/collection/addcollection')));
const AppViewCollection = Loadable(lazy(() => import('pages/apps/collection/viewCollection')));

const AppStoreList = Loadable(lazy(() => import('pages/apps/almacen/products-list')));
const AppStoreAdd = Loadable(lazy(() => import('pages/apps/almacen/addProduct')));
const AppStoreEdit = Loadable(lazy(() => import('pages/apps/almacen/editProduct')));

const AppStoreExitList = Loadable(lazy(() => import('pages/apps/almacenexit/products-list')));

const AppStoreEntryList = Loadable(lazy(() => import('pages/apps/almacenentry/products-list')));


const AppCambiosList = Loadable(lazy(() => import('pages/apps/cambio/products-list')));
const AppCambiosEdit = Loadable(lazy(() => import('pages/apps/cambio/editProduct')));
const AppEmergencyEdit = Loadable(lazy(() => import('pages/apps/cambio/emergency')));

const AppProviderList = Loadable(lazy(() => import('pages/apps/provider/products-list')));
const AppProviderAdd = Loadable(lazy(() => import('pages/apps/provider/addProduct')));
const AppProviderEdit = Loadable(lazy(() => import('pages/apps/provider/editProduct')));

const AppReceptionList = Loadable(lazy(() => import('pages/apps/reception/reception-list')));
const AppReceptionView = Loadable(lazy(() => import('pages/apps/reception/viewReception')));

const UserList = Loadable(lazy(() => import('pages/auth/listUser')));

const SupplierList = Loadable(lazy(() => import('pages/apps/supplier/supplier-list')));
const AppAddSupplier = Loadable(lazy(() => import('pages/apps/supplier/add')));
const AppEditSupplier = Loadable(lazy(() => import('pages/apps/supplier/edit')));


const DeliveryList = Loadable(lazy(() => import('pages/apps/delivery/delivery-list')));
const AppAddDelivery = Loadable(lazy(() => import('pages/apps/Delivery/add')));


const AppProductList = Loadable(lazy(() => import('pages/MainView/mainProduct')));
const AppAddProduct = Loadable(lazy(() => import('pages/apps/product/addProduct')));
const AppEditProduct = Loadable(lazy(() => import('pages/apps/product/editProduct')));
const AppAddCategory = Loadable(lazy(() => import('pages/apps/categories/addCategory')));

const AppInventoryList = Loadable(lazy(() => import('pages/apps/inventory/inventory-list')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/register')));

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
              path: 'cambios',
              element: <AppCambiosList />
            },
            {
              path: 'cambios/edit/:id',
              element: <AppCambiosEdit />
            },
            {
              path: 'reception/view/:id',
              element: <AppReceptionView />
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
              path: 'store-list',
              element: <AppStoreList />
            },
             {
              path: 'store-list/add',
              element: <AppStoreAdd />
            },
             {
              path: 'store-list/edit/:id',
              element: <AppStoreEdit />
            },
              ]
            },
               {
              path: '',
              children: [
                     {
              path: 'provider-list',
              element: <AppProviderList />
            },
             {
              path: 'provider-list/add',
              element: <AppProviderAdd />
            },
             {
              path: 'provider-list/edit/:id',
              element: <AppProviderEdit />
            },
              ]
            },
                 {
              path: '',
              children: [
                     {
              path: '/store-list/exit',
              element: <AppStoreExitList />
            },
             {
              path: '/store-list/entry',
              element: <AppStoreEntryList />
            }
              ]
            },{
              path: '',
              children: [
                    {
              path: 'collection',
              element: <AppCollectionList />
            },
            {
              path: 'collection/add',
              element: <AppAddCollection />
            },
            {
              path: 'collection/view/:id',
              element: <AppViewCollection />
            },
              ]
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
                },
                {
                  path: 'user',
                  element: <UserList />
                }
              ]
            },
             {
              path: '',
              children: [
                {
                  path: 'delivery',
                  element: <DeliveryList />
                },
                {
                  path: 'delivery/add',
                  element: <AppAddDelivery />
                },
                {
                  path: 'user',
                  element: <UserList />
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
            },
                {
              path: '',
              children: [
                {
                  path: 'emergency',
                  element: <AppEmergencyEdit />
                }
              ]
            }
          ]
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
          path: 'register',
          element: <AuthRegister />
        }
      ]
    },
    {
      path: '/*',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      )
    }
  ]
};

export default MainRoutes;
