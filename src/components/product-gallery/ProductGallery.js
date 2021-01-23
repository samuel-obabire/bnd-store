import { connect } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getUserSelectedProduct } from '../../redux/selectors'
import { addToCart, displayNoticationModal } from '../../redux/actions'
import { generateId } from '../utils/'

import './ProductGallery.scss'
import CustomBtn from '../custom-btn/CustomBtn'
import withMediaQuery from '../hoc/withMediaQuery'
import NotificationModal from '../notification-modal/NotificationModal'

const style = {
  height: '3rem',
  margin: 0,
  width: '100%',
  overflow: 'hidden'
}

const additionalStyles = {
  width: '100%',
  maxWidth: 'unset',
  margin: '0 auto'
}

const clampStyle = {
  WebkitLineClamp: 'unset',
  maxHeight: 'unset'
}

const ProductGallery = ({
  product,
  addToCart,
  isMobile,
  displayNoticationModal
}) => {
  const [src, setSrc] = useState()
  const [expandable, setExpandable] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const ref = useRef()

  const imageRef = useRef()

  useEffect(() => {
    if (ref.current && ref.current.scrollHeight > ref.current.clientHeight + 3)
      setExpandable(true)
  }, [])

  const onClick = (e, image) => {
    if (!isMobile) {
      return image && setSrc(image)
    }

    if (!document.fullscreenElement) {
      e.currentTarget.children[0].requestFullscreen().catch(err => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        )
      })
    } else {
      document.exitFullscreen()
    }
  }

  const renderDescription = () => {
    return (
      <div className="product-description-container">
        <h3>Description</h3>
        <hr />
        <div
          style={expanded ? clampStyle : {}}
          ref={ref}
          className="product-description">
          {product.description}
        </div>
        <div
          className="show-more"
          onClick={e => {
            e.currentTarget.classList.toggle('rotation')
            setExpanded(!expanded)
          }}>
          <span>{`${expandable && isMobile ? 'read more' : ''}`}</span>
        </div>
      </div>
    )
  }

  const onButtonClick = () => {
    addToCart(product)
    displayNoticationModal(`${product.title} has been added to your cart`)
  }

  if (!product) return null

  const renderImages = product.imageCollection.map(image => {
    return (
      <div
        key={generateId()}
        className="preview-images"
        style={!isMobile ? { ...style, marginBottom: 4 } : {}}
        onClick={e => onClick(e, image)}>
        <img
          style={isMobile ? { width: '200px', height: '200px' } : {}}
          src={image}
          alt=""
        />
      </div>
    )
  })

  return isMobile ? (
    <section>
      <NotificationModal />
      <div className={`product-detail`}>
        <i>Click image to toogle fullscreen</i>
        <figure className="product-gallery">
          <div className="preview-images" onClick={onClick}>
            <img src={product.image} alt={product.description} />
          </div>
          {renderImages}
        </figure>
        <div className="product-header-wrapper">
          <header className="product-header l">
            <h1
              className="product-title"
              style={{ fontSize: '1.5rem', fontWeight: '400' }}>
              {product.title}
            </h1>

            <b style={{ fontSize: '1.7rem' }}>&#8358; {product.price}</b>
            <div className="product-header_info">
              <div className="material-type">Fabric - crepe</div>
              <div className="custom-select">
                <select className="dropdown" defaultValue="Size">
                  <option value="" disabled>
                    Select Size
                  </option>
                  <option value="1">20</option>
                  <option value="0">30</option>
                </select>
              </div>
            </div>
            <div className="link ">Add to wishlist</div>
            <CustomBtn
              onClick={onButtonClick}
              additionalStyles={additionalStyles}
              text="Add to cart"
            />
          </header>
        </div>
      </div>
      {renderDescription(expanded, expandable)}
    </section>
  ) : (
    <section>
      <NotificationModal />
      <div className={`product-detail not-mobile`}>
        <figure className="product-gallery not-mobile">
          <div className="product-thumbnails">{renderImages}</div>
          <div
            className="preview-images"
            style={{ ...style, height: '100%', width: '100%' }}
            onClick={onClick}>
            <img
              ref={imageRef}
              id="image"
              style={{ width: '100%', height: '100%' }}
              src={src || product.image}
              alt={product.description}
            />
          </div>
        </figure>
        <div className="product-header-wrapper">
          <header className="product-header">
            <h1
              className="product-title"
              style={{ fontSize: '1.5rem', fontWeight: '400' }}>
              {product.title}
            </h1>

            <b style={{ fontSize: '1.7rem' }}>&#8358; {product.price}</b>
            <div className="product-header_info">
              <div className="material-type">Fabric - crepe</div>
              <div className="custom-select">
                <select className="dropdown" defaultValue="Size">
                  <option value="" disabled>
                    Select Size
                  </option>
                  <option value="1">20</option>
                  <option value="0">30</option>
                </select>
              </div>
            </div>
            <div className="link ">Add to wishlist</div>
            <CustomBtn
              onClick={onButtonClick}
              additionalStyles={additionalStyles}
              text="Add to cart"
            />
          </header>
        </div>
      </div>
      {renderDescription()}
    </section>
  )
}

const mapState = state => {
  return {
    product: getUserSelectedProduct(state)
  }
}

export default connect(mapState, { addToCart, displayNoticationModal })(
  withMediaQuery(ProductGallery, '(max-width: 33.5rem)')
)
