import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyARdUwlkgZc0Px-rM21RmwdmcLlmw8yz3o",
    authDomain: "catch-of-the-day-ron-gootman.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-ron-gootman.firebaseio.com"
};
const firebaseApp = firebase.initializeApp(config);

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

//default export
export default base;