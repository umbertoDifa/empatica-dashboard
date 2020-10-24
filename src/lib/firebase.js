import Firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCrMMoyzIHTIiPc6ie6WDR3saxRIs2SKrc",
    authDomain: "empatica-dashboard-2228d.firebaseapp.com",
    databaseURL: "https://empatica-dashboard-2228d.firebaseio.com",
    projectId: "empatica-dashboard-2228d",
    storageBucket: "empatica-dashboard-2228d.appspot.com",
    messagingSenderId: "845076216608",
    appId: "1:845076216608:web:8b8eef4bfc36d720d5f545"
  };
const app = Firebase.initializeApp(firebaseConfig);
const db = app.database();
const downloadsRef = db.ref();
// console.log('on');
// downloadsRef.on('value', snap=>console.log(snap.val()));

export {
    db,
    downloadsRef
}