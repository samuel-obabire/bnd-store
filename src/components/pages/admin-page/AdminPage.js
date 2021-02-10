import { Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import Error from '../../404'
import EditProduct from '../../edit-product/EditProduct'
import Spinner from '../../spinner/Spinner'
import './AdminPage.scss'

const AllProducts = lazy(() =>
  import('../../../components/all-products/AllProducts')
)

const AdminPage = ({ match }) => {
  return (
    <div className="container admin-page">
      <Route exact path={`${match.path}`}>
        <Link to={`${match.path}/products`}>All Products</Link>
        <Link to={`${match.path}/product/new`}>Create new Product</Link>
      </Route>
      <Suspense
        fallback={
          <div className="fallback">
            <Spinner />
          </div>
        }>
        <Switch>
          <Route
            exact
            path={`${match.path}/products`}
            component={AllProducts}
          />
          <Route
            exact
            path={`${match.path}/product/:type/:id`}
            component={EditProduct}
          />
          <Route
            exact
            path={`${match.path}/product/:type`}
            component={EditProduct}
          />
          {/* <Route path="*" component={Error} /> */}
        </Switch>
      </Suspense>
    </div>
  )
}

export default connect(null)(AdminPage)
