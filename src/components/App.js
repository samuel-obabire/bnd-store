import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.scss';

import HomePage from './pages/home-page/HomePage';
import ShopPage from './pages/shop-page/ShopPage';
import SignupPage from './pages/sign-up-page/SignupPage';
import SigninPage from './pages/sign-in-page/SignInPage';

import { auth, createUserProfileDoc } from './utils/firebase';
import { setUser } from '../redux/actions';
import { connect } from 'react-redux';

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
      <Route exact path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/sign-in" component={SigninPage} />
      <Route path="/sign-up" component={SignupPage} />
    </BrowserRouter>
  );
};

export default connect(null, { setUser })(App);
