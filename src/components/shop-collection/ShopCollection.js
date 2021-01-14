import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import './ShopCollection.scss'

import { clearProducts, setProducts } from '../../redux/actions'
import Product from '../product/Product'
import Spinner from '../spinner/Spinner'
import { firestore } from '../utils/firebase'
import { unParseString } from '../utils'

const ShopCollection = ({
  setProducts,
  clearProducts,
  products = {},
  query,
  match
}) => {
  const [items, setItems] = useState({})
  const [lastVisible, setLastVisible] = useState(null)
  const [firstVisible, setFirstVisible] = useState(null)
  const [totalProd, setTotalProd] = useState(null)
  const [pageNum, setPageNum] = useState(1)

  const pageSize = 18
  const filter = 'price'

  const pageTitle = unParseString(match.params.title)

  let pageRef = firestore.collection('products')

  if (query.field === 'category') {
    pageRef = pageRef.where(query.field, '==', query.q)
  } else if (query.field === 'indexes') {
    pageRef = pageRef.where(query.field, 'array-contains', query.q)
  }

  const transformItems = async query => {
    const items = {}

    const documentSnapshots = await query.get()
    documentSnapshots.forEach(doc => {
      items[doc.id] = doc.data(documentSnapshots.docs[0])

      setFirstVisible(documentSnapshots.docs[0])
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1])
    })

    return items
  }

  const getTotalProd = async () => {
    return pageRef.get().then(snapshot => snapshot.docs.length)
  }

  const defaultPage = async () => {
    const q = pageRef.orderBy(filter).limit(pageSize)

    const [totalProd, items] = await Promise.all([
      getTotalProd(),
      transformItems(q)
    ]).catch(console.log)

    setTotalProd(totalProd)
    setItems(items)
  }

  const nextPage = async () => {
    if (Math.floor(totalProd / (pageSize * pageNum)) <= 0) return

    setPageNum(pageNum + 1)

    clearProducts()

    window.scrollTo(0, 0)

    const q = pageRef.orderBy(filter).startAfter(lastVisible).limit(pageSize)
    setItems(await transformItems(q))
  }

  const previousPage = async () => {
    console.log(pageNum)
    if (pageNum === 1) return

    clearProducts()

    window.scrollTo(0, 0)

    const q = pageRef
      .orderBy(filter)
      .endBefore(firstVisible)
      .limitToLast(pageSize)

    setItems(await transformItems(q))
    setPageNum(pageNum - 1)
  }

  useEffect(() => {
    setProducts(items)
  }, [items])

  useEffect(() => {
    clearProducts()
    defaultPage()
  }, [query])

  const shopProducts = Object.values(products).map(({ ...props }) => {
    return (
      <div className="shop-collection" key={props.id}>
        <Product {...props} />
      </div>
    )
  })

  const renderShopProducts = () => {
    const hasMoreFwd =
      Math.floor(totalProd / (pageSize * pageNum)) <= 0 ? 'disabled' : ''
    const hasMoreBkw = pageNum === 1 ? 'disabled' : ''
    const currentPage = `${pageNum}/${Math.ceil(totalProd / pageSize)}`

    return (
      <main className="shop-wrapper container">
        <h1>{pageTitle}</h1>
        <div className="shop-collection-container">{shopProducts}</div>
        <div className="page-nav-btn">
          <button className={`btn-link ${hasMoreBkw}`} onClick={previousPage}>
            PREVIOUS PAGE
          </button>
          <div>{currentPage}</div>
          <button className={`btn-link ${hasMoreFwd}`} onClick={nextPage}>
            NEXT PAGE
          </button>
        </div>
      </main>
    )
  }

  return shopProducts.length ? renderShopProducts() : <Spinner />
}

const mapState = state => {
  return {
    products: state.shop.products,
    query: state.shop.query
  }
}

export default connect(mapState, { setProducts, clearProducts })(ShopCollection)
