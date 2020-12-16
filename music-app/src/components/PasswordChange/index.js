import React from 'react';
import firebase from "firebase";
 
const PasswordChange = () => (
  <div1>
    <h1>PasswordChange</h1>

  <div1>
    <h2>Click on the button bellow to randomly change your password</h2>
  </div1>

<div onLoad={PC}>
<button id="PC" onClick={PC}>Random change</button>
</div>

<div1>
    <h2>Click on the button bellow to change password yourself</h2>
  </div1>

<div onLoad={PCC}>
<input id="newPass" type="password" placeholder="Enter a new password"></input>
<br/>
<button id="PCC" onClick={PCC}>Change password</button>
</div>
  </div1>

);

function PC() 
{
  var user = firebase.auth().currentUser;
  const password = require('secure-random-password');
  var newPassword = password.randomPassword();

  user.updatePassword(newPassword).then(function() {
    //console.writeline("Update succesfully");
  }).catch(function(error) {
    //console.writeline("An error happened");
  });

  document.getElementById("PC").innerHTML = "New Password is: " + newPassword;
}


function PCC() 
{
  var user = firebase.auth().currentUser;

  //var input = prompt("Enter new password:")
  var input = document.getElementById("newPass").value;
  //console.log(input);


  user.updatePassword(input).then(function() {
    console.log("Update succesfully");
  }).catch(function(error) {
    console.log("An error happened");
  });

  document.getElementById("PCC").innerHTML = "Password Successfully Changed";
}


export default PasswordChange;