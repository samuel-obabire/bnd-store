import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.scss'

import SigninPage from './pages/sign-in-page/SignInPage'

import { auth, createUserProfileDoc, firestore } from './utils/firebase'
import { setUser } from '../redux/actions'
import Header from './header/Header'
import Footer from '../components/footer/Footer'
import shopdata from './pages/shop-page/shop-data'
import { generateId } from './utils/generateId'
import Jimp from 'jimp/es'
import MobileNav from './mobile-nav/MobileNav'
import { Breakpoint } from 'react-socks'
import Spinner from './spinner/Spinner'
import ScrollToTop from './ScrollToTop'
import { Helmet } from 'react-helmet'

const HomePage = lazy(() => import('./pages/home-page/HomePage'))
const ShopPage = lazy(() => import('./pages/shop-page/ShopPage'))
const SignupPage = lazy(() => import('./pages/sign-up-page/SignupPage'))
const CartPage = lazy(() => import('./pages/cart-page/CartPage'))
const CheckoutPage = lazy(() => import('./pages/checkout-page/CheckoutPage'))
const Error = lazy(() => import('./404'))

const App = ({ setUser }) => {
  useEffect(() => {
    window.addEventListener('error', console.log)

    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // return [
      //   'women clothing',
      //   'fabrics',
      //   'bags',
      //   'slippers',
      //   'electronics'
      // ].forEach(category => {
      //   firestore.collection('categories').doc().set({ category })
      // })

      // Jimp.read('https://i.imgur.com/6u9kO9d.jpg')
      //   .then(image => Jimp.intToRGBA(image.getPixelColor(10, 10)))
      //   .then(
      //     rgba =>
      //       (document.body.style.background = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`)
      //   );

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
      //     p.imageCollection = Array.from({ length: 5 }, _ => image);

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
        const userRef = await createUserProfileDoc(userAuth)

        // userRef.onSnapshot(snapshot => console.log(snapshot.data()))

        return setUser(userAuth)
      }

      return setUser(userAuth)
    })

    return () => unsubscribeFromAuth()
  }, [])

  return (
    <BrowserRouter>
      <Helmet>
        <title>
          Bnd Clothings - an online shopping for whatever clothings material you
          want
        </title>
      </Helmet>
      <Header />
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="fallback">
            <Spinner />
          </div>
        }>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/cart" component={CartPage} />
          <Route path="/sign-up" component={SignupPage} />
          <Route path="/login" component={SigninPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="*" component={Error} />
        </Switch>
      </Suspense>
      <Breakpoint small down>
        <MobileNav />
      </Breakpoint>
      <Footer />
    </BrowserRouter>
  )
}

export default connect(null, { setUser })(App)
