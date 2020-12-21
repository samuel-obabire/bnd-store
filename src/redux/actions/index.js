import {
  SET_USER,
  SET_SEARCH_TERM,
  SET_MOBILE_MENU_VISIBILITY,
  SET_CATEGORIES,
} from './types';
import { getShopCollection } from '../../components/utils/firebase';

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setSearchTerm = term => {
  return {
    type: SET_SEARCH_TERM,
    payload: term,
  };
};

export const setMobileMenuVisiblity = () => {
  return {
    type: SET_MOBILE_MENU_VISIBILITY,
  };
};

export const getCollections = () => async dispatch => {
  const [
    electronics,
    menClothing,
    womenClothing,
    footWear,
  ] = await Promise.all([
    getShopCollection('electronics'),
    getShopCollection('men clothing'),
    getShopCollection('women clothing'),
    getShopCollection('footwear'),
  ]);

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
