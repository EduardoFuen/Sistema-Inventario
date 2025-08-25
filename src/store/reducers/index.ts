// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project import
import menu from './menu';
import snackbar from './snackbar';
import productReducer from './product';
import storeReducer from './store';
import pack from './pack';
import warehouse from './warehouse';
import maker from './maker';
import trademark from './trademark';
import category from './category';
import supplier from './supplier';
import user from './user';
import typeProduct from './typeProduct';
import activeSubst from './activeSubst';
import purchase from './purcharse';
import inventory from './inventory';
import reception from './reception';

import { REDUCERVERSION } from 'config';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  snackbar,
  inventory: persistReducer(
    {
      key: 'inventory',
      storage,
      keyPrefix: REDUCERVERSION
    },
    inventory
  ),
  purchase: persistReducer(
    {
      key: 'purchase',
      storage,
      keyPrefix: REDUCERVERSION
    },
    purchase
  ),
  reception: persistReducer(
    {
      key: 'reception',
      storage,
      keyPrefix: REDUCERVERSION
    },
    reception
  ),
  substances: persistReducer(
    {
      key: 'substances',
      storage,
      keyPrefix: REDUCERVERSION
    },
    activeSubst
  ),
  supplier: persistReducer(
    {
      key: 'supplier',
      storage,
      keyPrefix: REDUCERVERSION
    },
    supplier
  ),
    user: persistReducer(
    {
      key: 'user',
      storage,
      keyPrefix: REDUCERVERSION
    },
    user
  ),
  typeProduct: persistReducer(
    {
      key: 'typeProduct',
      storage,
      keyPrefix: REDUCERVERSION
    },
    typeProduct
  ),
  category: persistReducer(
    {
      key: 'categories',
      storage,
      keyPrefix: REDUCERVERSION
    },
    category
  ),
  maker: persistReducer(
    {
      key: 'maker',
      storage,
      keyPrefix: REDUCERVERSION
    },
    maker
  ),
  
  trademark: persistReducer(
    {
      key: 'trademark',
      storage,
      keyPrefix: REDUCERVERSION
    },
    trademark
  ),
  pack: persistReducer(
    {
      key: 'pack',
      storage,
      keyPrefix: REDUCERVERSION
    },
    pack
  ),
  warehouse: persistReducer(
    {
      key: 'warehouse',
      storage,
      keyPrefix: REDUCERVERSION
    },
    warehouse
  ),
  product: persistReducer(
    {
      key: 'productReducer',
      storage,
      keyPrefix: REDUCERVERSION
    },
    productReducer
  ),
   store: persistReducer(
    {
      key: 'storeReducer',
      storage,
      keyPrefix: REDUCERVERSION
    },
    storeReducer
  )
});

export default reducers;
