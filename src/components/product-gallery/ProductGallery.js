import { connect } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'

import { getUserSelectedProduct } from '../../redux/selectors'
import { addToCart, displayNoticationModal } from '../../redux/actions'
import { formatPrice, generateId } from '../utils/'

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
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0])
  const ref = useRef()

  const imageRef = useRef()

  useEffect(() => {
    if (ref.current && ref.current.scrollHeight > ref.current.clientHeight + 3)
      setExpandable(true)
  }, [])

  const requestFullscreen = e => {
    if (!document.fullscreenElement) {
      isMobile &&
        e.currentTarget.children[0].requestFullscreen().catch(err => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          )
        })

      !isMobile &&
        e.target.requestFullscreen().catch(err => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          )
        })
    } else {
      document.exitFullscreen()
    }
  }

  const onClick = (e, image) => {
    if (!isMobile) {
      return image && setSrc(image)
    }

    requestFullscreen(e)
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
            setExpanded(!expanded)
          }}>
          <span>{`${
            expandable && isMobile ? 'read more' : expanded ? 'hide more' : ''
          }`}</span>
        </div>
      </div>
    )
  }

  const onButtonClick = () => {
    addToCart({ ...product, size: selectedSize })
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

  const renderHeader = (
    <Helmet>
      <title>{product.title} - Bnd Clothings</title>
      <meta property="og:description" content={product.description} />
      <meta name="description" content={product.description} />
      <meta name="title" content={product.title} />
      <meta property="og:title" content={product.title} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:image" content={product.image} />
    </Helmet>
  )

  return isMobile ? (
    <section>
      {renderHeader}
      <NotificationModal />
      <div className={`product-detail`}>
        <i>Click image to toogle fullscreen</i>
        <figure className="product-gallery">
          <div className="preview-images" onClick={onClick}>
            <img
              src={product.image}
              alt={product.description}
              style={{ width: 200, height: 200 }}
            />
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
            <b style={{ fontSize: '1.7rem' }}>{formatPrice(product.price)}</b>
            <div className="product-header_info">
              <div className="material-type">Fabric: {product.material}</div>
              <div className="custom-select">
                <select
                  onChange={e => setSelectedSize(e.target.value)}
                  className="dropdown"
                  defaultValue="Size">
                  <option value="Size" disabled>
                    Select Size
                  </option>
                  {product.sizes.map(size => (
                    <option value={size} key={generateId()}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* <div className="link ">Add to wishlist</div> */}
            <CustomBtn
              onClick={onButtonClick}
              additionalStyles={additionalStyles}
              text="Add to cart"
            />
            <a
              href={`https://api.whatsapp.com/send?phone=2348087570081&text=
            Hello%2C%20I%20am%20interested%20in%20your%20%20product, ${product.title}`}
              rel="noopener noreferrer"
              target="_blank"
              className="custom-btn"
              style={{
                ...additionalStyles,
                margin: '2rem auto',
                background: '#06d755',
                fontWeight: '500',
                color: '#edeaea'
              }}>
              Order on WhatsApp
            </a>
          </header>
        </div>
      </div>
      {renderDescription(expanded, expandable)}
    </section>
  ) : (
    <section>
      {renderHeader}
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
              style={{ width: '100%', height: '100%', cursor: 'zoom-in' }}
              src={src || product.image}
              alt={product.description}
              onClick={requestFullscreen}
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

            <b style={{ fontSize: '1.7rem' }}>{formatPrice(product.price)}</b>
            <div className="product-header_info">
              <div className="material-type">Fabric: {product.material}</div>
              <div className="custom-select">
                <select
                  onChange={e => setSelectedSize(e.target.value)}
                  className="dropdown"
                  defaultValue="Size">
                  <option value="Size" disabled>
                    Select Size
                  </option>
                  {product.sizes.map(size => (
                    <option value={size} key={generateId()}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* <div className="link ">Add to wishlist</div> */}
            <CustomBtn
              onClick={onButtonClick}
              additionalStyles={additionalStyles}
              text="Add to cart"
            />
            <a
              href={`https://api.whatsapp.com/send?phone=2348087570081&text=
             Hello%2C%20I%20am%20interested%20in%20your%20%20product, ${product.title}`}
              rel="noopener noreferrer"
              target="_blank"
              className="custom-btn"
              style={{
                ...additionalStyles,
                margin: '2rem auto',
                background: '#06d755',
                fontWeight: '500',
                color: '#edeaea'
              }}>
              Order on WhatsApp
            </a>
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
