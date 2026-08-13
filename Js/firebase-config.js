// Configuración del proyecto de Firebase — LuxeViaAromas

const firebaseConfig = {
  apiKey: "AIzaSyCWQBm2y-ZqRJcOGwKDTtT_BWm-H1srRis",
  authDomain: "luxeviaaromas.firebaseapp.com",
  projectId: "luxeviaaromas",
  storageBucket: "luxeviaaromas.firebasestorage.app",
  messagingSenderId: "821932248826",
  appId: "1:821932248826:web:72962df98e976364744343",
  measurementId: "G-T91TBXFRLN"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();