import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/storage'

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey,
  authDomain: 'bnd-store.firebaseapp.com',
  projectId: 'bnd-store',
  storageBucket: 'bnd-store.appspot.com',
  messagingSenderId: '867888139652',
  appId: '1:867888139652:web:901792aa9fb5a9c453e1d1',
  measurementId: 'G-JJ7RM6QM93'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('profile')
provider.addScope('email')

provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () =>
  auth.signInWithRedirect(provider).catch(e => alert(e.message))

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.app().storage('gs://bnd-images')

export const createUserProfileDoc = async userAuth => {
  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapshot = await userRef.get()

  if (snapshot.exists) {
    return { isAdmin: Boolean(snapshot.data().isAdmin), ...userRef }
  }

  const { email } = userAuth
  const createdAt = new Date()

  try {
    await userRef.set({
      isAdmin: false,
      email,
      createdAt
    })
  } catch (error) {
    console.log(error)
  }

  return { ...userRef, isAdmin: false }
}

export const getCollection = async ({ field, operator, value, limit }) => {
  const items = {}

  await firestore
    .collection('products')
    .where(field, operator, value)
    .limit(limit)
    .get()
    .then(querySnapshot => {
      return querySnapshot.forEach(doc => {
        items[doc.id] = doc.data()
      })
    })
    .catch(e => console.log(e))

  return items
}
