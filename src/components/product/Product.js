import './Product.scss';

import LazyImage from '../lazy-image/LazyImage';

const Product = ({ uri, image, title, price }) => {
  return (
    <div className="product">
      <LazyImage uri={uri} src={image} height={'70%'} />
      <div style={{ height: '30%' }}>
        <div className="product-title">{title}</div>
        <b>&#8358;{price}</b>
      </div>
    </div>
  );
};

export default Product;
