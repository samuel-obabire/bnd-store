import { createSelector } from 'reselect';

const selectMobileMenuVisibility = state => state.mobileMenuVisibility.visible;
const selectShopCategories = state => state.shop.categories;
const selectShopCollections = state => state.shop.collections;

export const getMobileMenuVisibility = createSelector(
  selectMobileMenuVisibility,
  visibility => visibility
);

export const makeUniqueGetShopCategories = () =>
  createSelector(selectShopCategories, categories => categories);

export const getShopCollections = createSelector(
  selectShopCollections,
  collections => {
    return collections;
  }
);
