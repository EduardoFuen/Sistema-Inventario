// assets
import { AppstoreOutlined, ReconciliationOutlined, UnorderedListOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { AppstoreOutlined, ReconciliationOutlined, UnorderedListOutlined, ShoppingCartOutlined, UserOutlined };

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications: NavItemType = {
  id: 'group-applications',
  type: 'group',
  children: [
    {
      id: 'products',
      title: 'Productos',
      type: 'item',
      url: '/p/product-list',
      icon: icons.UnorderedListOutlined
    },
    {
      id: 'proveedores',
      title: 'Proveedores',
      type: 'item',
      url: '/supplier-list',
      icon: icons.AppstoreOutlined
    },
    {
      id: 'Compras',
      title: 'Compras',
      type: 'item',
      url: '/purchase',
      icon: icons.ReconciliationOutlined
    },
    {
      id: 'recepcion',
      title: 'Recepción',
      icon: icons.UserOutlined,
      type: 'item',
      url: '/reception'
    },

    {
      id: 'inventario',
      title: 'Inventario',
      type: 'item',
      url: '/maintenance/coming-soon',
      icon: icons.ShoppingCartOutlined
    }
  ]
};

export default applications;
