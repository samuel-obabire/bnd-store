import { createSelector } from 'reselect';

const selectMobileMenuVisibility = state => state.mobileMenuVisibility.visible;

export const getMobileMenuVisibility = createSelector(
  selectMobileMenuVisibility,
  visibility => visibility
);
