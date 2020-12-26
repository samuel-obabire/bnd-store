import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import './ShopPage.scss';

import { setQuery } from '../../../redux/actions';

import ShopCollection from '../../shop-collection/ShopCollection';
// import RouteBar from '../../route-bar/RouteBar';
// import { Breakpoint } from 'react-socks';
import ProductPage from '../../product-page/ProductPage';
import useQuery from '../../../hooks/useQuery';

const ShopPage = ({ setQuery, match, location }) => {
  const query = useQuery();
  console.log('shop');

  useEffect(() => {
    if (!query.toString()) return;

    const [field, q] = [query.get('field'), query.get('q')];
    setQuery({ field, q });
  }, [setQuery, location.search]);

  return (
    <main className="shop-container container">
      {/* <Breakpoint medium up>
        {/* <Route path={`${match.path}`} component={RouteBar} /> */}
      {/* </Breakpoint> */}
      <Switch>
        <Route exact path="/shop" component={ShopCollection} />
        <Route
          exact
          path={`${match.path}/:productName`}
          component={ProductPage}
        />
        <Route path="*">
          <div style={{ height: 200, width: 400, background: 'red' }} />
        </Route>
      </Switch>
    </main>
  );
};

export default connect(null, { setQuery })(ShopPage);
