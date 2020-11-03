import app from 'firebase/app';
import 'firebase/auth';
import * as firebase from 'firebase';
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
        
        
    }

    

    googleAuth = e =>{
        console.log("google auth");
        //var provider = new firebasex.auth().GoogleAuthProvider();
        console.log(this.auth);
        // this.auth().useDeviceLanguage();
        //   provider.setCustomParameters({
        //   'login_hint': 'user@example.com'
        // });
        // this.auth().signInWithPopup(provider).then(function(result) {
        //   // This gives you a Google Access Token. You can use it to access the Google API.
        //   console.log(result.user.photoURL);
        //   var token = result.credential.accessToken;
        //   // The signed-in user info.
        //   var user = result.user;
        //   // ...
        // }).catch(function(error) {
        //   // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   // The email of the user's account used.
        //   var email = error.email;
        //   // The firebase.auth.AuthCredential type that was used.
        //   var credential = error.credential;
        //   // ...
        // });
      }
    

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);


    // doGoogleAuth = e => {
    //     var provider = new firebase.auth().GoogleAuthProvider();
    //     this.auth.signInWithPopup(provider).then(function(){
    //         console.log("signed in with google");
    //     }).catch(function(err) {
    //         console.log(err);
    //     });
    // }


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