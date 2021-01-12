import { Route, Switch } from 'react-router-dom'
import { useEffect } from 'react'
import { connect } from 'react-redux'

import './ShopPage.scss'

import { setQuery } from '../../../redux/actions'

import ShopCollection from '../../shop-collection/ShopCollection'
import ProductPage from '../../product-page/ProductPage'
import useQuery from '../../../hooks/useQuery'
import Error from '../../404'
import { Helmet } from 'react-helmet'

const ShopPage = ({ setQuery, match, location }) => {
  const query = useQuery()

  useEffect(() => {
    if (!query.toString()) return

    const [field, q] = [query.get('field'), query.get('q')]
    setQuery({ field, q })
  }, [setQuery, location.search])

  return (
    <main className="shop-container container">
      <Switch>
        <Route exact path="/shop">
          <Helmet>
            <title>Shop - Bnd Store</title>
            <meta name="description" content="Shop quality products" />
            <meta
              name="title"
              content="Bnd Clothings - shop, clothings materia, accesories &amp; More!"
            />
          </Helmet>
          <div>Collections</div>
          <div>Collections</div>
          <div>Collections</div>
          <div>Collections</div>
          <div>Collections</div>
          <div>Collections</div>
          <div>Collections</div>
          <div>Collections</div>
        </Route>
        <Route exact path="/shop/collection" component={ShopCollection} />
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
