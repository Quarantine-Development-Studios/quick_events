import firebase from 'firebase';
  
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCW7Hj3REjJfdct86iEOx4De5KHXnH75Z4",
    authDomain: "quick-events-f2dab.firebaseapp.com",
    databaseURL: "https://quick-events-f2dab.firebaseio.com",
    projectId: "quick-events-f2dab",
    storageBucket: "quick-events-f2dab.appspot.com",
    messagingSenderId: "492433473730",
    appId: "1:492433473730:web:4bbc0e64f5b15de90d7b5b"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);