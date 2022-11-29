// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import menu from './menu';
import snackbar from './snackbar';
import productReducer from './product';
import pack from './pack';
import warehouse from './warehouse';
import maker from './maker';
import trademaker from './trademark';
import category from './category';
import supplier from './supplier';
import typeProduct from './typeProduct';
import activeSubst from './activeSubst';
import purchase from './purcharse';
import inventory from './inventory';
import reception from './reception';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
  inventory: persistReducer(
    {
      key: 'inventory',
      storage,
      keyPrefix: 'Midas-'
    },
    inventory
  ),
  purchase: persistReducer(
    {
      key: 'purchase',
      storage,
      keyPrefix: 'Midas-'
    },
    purchase
  ),
  reception: persistReducer(
    {
      key: 'reception',
      storage,
      keyPrefix: 'Midas-'
    },
    reception
  ),
  substances: persistReducer(
    {
      key: 'substances',
      storage,
      keyPrefix: 'Midas-'
    },
    activeSubst
  ),
  supplier: persistReducer(
    {
      key: 'supplier',
      storage,
      keyPrefix: 'Midas-'
    },
    supplier
  ),
  typeProduct: persistReducer(
    {
      key: 'typeProduct',
      storage,
      keyPrefix: 'Midas-'
    },
    typeProduct
  ),
  category: persistReducer(
    {
      key: 'categories',
      storage,
      keyPrefix: 'Midas-'
    },
    category
  ),
  maker: persistReducer(
    {
      key: 'maker',
      storage,
      keyPrefix: 'Midas-'
    },
    maker
  ),
  trademaker: persistReducer(
    {
      key: 'trademaker',
      storage,
      keyPrefix: 'Midas-'
    },
    trademaker
  ),
  pack: persistReducer(
    {
      key: 'pack',
      storage,
      keyPrefix: 'Midas-'
    },
    pack
  ),
  warehouse: persistReducer(
    {
      key: 'warehouse',
      storage,
      keyPrefix: 'Midas-'
    },
    warehouse
  ),
  product: persistReducer(
    {
      key: 'productReducer',
      storage,
      keyPrefix: 'Midas-'
    },
    productReducer
  )
});

export default reducers;
