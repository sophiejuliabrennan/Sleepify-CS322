import React from 'react';
import firebase from "firebase";


function check(){
    var user = firebase.auth().currentUser;

    if (user) {
        console.log("Welcome " + user.email);
        document.getElementById("welcome").innerHTML = "Welcome " + user.email;
    } else {
        console.log("not signed in");
        document.getElementById("welcome").innerHTML = "You are not signed in.";
        //document.getElementById("welcome").appendChild("SignUpLink");
    }
}


const Home = () => (
  <div onLoad={check}>
    <h1 id="welcome" onLoad={check}></h1>
    <button onClick={check}>am i logged in?</button>
    
  </div>
);
 
export default Home;