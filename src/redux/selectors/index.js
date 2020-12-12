import { createSelector } from 'reselect';

const selectMobileMenuVisibility = state => state.mobileMenuVisibility.visible;
const selectShopCategories = state => state.shop.categories;

export const getMobileMenuVisibility = createSelector(
  selectMobileMenuVisibility,
  visibility => visibility
);

export const makeUniqueGetShopCategories = () =>
  createSelector(selectShopCategories, categories => categories);
