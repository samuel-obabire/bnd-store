import { Link } from 'react-router-dom'

import './Collection.scss'

import Product from '../product/Product'

const Collection = ({ products, title, url }) => {
  const renderCollections = Object.values(products).map(({ ...props }) => {
    return (
      <div className="collection-product" key={props.id}>
        <Product {...props} />
      </div>
    )
  })

  return (
    <section className="collection-wrapper">
      <header className="collection-header">
        <h4>{title}</h4>
        <Link
          to={`/shop?field=category&q=${
            url || title.toLowerCase().replace(/ /g, '+')
          }`}>
          Explore
        </Link>
      </header>
      <div className="collection-products">{renderCollections}</div>
    </section>
  )
}

export default Collection
