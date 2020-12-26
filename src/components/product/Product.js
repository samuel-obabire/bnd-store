import './Product.scss';

import LazyImage from '../lazy-image/LazyImage';
import { useHistory } from 'react-router-dom';

const Product = ({ uri, image, title, price, id }) => {
  const history = useHistory();

  const onProductClick = () => {
    history.push(`/shop/${title.replace(/ /g, '+')}?id=${id}`);
  };

  return (
    <div className="product" onClick={onProductClick}>
      <LazyImage uri={uri} src={image} height={'70%'} />
      <div style={{ height: '30%' }}>
        <div className="product-title">{title}</div>
        <b>&#8358;{price}</b>
      </div>
    </div>
  );
};

export default Product;
