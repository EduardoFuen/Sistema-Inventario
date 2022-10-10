// project imports
import services from 'utils/mockAdapter';
import { products } from 'data/e-commerce';

// types
import { KeyedObject } from 'types/cart';
import { Products } from 'types/e-commerce';

// ==============================|| MOCK SERVICES ||============================== //

services.onPost('/api/products/filter').reply((config) => {
  try {
    const { filter } = JSON.parse(config.data);

    if (filter.sort === 'high') {
      products.sort((a: Products, b: Products) => Number(b.Price) - Number(a.Price));
    }

    if (filter.sort === 'low') {
      products.sort((a, b) => Number(a.Price) - Number(b.Price));
    }

    if (filter.sort === 'Maker') {
      products.sort((a, b) => Number(b.Maker) - Number(a.Maker));
    }

    if (filter.sort === 'Discount') {
      products.sort((a, b) => Number(b.Discount) - Number(a.Discount));
    }
    /* 
    if (filter.sort === 'new') {
      products.sort((a, b) => Number(b.new) - Number(a.new));
    } */

    const results = products.filter((product: KeyedObject) => {
      let searchMatches = true;

      if (filter.search) {
        const properties = ['name', 'description', 'rating', 'salePrice', 'Price', 'gender'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (product[property] && product[property].toString().toLowerCase().includes(filter.search.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          searchMatches = false;
        }
      }

      const genderMatches = filter.gender.length > 0 ? filter.gender.some((item: string) => item === product.gender) : true;
      const categoriesMatches =
        filter.categories.length > 0 && filter.categories.some((category: string) => category !== 'all')
          ? filter.categories.some((category: string) => product.categories.some((item: string) => item === category))
          : true;
      const colorsMatches =
        filter.colors.length > 0 ? filter.colors.some((color: string) => product.colors.some((item: string) => item === color)) : true;

      const minMax = filter.Price ? filter.Price.split('-') : '';
      const PriceMatches = filter.Price ? product.Price >= minMax[0] && product.Price <= minMax[1] : true;
      const ratingMatches = filter.rating > 0 ? product.rating >= filter.rating : true;

      return searchMatches && genderMatches && categoriesMatches && colorsMatches && PriceMatches && ratingMatches;
    });

    return [200, results];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

services.onPost('/api/product/details').reply((config) => {
  try {
    const { id } = JSON.parse(config.data);

    let results;
    if (id === 'default') {
      [results] = products;
    } else {
      // [results] = products?.filter((product) => product.id === Number(id));
    }

    return [200, results];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

services.onPost('/api/product/related').reply((config) => {
  try {
    const results = '';

    return [200, results];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
