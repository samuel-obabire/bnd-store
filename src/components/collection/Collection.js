import './Collection.scss';

import LazyImage from '../lazy-image/LazyImage';
import { generateId } from '../utils/generateId';

const Collection = ({ products, title }) => {
  const renderProducts = products.map(({ uri, image, price, title }) => {
    return (
      <div className="collection-product" key={generateId()}>
        <LazyImage uri={uri} src={image} height={'80%'} width={'100%'} />
        <div style={{ height: '20%' }}>
          <div className="product-title">{title}</div>
          <b>{price}</b>
        </div>
      </div>
    );
  });

  return (
    <div className="collection-wrapper">
      <header className="collection-header">
        <h4>{title}</h4>
      </header>
      <div className="collection-products">{renderProducts}</div>
    </div>
  );
};

export default Collection;
