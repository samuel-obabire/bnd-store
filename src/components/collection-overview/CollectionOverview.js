import './CollectionOverview.scss';

import Collection from '../collection/Collection';

const CollectionOverview = ({ collections }) => {
  const { electronics, menClothing, womenClothing, footWear } = collections;

  return (
    <main className="collection-overview container">
      <Collection products={electronics} title={'Electronics'} />
      <Collection products={menClothing} title={'Men Clothing'} />
      <Collection products={womenClothing} title={'Women Clothing'} />
      <Collection products={footWear} title={'Footwear'} />
    </main>
  );
};

export default CollectionOverview;
