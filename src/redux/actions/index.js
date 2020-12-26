import {
  SET_USER,
  SET_MOBILE_MENU_VISIBILITY,
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_SELECTED_PRODUCT,
} from './types';
import { getCollection } from '../../components/utils/firebase';

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setMobileMenuVisiblity = () => {
  return {
    type: SET_MOBILE_MENU_VISIBILITY,
  };
};

export const getCollections = () => async dispatch => {
  const limit = 4;
  const [electronics, menClothing, womenClothing, footWear] = await Promise.all(
    [
      getCollection({
        field: 'category',
        operator: '==',
        value: 'electronics',
      }),
      getCollection({
        field: 'category',
        operator: '==',
        value: 'men clothing',
      }),
      getCollection({
        field: 'category',
        operator: '==',
        value: 'women clothing',
      }),
      getCollection({ field: 'category', operator: '==', value: 'footwear' }),
    ]
  );

  dispatch({
    type: SET_CATEGORIES,
    payload: {
      electronics,
      menClothing,
      womenClothing,
      footWear,
    },
  });
};

export const setQuery = params => {
  return {
    type: 'SET_QUERY',
    payload: params,
  };
};

export const getProducts = (field, operator, q) => async dispatch => {
  const products = await getCollection({
    field,
    operator,
    value: q,
    limit: 21,
  });

  console.log(products);

  dispatch({
    type: SET_PRODUCTS,
    payload: products,
  });
};

export const setSelectedProduct = product => {
  return {
    type: SET_SELECTED_PRODUCT,
    payload: product,
  };
};
