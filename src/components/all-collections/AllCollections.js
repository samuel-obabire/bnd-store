import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import './AllCollections.scss'

import { parseString } from '../utils'
import { firestore } from '../utils/firebase'
import Spinner from '../spinner/Spinner'

const AllCollections = () => {
  const [allCollections, setAllCollections] = useState([])

  useEffect(() => {
    firestore
      .collection('categories')
      .get()
      .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()))
      .then(setAllCollections)
  }, [])

  const renderCollections = allCollections.map(({ coverImage, category }) => {
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
        <meta
          name="description"
          content="Bnd clothings - born to cover nakedness"
        />
        <meta
          name="title"
          content="Bnd Clothings - shop, clothings materia, accesories &amp; More!"
        />
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

export default AllCollections
