import { BrowserRouter, Route } from 'react-router-dom';

import './App.scss';

import HomePage from './pages/home-page/HomePage';
import ShopPage from './pages/shop-page/ShopPage';
import SignInPage from './pages/sign-in-page/SignInPage';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/sign-in" component={SignInPage} />
    </BrowserRouter>
  );
};

export default App;
