import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.scss'

import SigninPage from './pages/sign-in-page/SignInPage'

import { auth, createUserProfileDoc, firestore } from './utils/firebase'
import { setUser } from '../redux/actions'
import Header from './header/Header'
import Footer from '../components/footer/Footer'
import { generateId } from './utils'
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
const AboutPage = lazy(() => import('./pages/about-page/AboutPage'))
const AdminPage = lazy(() => import('./pages/admin-page/AdminPage'))
const Error = lazy(() => import('./404'))

const App = ({ setUser }) => {
  useEffect(() => {
    // async function c() {
    //   const image = new Jimp(400, 400, '#ffffff', (err, image) => {
    //     return image
    //   })

    //   const { width, height } = await Jimp.read(img)
    //     .then(image => image.resize(Jimp.AUTO, 400))
    //     .then(img => ({
    //       width: img.bitmap.width,
    //       height: img.bitmap.height
    //     }))

    //   const x = Math.floor((400 - width) / 2)
    //   const y = Math.floor((400 - height) / 2)

    //   console.log(x, y)

    //   const m = await Jimp.read(img).then(image => image.resize(Jimp.AUTO, 400))

    //   const compositeImage = image.composite(m, x, y, {
    //     mode: Jimp.BLEND_SOURCE_OVER
    //   })

    //   compositeImage.getBase64Async(Jimp.AUTO).then(console.log)
    // }

    // c()

    // Jimp.read(img)
    //   .then(image => image.resize(20, 20).blur(2))
    //   .then(image => image.getBase64Async(Jimp.AUTO).then(console.log))

    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // Jimp.read('https://i.imgur.com/6u9kO9d.jpg')
      //   .then(image => Jimp.intToRGBA(image.getPixelColor(10, 10)))
      //   .then(
      //     rgba =>
      //       (document.body.style.background = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`)
      //   );

      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth)

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
          <Route exact path="/about" component={AboutPage} />
          <Route path="/admin" component={AdminPage} />
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
