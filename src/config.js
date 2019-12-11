import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBMWTN1-8L-8IAZFYKZkkBVcktPJI_ZbNM",
  authDomain: "burguer-queen-16772.firebaseapp.com",
  databaseURL: "https://burguer-queen-16772.firebaseio.com",
  projectId: "burguer-queen-16772",
  storageBucket: "burguer-queen-16772.appspot.com",
  messagingSenderId: "77528812188",
  appId: "1:77528812188:web:291e6347d89a13e4f57b59",
  measurementId: "G-9K0CCY4SPJ"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
