import { Route, Switch } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { connect } from 'react-redux'

import './ShopPage.scss'

import { setQuery } from '../../../redux/actions'

import useQuery from '../../../hooks/useQuery'
import Error from '../../404'
import Spinner from '../../spinner/Spinner'

const AllCollections = lazy(() =>
  import('../../all-collections/AllCollections')
)
const ShopCollection = lazy(() =>
  import('../../shop-collection/ShopCollection')
)
const ProductPage = lazy(() => import('../../product-page/ProductPage'))

const ShopPage = ({ setQuery, match, location }) => {
  const query = useQuery()

  useEffect(() => {
    if (!query.toString()) return

    const [field, q] = [query.get('field'), query.get('q')]
    setQuery({ field, q })
  }, [setQuery, location.search])

  return (
    <main className="shop-container container">
      <Suspense
        fallback={
          <div className="fallback">
            <Spinner />
          </div>
        }>
        <Switch>
          <Route exact path="/shop" component={AllCollections} />
          <Route
            exact
            path="/shop/collection/:title"
            component={ShopCollection}
          />
          <Route
            exact
            path={`${match.path}/:productName`}
            component={ProductPage}
          />
          <Route path="*" component={Error} />
        </Switch>
      </Suspense>
    </main>
  )
}

export default connect(null, { setQuery })(ShopPage)
