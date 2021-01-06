import { Route, Switch } from 'react-router-dom'
import { useEffect } from 'react'
import { connect } from 'react-redux'

import './ShopPage.scss'

import { setQuery } from '../../../redux/actions'

import ShopCollection from '../../shop-collection/ShopCollection'
// import RouteBar from '../../route-bar/RouteBar';
// import { Breakpoint } from 'react-socks';
import ProductPage from '../../product-page/ProductPage'
import useQuery from '../../../hooks/useQuery'
import Error from '../../404'

const ShopPage = ({ setQuery, match, location }) => {
  const query = useQuery()

  useEffect(() => {
    if (!query.toString()) return

    const [field, q] = [query.get('field'), query.get('q')]
    setQuery({ field, q })
  }, [setQuery, location.search])

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
        <Route path="*" component={Error} />
      </Switch>
    </main>
  )
}

export default connect(null, { setQuery })(ShopPage)
