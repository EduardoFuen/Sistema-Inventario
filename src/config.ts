// types
import { DefaultConfigProps } from 'types/config';

export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const FIREBASE_API = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
};

export const AWS_API = {
  poolId: 'us-east-1_aM1PPjbsx',
  appClientId: '1vf0bfpo5705b5fntre5jfkhf1'
};

export const AUTH0_API = {
  client_id: '',
  domain: ''
};

export const HOST = 'https://qkzcpwgfgc.execute-api.us-east-1.amazonaws.com/v1';

export const CATEGORY = {
  CategoryOne: 'CategoryOne',
  CategoryTwo: 'CategoryTwo',
  CategoryThree: 'CategoryThree'
};

export const DATEFORMAT = 'dd-MM-yyyy';

export const ProductDefault: any = [
  {
    ID: '',
    Name: '',
    Sku: '',
    Ean: '',
    Maker: '',
    Trademark: '',
    Type_Product: '',
    Variation: '',
    HandlesBaq: '',
    HandlesBog: '',
    IDProduct: '',
    Grupo: '',
    CategoryOne: '',
    CategoryTwo: '',
    Pack: '',
    Quantity: '',
    MakerUnit: '',
    Weight: '',
    Width: '',
    PackInfo: '',
    Height: '',
    WrapperUnit: '',
    Depth: '',
    Warehouse: '',
    Substance: '',
    Substitutes: '',
    Status: false,
    Keywords: '',
    Tax: '',
    IsTaxed: false
  }
];

export const ProductPurchaseDefault: any = [
  {
    Name: '',
    Sku: '',
    Ean: '',
    Quantity: '',
    BasePrice: '',
    Tax: '',
    DiscountNegotiated: '',
    DiscountAdditional: '',
    Bonus: ''
  }
];
// ==============================|| THEME CONFIG  ||============================== //

const config: DefaultConfigProps = {
  defaultPath: '/dashboard',
  fontFamily: `'Montserrat', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;
