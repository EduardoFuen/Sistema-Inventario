// assets
import { TeamOutlined, ReconciliationOutlined, DiffOutlined, HddOutlined, ApartmentOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { TeamOutlined, ReconciliationOutlined, DiffOutlined, HddOutlined, ApartmentOutlined };

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications: NavItemType = {
  id: 'group-applications',
  type: 'group',
  children: [
    {
      id: 'products',
      title: 'Productos',
      type: 'item',
      url: '/product-list',
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
      title: 'Clientes',
      type: 'item',
      url: '/supplier',
      icon: icons.TeamOutlined
    },
    {
      id: 'addSupplier',
      title: 'Agregar Proveedores',
      type: 'item',
      url: '/supplier/add',
      hide: true,
      mainTitle: 'Proveedores',
      mainUrl: '/supplier'
    },
    {
      id: 'compras',
      title: 'Compras',
      type: 'item',
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
      title: 'Recepción',
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
    }
  ]
};

export default applications;
