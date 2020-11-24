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

  var input = prompt("Enter new password:")

  user.updatePassword(input).then(function() {
    //console.writeline("Update succesfully");
  }).catch(function(error) {
    //console.writeline("An error happened");
  });

  document.getElementById("PCC").innerHTML = "New Password is: " + input;
}


export default PasswordChange;