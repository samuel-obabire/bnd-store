import { connect } from 'react-redux';
import { getUserSelectedProduct } from '../../redux/selectors';

import './ProductGallery.scss';

const ProductGallery = ({ product }) => {
  if (!product) return null;

  const onClick = e => {
    if (!document.fullscreenElement) {
      e.currentTarget.children[0].requestFullscreen().catch(err => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  const renderImages = product.imageCollection.map(image => {
    return (
      <div
        key={434343 * Math.random() + Math.random - 34.4934 + 2323 + 0.43 * 5}
        className="preview-images"
        onClick={onClick}>
        <img src={image} alt="" />
      </div>
    );
  });

  return (
    <section className="product-detail">
      <figure className="product-gallery">
        <div className="preview-images" onClick={onClick}>
          <img src={product.image} alt={product.description} />
        </div>
        {renderImages}
      </figure>
      <header className="product-header">
        <div>{product.title}</div>
        <b style={{ fontSize: '1.1rem' }}>&#8358; {product.price}</b>
      </header>
      <hr />
      <div className="product-description">
        <b>Description</b>
        <div>{product.description}</div>
      </div>
    </section>
  );
};

const mapState = state => {
  return {
    product: getUserSelectedProduct(state),
  };
};
export default connect(mapState)(ProductGallery);
