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
      keyPrefix: 'MidasV1-'
    },
    inventory
  ),
  purchase: persistReducer(
    {
      key: 'purchase',
      storage,
      keyPrefix: 'MidasV1-'
    },
    purchase
  ),
  reception: persistReducer(
    {
      key: 'reception',
      storage,
      keyPrefix: 'MidasV1-'
    },
    reception
  ),
  substances: persistReducer(
    {
      key: 'substances',
      storage,
      keyPrefix: 'MidasV1-'
    },
    activeSubst
  ),
  supplier: persistReducer(
    {
      key: 'supplier',
      storage,
      keyPrefix: 'MidasV1-'
    },
    supplier
  ),
  typeProduct: persistReducer(
    {
      key: 'typeProduct',
      storage,
      keyPrefix: 'MidasV1-'
    },
    typeProduct
  ),
  category: persistReducer(
    {
      key: 'categories',
      storage,
      keyPrefix: 'MidasV1-'
    },
    category
  ),
  maker: persistReducer(
    {
      key: 'maker',
      storage,
      keyPrefix: 'MidasV1-'
    },
    maker
  ),
  trademaker: persistReducer(
    {
      key: 'trademaker',
      storage,
      keyPrefix: 'MidasV1-'
    },
    trademaker
  ),
  pack: persistReducer(
    {
      key: 'pack',
      storage,
      keyPrefix: 'MidasV1-'
    },
    pack
  ),
  warehouse: persistReducer(
    {
      key: 'warehouse',
      storage,
      keyPrefix: 'MidasV1-'
    },
    warehouse
  ),
  product: persistReducer(
    {
      key: 'productReducer',
      storage,
      keyPrefix: 'MidasV1-'
    },
    productReducer
  )
});

export default reducers;
