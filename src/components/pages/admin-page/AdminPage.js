import { Suspense, lazy, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import Error from '../../404'
import EditProduct from '../../edit-product/EditProduct'
import Spinner from '../../spinner/Spinner'
import './AdminPage.scss'

const AllProducts = lazy(() =>
  import('../../../components/all-products/AllProducts')
)

const AdminPage = ({ match, user }) => {
  const history = useHistory()

  useEffect(() => {
    if (!user?.isAdmin) history.push('/login?next=admin')
  }, [history])

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

const mapState = state => {
  return {
    user: state.user.currentUser
  }
}

export default connect(mapState)(AdminPage)
