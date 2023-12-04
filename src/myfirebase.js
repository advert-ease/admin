// import { initializeApp } from "firebase/app";

import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import firebase from 'firebase/compat/app'
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyD5-e4ZW7ZupkumHMwmB-8_9M5AQeRdlHY",
//   authDomain: "pi-bla-try.firebaseapp.com",
//   databaseURL: "https://pi-bla-try-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "pi-bla-try",
//   storageBucket: "pi-bla-try.appspot.com",
//   messagingSenderId: "104175823542",
//   appId: "1:104175823542:web:8fad0e5255d5fca4f4d417"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBwCQeM7ITq_UYSWqLfywwx0i7AJSVQyDw",
    authDomain: "advert-test-01.firebaseapp.com",
    databaseURL: "https://advert-test-01-default-rtdb.firebaseio.com",
    projectId: "advert-test-01",
    storageBucket: "advert-test-01.appspot.com",
    messagingSenderId: "709936076143",
    appId: "1:709936076143:web:6482d5a9340b5e40ed449a",
    measurementId: "G-M6ZK61C4Z4"
  };
  
  const app = initializeApp(firebaseConfig);
// const db = getDatabase(app)
  const storage = getStorage(app)

   export { storage,app as default}
  // export default db;


  