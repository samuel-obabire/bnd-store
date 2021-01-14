import { Link } from 'react-router-dom'

import './Collection.scss'

import Product from '../product/Product'
import { unParseString, parseString } from '../utils'

const Collection = ({ products, title: t }) => {
  if (!products || JSON.stringify(products) === '{}') return null

  const renderCollections = Object.values(products).map(({ ...props }) => {
    return (
      <div className="collection-product" key={props.id}>
        <Product {...props} />
      </div>
    )
  })

  const title = unParseString(t)

  return (
    <section className="collection-wrapper">
      <header className="collection-header">
        <h4>{title}</h4>
        <Link
          to={`/shop/collection/${parseString(
            title
          )}?field=category&q=${title}`}>
          Explore
        </Link>
      </header>
      <div className="collection-products">{renderCollections}</div>
    </section>
  )
}

export default Collection
