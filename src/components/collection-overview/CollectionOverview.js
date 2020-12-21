import { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import './CollectionOverview.scss';

import { getCollections } from '../../redux/actions';
import Collection from '../collection/Collection';

const options = {
  threshold: 1.0,
  rootMargin: '0px 0px 50px 0px',
};

const CollectionOverview = ({ getCollections, collections }) => {
  const { electronics, menClothing, womenClothing, footWear } = collections;

  useEffect(() => {
    getCollections();
  }, [getCollections]);
  const ref = useCallback(node => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // if (entry.isIntersecting) {
        // entry.target.style.background = `url()`;
        // observer.unobserve(entry.target);
        // }
        // if (!entry.isIntersecting) entry.target.style.background = 'black';
      });
    }, options);

    // Array.from(node.children).forEach(child => {
    //   observer.observe(child);
    // });
  }, []);

  return (
    <main ref={ref} className="collectionoverview container">
      <Collection products={electronics} title={'Electronics'} />
      <Collection products={menClothing} title={'Men Clothing'} />
      <Collection products={womenClothing} title={'Women Clothing'} />
      <Collection products={footWear} title={'Footwear'} />
    </main>
  );
};

const mapState = state => {
  return {
    collections: state.shop.collections,
  };
};

export default connect(mapState, { getCollections })(CollectionOverview);
