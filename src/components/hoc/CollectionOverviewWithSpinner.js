import { connect } from 'react-redux';
import { useEffect } from 'react';

import { getCollections } from '../../redux/actions';
import { getShopCollections } from '../../redux/selectors';
import Spinner from '../spinner/Spinner';

const CollectionOverviewWithSpinner = ({
  Component,
  getCollections,
  collections,
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

const mapState = state => {
  return {
    collections: getShopCollections(state),
  };
};

export default connect(mapState, { getCollections })(
  CollectionOverviewWithSpinner
);
