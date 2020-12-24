import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';

import SigninPage from './pages/sign-in-page/SignInPage';

import { auth, createUserProfileDoc, firestore } from './utils/firebase';
import { setUser } from '../redux/actions';
import Header from './header/Header';
import shopdata from './pages/shop-page/shop-data';
import { generateId } from './utils/generateId';
import Jimp from 'jimp/es';

const HomePage = lazy(() => import('./pages/home-page/HomePage'));
const ShopPage = lazy(() => import('./pages/shop-page/ShopPage'));
const SignupPage = lazy(() => import('./pages/sign-up-page/SignupPage'));

const App = ({ setUser }) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // const batch = firestore.batch();
      // const fun = async () => {
      //   // map will return a promise
      //   const promises = shopdata.map(async product => {
      //     const image = product.image;
      //     const p = { ...product };

      //     const img = await Jimp.read(image);

      //     const uri = await img
      //       .resize(10, Jimp.AUTO)
      //       .blur(2)
      //       .getBase64Async(Jimp.AUTO);

      //     p.uri = uri;
      //     p.indexes = product.title.toUpperCase().split(' ');
      //     p.id = generateId();

      //     return p;
      //   });

      //   Promise.all(promises).then(arr => {
      //     arr.forEach(product => {
      //       const ref = firestore.collection('products').doc(product.id);
      //       batch.set(ref, product);
      //     });

      //     batch.commit().then(console.log);
      //   });
      // };

      // fun();

      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);

        userRef.onSnapshot(snapshot => console.log(snapshot.data()));

        return setUser(userAuth);
      }

      return setUser(userAuth);
    });

    return () => unsubscribeFromAuth();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path="/" component={HomePage} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/shop" component={ShopPage} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/sign-up" component={SignupPage} />
      </Suspense>
      <Route path="/sign-in" component={SigninPage} />
    </BrowserRouter>
  );
};

export default connect(null, { setUser })(App);
