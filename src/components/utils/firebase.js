import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCNOMFWx_rUwR4gnJ8s2-pXuV8b7hkWxv0',
  authDomain: 'bnd-store.firebaseapp.com',
  projectId: 'bnd-store',
  storageBucket: 'bnd-store.appspot.com',
  messagingSenderId: '867888139652',
  appId: '1:867888139652:web:901792aa9fb5a9c453e1d1',
  measurementId: 'G-JJ7RM6QM93',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDoc = async userAuth => {
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (snapshot.exists) return userRef;

  const { email } = userAuth;
  const createdAt = new Date();

  try {
    await userRef.set({
      email,
      createdAt,
    });
  } catch (error) {
    console.log(error);
  }
  console.log(userRef);

  return userRef;
};

export const getCollection = async ({ field, operator, value, limit = 5 }) => {
  const items = {};

  await firestore
    .collection('products')
    .where(field, operator, value)
    .limit(limit)
    .get()
    .then(querySnapshot => {
      return querySnapshot.forEach(doc => {
        items[doc.id] = doc.data();
      });
    });

  return items;
};
