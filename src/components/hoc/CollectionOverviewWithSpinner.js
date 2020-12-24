import { connect } from 'react-redux';
import { useEffect } from 'react';

import { getCollections } from '../../redux/actions';
import { makeGetShopCollections } from '../../redux/selectors';
import Spinner from '../spinner/Spinner';

const CollectionOverviewWithSpinner = ({
  Component,
  getCollections,
  collections,
  ...props
}) => {
  useEffect(() => {
    getCollections();
  }, [getCollections]);

  return !Object.entries(collections).length ? (
    <Spinner />
  ) : (
    <Component collections={collections} />
  );
};

const makeMapState = state => {
  const getShopCollections = makeGetShopCollections();

  return {
    collections: getShopCollections(state),
  };
};

export default connect(makeMapState, { getCollections })(
  CollectionOverviewWithSpinner
);
