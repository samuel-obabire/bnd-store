import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './AllCollections.scss'

import { parseString } from '../utils'
import { firestore } from '../utils/firebase'
import Spinner from '../spinner/Spinner'

const AllCollections = ({ cat }) => {
  const [allCollections, setAllCollections] = useState([])
  const [categories, setCategories] = useState([])
  const c = Object.keys(cat)

  const category = categories[0]?.category

  useEffect(() => {
    const func = async () => {
      await firestore
        .collection('categories')
        .get()
        .then(result => {
          setAllCollections([...result.docs.map(doc => doc.data())])
        })
    }

    func()
  }, [cat])

  useEffect(() => {
    if (!allCollections.length) return

    const categories = allCollections.filter(collection =>
      c.includes(collection.category)
    )

    setCategories(categories)
  }, [allCollections])

  if (!categories.length) return <Spinner />

  const renderCollections = categories.map(({ coverImage, category }) => {
    const style = {
      backgroundImage: `url(${coverImage})`
    }

    return (
      <Link
        key={category}
        to={`/shop/collection/${parseString(
          category
        )}?field=category&q=${category}`}>
        <div className="col-wrapper">
          <div className="col-background col-header" style={style}>
            <header>
              <h2>{category}</h2>
            </header>
          </div>
        </div>
      </Link>
    )
  })

  return (
    <>
      <Helmet>
        <title>All Collections - Bnd Clothings</title>
        <meta name="description" content="Shop our collections" />
        <meta property="og:description" content="Shop our collections" />
        <meta
          name="title"
          content="Bnd Clothings - shop, clothings material, accesories &amp; More!"
        />
        <meta property="og:title" content={category} />
      </Helmet>
      <main className="container all-collections-page">
        {!allCollections.length ? (
          <Spinner />
        ) : (
          <>
            <h1>Our Collections</h1>
            <div className="all-collections">{renderCollections}</div>
          </>
        )}
      </main>
    </>
  )
}

const mapState = state => {
  return {
    cat: state.shop.categories
  }
}

export default connect(mapState)(AllCollections)
