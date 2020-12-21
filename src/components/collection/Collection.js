import './Collection.scss';

import LazyImage from '../lazy-image/LazyImage';

const Collection = ({ products, title }) => {
  const renderProducts = products.map(({ uri, image }) => {
    return (
      <div className="collection-product">
        <LazyImage uri={uri} src={image} />;
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
