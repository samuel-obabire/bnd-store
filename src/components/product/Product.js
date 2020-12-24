import './Product.scss';

import LazyImage from '../lazy-image/LazyImage';

const Product = ({ uri, image, title, price }) => {
  return (
    <>
      <LazyImage uri={uri} src={image} height={'70%'} width={'100%'} />
      <div style={{ height: '30%' }}>
        <div className="product-title">{title}</div>
        <b>{price}</b>
      </div>
    </>
  );
};

export default Product;
