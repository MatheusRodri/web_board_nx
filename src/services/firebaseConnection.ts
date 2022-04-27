import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
    apiKey: "AIzaSyDNSVOhXTDJI4QYjTmTJ60j0GtLExRcn6Y",
    authDomain: "board-next-1755d.firebaseapp.com",
    projectId: "board-next-1755d",
    storageBucket: "board-next-1755d.appspot.com",
    messagingSenderId: "271483913",
    appId: "1:271483913:web:e2a1d2751bb2e0bfe924d8",
    measurementId: "G-K0CXNM70VL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;