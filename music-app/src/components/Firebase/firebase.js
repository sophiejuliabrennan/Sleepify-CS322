import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};



class Firebase{
    constructor(){
        // initalize firebase
        app.initializeApp(config);
        // firebase authentatication
        this.auth = app.auth();
        this.db = app.database();
        this.storage = app.storage(); // the storage
        this.storageRef = app.storage().ref(); // reference to storage location
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    onAuthStateChanged = (user) => {
        console.log("auth changed");
        if (user) {
            document.querySelector("#root > div > footer").style.backgroundColor = "green";
            document.querySelector("html").style.backgroundColor = "green";
            console.log("User is signed in");
        } else {
          document.querySelector("html").style.backgroundColor = "red";
          document.querySelector("#root > div > footer").style.backgroundColor = "red";
          console.log("User is signed out");
        }
    };
	
	// USER API
	
	user = uid => this.db.ref(`users/${uid}`);
	
    users = () => this.db.ref('users');

}
 
export default Firebase;