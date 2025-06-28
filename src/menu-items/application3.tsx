// assets
import { TeamOutlined, ReconciliationOutlined, DiffOutlined, HddOutlined, ApartmentOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { TeamOutlined, ReconciliationOutlined, DiffOutlined, HddOutlined, ApartmentOutlined };

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications3: NavItemType = {
  id: 'group-applications',
  type: 'group',
  children: [
    {
      id: 'products',
      title: 'Almacen',
      type: 'item',
      url: '/product-list',
      icon: icons.DiffOutlined
    },
         {
          id: 'storeentry',
          title: 'Entrada a Almacen',
          type: 'item',
          mainTitle: 'Almacen',
          hide: true,
               mainUrl: '/store-list',
          url: '/store-list/entry',
          icon: icons.DiffOutlined
        },
         {
                          id: 'storeexit',
                          title: 'Salida de Almacen',
                          type: 'item',
                          mainTitle: 'Almacen',
                          hide: true,
                               mainUrl: '/store-list',
                          url: '/store-list/exit',
                          icon: icons.DiffOutlined
                        },
    {
      id: 'AddProduct',
      type: 'item',
      title: 'Agregar Producto',
      url: '/product-list/add',
      hide: true,
      mainTitle: 'Productos',
      mainUrl: '/product-list'
    },
    {
      id: 'AddCategory',
      type: 'item',
      title: 'Agregar Categorias',
      url: '/product-list/category/add',
      hide: true,
      mainTitle: 'Productos',
      mainUrl: '/product-list'
    },
    {
      id: 'supplier',
      title: 'Registro clientes',
      type: 'item',
            hide: true,
      url: '/supplier',
      icon: icons.TeamOutlined
    },
    {
      id: 'addSupplier',
      title: 'Agregar Cliente',
      type: 'item',
      url: '/supplier/add',
      hide: true,
      mainTitle: 'Cliente',
      mainUrl: '/supplier'
    },
    {
      id: 'compras',
      title: 'Compras',
      type: 'item',
            hide: true,
      url: '/purchase',
      icon: icons.ReconciliationOutlined
    },
    {
      id: 'addPurchase',
      type: 'item',
      title: 'Generar nueva orden de Compras',
      url: '/purchase/add',
      hide: true,
      mainTitle: 'Compras',
      mainUrl: '/purchase'
    },
    {
      id: 'recepcion',
      title: 'Totales',
      icon: icons.ApartmentOutlined,
      type: 'item',
      hide: true,
      url: '/reception'
    },
    {
      id: 'inventario',
      title: 'Inventario',
      type: 'item',
      hide: true,
      url: '/inventario',
      icon: icons.HddOutlined
    },
    {
      id: 'edit',
      type: 'item',
      title: 'Editar Producto',
      url: '/product-list/edit/:id',
      hide: true,
      mainTitle: 'Productos',
      mainUrl: '/product-list'
    },
    {
      id: 'edit',
      type: 'item',
      title: 'Editar Proveedores',
      url: '/supplier/edit/:id',
      hide: true,
      param: true,
      mainTitle: 'Proveedores',
      mainUrl: '/supplier'
    },
    {
      id: 'edit',
      type: 'item',
      title: 'Ver Pedidos',
      url: '/purchase/view/:id',
      hide: true,
      param: true,
      mainTitle: 'Compras',
      mainUrl: '/purchase'
    },
    {
      id: 'edit',
      type: 'item',
      title: 'Editar Categorias',
      url: '/product-list/category/edit/:id/:index',
      hide: true,
      param: true,
      mainTitle: 'Productos',
      mainUrl: '/product-list'
    },
    {
      id: 'edit',
      type: 'item',
      title: 'Recepción de la Orden de Compra ',
      url: '/reception/view/:id',
      hide: true,
      param: true,
      mainTitle: 'Recepción',
      mainUrl: '/reception'
    },
     {
      id: 'edit',
      type: 'item',
      title: 'Precio Dolar',
      url: '/cambios',
      param: true,
      mainTitle: 'Precio Dolar'
    },
     {
      id: 'edit',
      type: 'item',
      title: 'Tasa de Cambio',
      url: 'cambios/edit/:id',
      hide: true,
      param: true,
      mainTitle: 'Cambios',
      mainUrl: '/cambios'
    },
  ]
};

export default applications3;