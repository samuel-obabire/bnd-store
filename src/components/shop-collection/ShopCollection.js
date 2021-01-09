import { useEffect } from 'react'
import { connect } from 'react-redux'

import './ShopCollection.scss'

import { getProducts } from '../../redux/actions'
import Product from '../product/Product'
import Spinner from '../spinner/Spinner'

const ShopCollection = ({ getProducts, products, params }) => {
  useEffect(() => {
    if (!params.field) return

    switch (params.field) {
      case 'indexes':
        getProducts(params.field, 'array-contains', params.q)
        break
      default:
        getProducts(params.field, '==', params.q)
        break
    }
  }, [params])

  const shopProducts = Object.values(products).map(({ ...props }) => {
    return (
      <div className="shop-collection" key={props.id}>
        <Product {...props} />
      </div>
    )
  })

  const renderShopProducts = () => {
    return <div className="shop-collection-container">{shopProducts}</div>
  }

  return shopProducts.length ? renderShopProducts() : <Spinner />
}

const mapState = state => {
  return {
    products: state.shop.products,
    params: state.shop.query
  }
}

export default connect(mapState, { getProducts })(ShopCollection)
