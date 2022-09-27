// third-party
import { Chance } from 'chance';

// types
import { Address, Products, Reviews, Packs, Warehouses, Maker, Trademark } from 'types/e-commerce';

const chance = new Chance();

// product reviews list
export const productReviews: Reviews[] = [
  {
    id: '1',
    rating: 3.5,
    review: chance.paragraph({ sentences: 2 }),
    date: '2 hour ago',
    profile: {
      avatar: 'avatar-1.png',
      name: 'Emma Labelle',
      status: chance.bool()
    }
  },
  {
    id: '2',
    rating: 4.0,
    review: chance.paragraph({ sentences: 2 }),
    date: '12 hour ago',
    profile: {
      avatar: 'avatar-2.png',
      name: 'Lucifer Wing',
      status: chance.bool()
    }
  },
  {
    id: '3',
    rating: 4.5,
    review: 'Nice!',
    date: '1 day ago',
    profile: {
      avatar: 'avatar-3.png',
      name: 'John smith',
      status: chance.bool()
    }
  }
];

// billing address list
export const address: Address[] = [
  {
    id: 1,
    name: 'Aspirina',
    destination: 'home',
    building: '1754 Ureate Path',
    street: '695 Newga View',
    city: 'Seporcus',
    state: 'Rhode Island',
    country: 'Belgium',
    post: 'SA5 5BO',
    phone: '+91 1234567890',
    isDefault: true
  },
  {
    id: 2,
    name: 'Atamel',
    destination: 'office',
    building: '1754 Ureate Path',
    street: '695 Newga View',
    city: 'Seporcus',
    state: 'Rhode Island',
    country: 'Belgium',
    post: 'SA5 5BO',
    phone: '+91 1234567890',
    isDefault: false
  }
];

// products list

export const products: Products[] = [];

// Pack list
export const packList: Packs[] = [
  {
    id: 1,
    name: 'vidrio',
    status: false,
    qty: 40
  }
];

// billing address list
export const warehouse: Warehouses[] = [
  {
    id: 1,
    name: 'Bogota',
    department: 'Bogota',
    city: 'Seporcus',
    location: 'Rhode Island',
    status: false
  }
];

// billing address list
export const maker: Maker[] = [
  {
    id: 1,
    name: 'Bogota',
    status: false
  }
];

// billing address list
export const trademaker: Trademark[] = [
  {
    id: 1,
    name: 'Test',
    maker: 'nuevo',
    status: false
  }
];
