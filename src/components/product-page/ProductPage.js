import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

import './ProductPage.scss'

import useQuery from '../../hooks/useQuery'
import ProductGallery from '../product-gallery/ProductGallery'
import { firestore } from '../utils/firebase'
import { setSelectedProduct } from '../../redux/actions'
import Collection from '../collection/Collection'
import { useLocation } from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import { getUserSelectedProduct } from '../../redux/selectors'

const ProductPage = ({ setSelectedProduct, product: prod }) => {
  const id = useQuery().get('id')
  const [product, setProduct] = useState(null)
  const [similarProd, setSimilarProd] = useState([])
  const [loading, setLoading] = useState(true)

  const search = useLocation().search

  useEffect(() => {
    setLoading(true)
  }, [search])

  useEffect(() => {
    if (!id) return
    const productRef = firestore.collection('products').doc(id)

    const unsubscribeFromListener = productRef.onSnapshot(
      doc => {
        setProduct(doc.data())

        setSelectedProduct(doc.data())
        setLoading(false)
      },
      e => console.log(e)
    )

    return () => unsubscribeFromListener()
  }, [search])

  useEffect(() => {
    if (!product) return

    const productRef = firestore.collection('products').doc(id)

    firestore
      .collection('products')
      .where('category', '==', product.category)
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs
          .map(doc => doc.data())
          .sort(() => Math.random() - 0.5)
          .filter((prod, idx) => prod.id !== product.id && idx < 6)
      })
      .then(setSimilarProd)
      .catch(e => console.log(e))

    const unsubscribeFromListener = productRef.onSnapshot(
      doc => {
        setSelectedProduct(doc.data())
      },
      e => console.log(e)
    )

    return () => unsubscribeFromListener()
  }, [product])

  const renderSimilarProducts = () => {
    return similarProd.length ? (
      <div style={{ marginTop: '2rem' }}>
        <Collection
          products={similarProd}
          title="Similar Products"
          url={similarProd[0].category}
        />
      </div>
    ) : null
  }

  const render = () => {
    if (loading) return <Spinner />

    if (!prod)
      return (
        <div style={{ marginBottom: '3rem' }}>
          Product(s) might not exist or you don't have an internet connection
        </div>
      )

    return (
      <>
        <ProductGallery />
        {renderSimilarProducts()}
      </>
    )
  }

  return <main className="product-page">{render()}</main>
}

const mapState = state => {
  return {
    product: getUserSelectedProduct(state)
  }
}

export default connect(mapState, { setSelectedProduct })(ProductPage)
