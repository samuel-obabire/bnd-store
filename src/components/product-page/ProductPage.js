import { connect } from 'react-redux';
import { useEffect } from 'react';

import './ProductPage.scss';

import useQuery from '../../hooks/useQuery';
import ProductGallery from '../product-gallery/ProductGallery';
import { firestore } from '../utils/firebase';
import { setSelectedProduct } from '../../redux/actions';

const ProductPage = ({ setSelectedProduct }) => {
  const id = useQuery().get('id');

  useEffect(() => {
    if (!id) return;

    const productRef = firestore.collection('products').doc(id);

    const unsubscribeFromListener = productRef.onSnapshot(doc => {
      setSelectedProduct(doc.data());

      return () => unsubscribeFromListener();
    });
  }, []);
  return (
    <main className="product-page">
      <ProductGallery />
    </main>
  );
};

export default connect(null, { setSelectedProduct })(ProductPage);
