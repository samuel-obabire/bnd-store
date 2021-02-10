import './Product.scss'

import LazyImage from '../lazy-image/LazyImage'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { formatPrice } from '../utils'

const Product = ({ uri, image, title, price, id, onClick }) => {
  const history = useHistory()
  const match = useRouteMatch()

  const onProductClick = () => {
    if (match.path === '/admin/products')
      return history.push(`/admin/product/edit/${id}`)
    history.push(`/shop/${title.replace(/ /g, '+')}?id=${id}`)
  }

  return (
    <div className="product" onClick={onClick ?? onProductClick}>
      <LazyImage uri={uri} src={image} height={'70%'} />
      <div style={{ height: '30%' }}>
        <div className="product-title">{title}</div>
        <b>{formatPrice(price)}</b>
      </div>
    </div>
  )
}

export default Product
