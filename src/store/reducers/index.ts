// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import chat from './chat';
import calendar from './calendar';
import menu from './menu';
import snackbar from './snackbar';
import productReducer from './product';
import cartReducer from './cart';
import pack from './pack';
import warehouse from './warehouse';
import maker from './maker';
import trademaker from './trademaker';
import category from './category';
import supplier from './supplier';
import typeProduct from './typeProduct';
import activeSubst from './activeSubst';
import purchase from './purcharse';
import inventory from './inventory';
import reception from './reception';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  chat,
  calendar,
  menu,
  snackbar,
  reception: persistReducer(
    {
      key: 'reception',
      storage,
      keyPrefix: 'farmu-'
    },
    reception
  ),
  inventory: persistReducer(
    {
      key: 'inventory',
      storage,
      keyPrefix: 'farmu-'
    },
    inventory
  ),
  purchase: persistReducer(
    {
      key: 'purchase',
      storage,
      keyPrefix: 'farmu-'
    },
    purchase
  ),
  substances: persistReducer(
    {
      key: 'substances',
      storage,
      keyPrefix: 'farmu-'
    },
    activeSubst
  ),
  supplier: persistReducer(
    {
      key: 'supplier',
      storage,
      keyPrefix: 'farmu-'
    },
    supplier
  ),
  typeProduct: persistReducer(
    {
      key: 'typeProduct',
      storage,
      keyPrefix: 'farmu-'
    },
    typeProduct
  ),
  category: persistReducer(
    {
      key: 'category',
      storage,
      keyPrefix: 'farmu-'
    },
    category
  ),
  maker: persistReducer(
    {
      key: 'maker',
      storage,
      keyPrefix: 'farmu-'
    },
    maker
  ),
  trademaker: persistReducer(
    {
      key: 'trademaker',
      storage,
      keyPrefix: 'farmu-'
    },
    trademaker
  ),
  pack: persistReducer(
    {
      key: 'pack',
      storage,
      keyPrefix: 'farmu-'
    },
    pack
  ),
  warehouse: persistReducer(
    {
      key: 'warehouse',
      storage,
      keyPrefix: 'farmu-'
    },
    warehouse
  ),
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'farmu-'
    },
    cartReducer
  ),
  product: persistReducer(
    {
      key: 'productReducer',
      storage,
      keyPrefix: 'farmu-'
    },
    productReducer
  )
});

export default reducers;
