import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import './ShopCollection.scss'

import { clearProducts, setProducts } from '../../redux/actions'
import Product from '../product/Product'
import Spinner from '../spinner/Spinner'
import { firestore } from '../utils/firebase'

const ShopCollection = ({ setProducts, clearProducts, products, params }) => {
  const [beforeLastVisible, setBeforeLastVisible] = useState(null)
  const [lastVisible, setLastVisible] = useState(null)
  const [pageNo, setPageNo] = useState(0)

  const getProducts = async (field, operator, value, limit = 20) => {
    setBeforeLastVisible(lastVisible)
    const items = {}

    const pageRef = !lastVisible
      ? firestore
          .collection('products')
          .where(field, operator, value)
          .limit(limit)
      : firestore
          .collection('products')
          .where(field, operator, value)
          .limit(limit)
          .startAfter(lastVisible)

    const documentSnapshots = await pageRef.get()
    documentSnapshots.forEach(doc => {
      items[doc.id] = doc.data()
    })

    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1])

    return items
  }

  useEffect(() => {
    if (!params.field) return

    clearProducts()

    const s = async () => {
      switch (params.field) {
        case 'indexes':
          setProducts(
            await getProducts(params.field, 'array-contains', params.q)
          )
          break
        default:
          setProducts(await getProducts(params.field, '==', params.q))
          break
      }
    }

    s()

    // return () => setLastVisible(null)
  }, [params, pageNo])

  const onClick = () => {
    window.scroll(0, 0)

    setPageNo(pageNo + 1)
  }

  const shopProducts = Object.values(products).map(({ ...props }) => {
    return (
      <div className="shop-collection" key={props.id}>
        <Product {...props} />
      </div>
    )
  })

  const renderShopProducts = () => {
    return (
      <div className="shop-collection-container">
        {shopProducts}
        <button onClick={onClick}>next</button>
      </div>
    )
  }

  return shopProducts.length ? renderShopProducts() : <Spinner />
}

const mapState = state => {
  return {
    products: state.shop.products,
    params: state.shop.query
  }
}

export default connect(mapState, { setProducts, clearProducts })(ShopCollection)
