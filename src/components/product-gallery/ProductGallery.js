import { connect } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { getUserSelectedProduct } from '../../redux/selectors'
import { addToCart } from '../../redux/actions'
import { generateId } from '../utils/generateId'

import './ProductGallery.scss'
import CustomBtn from '../custom-btn/CustomBtn'

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
  '-webkit-line-clamp': 'unset',
  maxHeight: 'unset'
}

const ProductGallery = ({ product, addToCart }) => {
  const [mobile, setMobile] = useState()
  const [src, setSrc] = useState()
  const [hasMore, setHasMore] = useState(false)
  const [show, setShow] = useState(false)
  const ref = useRef()

  const imageRef = useRef()

  const mql = window.matchMedia('(max-width: 33.5rem)')

  useEffect(() => {
    const isMobile = e => {
      setMobile(e.matches)
    }

    mql.addEventListener('change', isMobile)

    return () => mql.removeEventListener('change', isMobile)
  })

  useEffect(() => {
    if (ref.current && ref.current.scrollHeight > ref.current.clientHeight + 3)
      setHasMore(true)
  }, [])

  const onClick = (e, image) => {
    if (!mobile && !mql.matches) {
      return setSrc(image)
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

  const onButtonClick = () => {
    addToCart(product)
  }

  if (!product) return null

  const renderImages = product.imageCollection.map(image => {
    return (
      <div
        key={generateId()}
        className="preview-images"
        style={!mobile && !mql.matches ? { ...style, marginBottom: 4 } : {}}
        onClick={e => onClick(e, image)}>
        <img
          style={
            !mobile && !mql.matches ? { width: '100%', height: '100%' } : {}
          }
          src={image}
          alt=""
        />
      </div>
    )
  })

  const renderDescription = () => {
    return (
      <div className="product-description-container">
        <h3>Description</h3>
        <hr />
        <div
          style={show ? clampStyle : {}}
          ref={ref}
          className="product-description">
          {product.description}
        </div>
        <div className="show-more">
          <span
            onClick={() => setShow(!show)}
            style={{
              color: 'rgb(24, 162, 187)',
              marginTop: '.5rem',
              marginLeft: 'auto',
              cursor: 'pointer'
            }}>
            {hasMore && 'read more'}
          </span>
        </div>
      </div>
    )
  }

  return mobile || mql.matches ? (
    <section className="product-detail">
      <figure className="product-gallery">
        <div className="preview-images" onClick={onClick}>
          <img src={product.image} alt={product.description} />
        </div>
        {renderImages}
      </figure>
      <header className="product-header">
        <h1
          className="product-title"
          style={{ marginTop: 0, fontWeight: 'normal' }}>
          {product.title}
        </h1>
        <b style={{ fontSize: '1.1rem' }}>&#8358; {product.price}</b>
        <div className="product-header_info">
          <div className="material-type">Fabric - crepe</div>
          <div className="custom-select">
            <select class="dropdown">
              <option value="" disabled selected>
                Select Size
              </option>
              <option value="1">20</option>
              <option value="0">30</option>
            </select>
          </div>
        </div>
        <div className="link">Add to wishlist</div>
        <CustomBtn
          onClick={onButtonClick}
          additionalStyles={additionalStyles}
          text="Add to cart"
        />
      </header>
      {renderDescription()}
    </section>
  ) : (
    <section>
      <div className="product-detail not-mobile">
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
        <div>
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
                <select class="dropdown">
                  <option value="" disabled selected>
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
export default connect(mapState, { addToCart })(ProductGallery)
