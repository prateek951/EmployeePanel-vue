import firebase from 'firebase'
import "firebase/firestore" 
import firebaseconfig from './firebaseconfig';
const fbApp = firebase.initializeApp(firebaseconfig);

fbApp.firestore().settings({ timestampsInSnapshots: true});

//export firestore database
export default fbApp.firestore();
