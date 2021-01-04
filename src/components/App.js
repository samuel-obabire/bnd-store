import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.scss'

import SigninPage from './pages/sign-in-page/SignInPage'

import { auth, createUserProfileDoc, firestore } from './utils/firebase'
import { setUser } from '../redux/actions'
import Header from './header/Header'
import shopdata from './pages/shop-page/shop-data'
import { generateId } from './utils/generateId'
import Jimp from 'jimp/es'

const HomePage = lazy(() => import('./pages/home-page/HomePage'))
const ShopPage = lazy(() => import('./pages/shop-page/ShopPage'))
const SignupPage = lazy(() => import('./pages/sign-up-page/SignupPage'))

const App = ({ setUser }) => {
  useEffect(() => {
    // window.addEventListener('error', console.log)

    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
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

        userRef.onSnapshot(snapshot => console.log(snapshot.data()))

        return setUser(userAuth)
      }

      return setUser(userAuth)
    })

    return () => unsubscribeFromAuth()
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/sign-up" component={SignupPage} />
          <Route path="/sign-in" component={SigninPage} />
          <Route path="*">
            <div style={{ height: 200, width: 400, background: 'red' }} />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default connect(null, { setUser })(App)
