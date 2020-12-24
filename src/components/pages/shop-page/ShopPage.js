import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import './ShopPage.scss';

import { setQuery } from '../../../redux/actions';

import ShopCollection from '../../shop-collection/ShopCollection';
import { connect } from 'react-redux';
const ShopPage = ({ setQuery }) => {
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const location = useLocation();
  const query = useQuery();

  useEffect(() => {
    if (!query.toString()) return;

    const [field, q] = [query.get('field'), query.get('q')];
    setQuery({ field, q });
  }, [setQuery]);

  return (
    <main className="shop-container container">
      <ShopCollection />
    </main>
  );
};

export default connect(null, { setQuery })(ShopPage);
