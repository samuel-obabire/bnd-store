import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';

import SigninPage from './pages/sign-in-page/SignInPage';

import { auth, createUserProfileDoc } from './utils/firebase';
import { setUser } from '../redux/actions';
import Header from './header/Header';

const HomePage = lazy(() => import('./pages/home-page/HomePage'));
const ShopPage = lazy(() => import('./pages/shop-page/ShopPage'));
const SignupPage = lazy(() => import('./pages/sign-up-page/SignupPage'));

const App = ({ setUser }) => {
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
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
