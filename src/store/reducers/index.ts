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

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  chat,
  calendar,
  menu,
  snackbar,
  supplier: persistReducer(
    {
      key: 'supplier',
      storage,
      keyPrefix: 'mantis-ts-'
    },
    supplier
  ),
  category: persistReducer(
    {
      key: 'category',
      storage,
      keyPrefix: 'mantis-ts-'
    },
    category
  ),
  maker: persistReducer(
    {
      key: 'maker',
      storage,
      keyPrefix: 'mantis-ts-'
    },
    maker
  ),
  trademaker: persistReducer(
    {
      key: 'trademaker',
      storage,
      keyPrefix: 'mantis-ts-'
    },
    trademaker
  ),
  pack: persistReducer(
    {
      key: 'pack',
      storage,
      keyPrefix: 'mantis-ts-'
    },
    pack
  ),
  warehouse: persistReducer(
    {
      key: 'warehouse',
      storage,
      keyPrefix: 'mantis-ts-'
    },
    warehouse
  ),
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'mantis-ts-'
    },
    cartReducer
  ),
  product: productReducer
});

export default reducers;
