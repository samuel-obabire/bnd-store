import { createSelector } from 'reselect';

const selectMobileMenuVisibility = state => state.mobileMenuVisibility.visible;
const selectShopCategories = state => state.shop.categories;
const selectShopCollections = state => state.shop.collections;
const selectUserSelectedProduct = state => state.user.lastProductSelected;

export const getMobileMenuVisibility = createSelector(
  selectMobileMenuVisibility,
  visibility => visibility
);

export const makeUniqueGetShopCategories = () =>
  createSelector(selectShopCategories, categories => categories);

export const makeGetShopCollections = () =>
  createSelector(selectShopCollections, collections => {
    return collections;
  });

export const getUserSelectedProduct = createSelector(
  selectUserSelectedProduct,
  product => product
);
