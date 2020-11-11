import React from 'react';
 
const PasswordChange = () => (
  <div1>
    <h1>PasswordChange</h1>

  <div2>
    <h2>Follow instructions bellow to change your password</h2>
  </div2>

    <script>
    var user = firebase.auth().currentUser;
    var newPassword = getASecureRandomPassword();

   user.updatePassword(newPassword).then(function() 
   {
     // Update successful.
    }).catch(function(error) 
    {
      // An error happened.
    });
    </script>

  </div1>
);
 
export default PasswordChange;